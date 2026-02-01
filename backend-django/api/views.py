from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
import os
from django.conf import settings
from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error, r2_score



class StockPredictionAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']

            try:
                # Fetch the data from yfinance
                now = datetime.now()
                start = datetime(now.year-10, now.month, now.day)
                end = now
                df = yf.download(ticker, start, end)
                if df.empty:
                    return Response({"error": "No data found for the given ticker."}, 
                                     status=status.HTTP_404_NOT_FOUND)
                df = df.reset_index()
                # Generate Basic Plot
                plt.switch_backend('AGG')
                plt.figure(figsize=(12, 5))
                plt.plot(df.Close, label='Closing Price')
                plt.title(f'Closing price of {ticker}')
                plt.xlabel('Days')
                plt.ylabel('Price')
                plt.legend()
                # Save the plot to a file
                plot_img_path = f'{ticker}_plot.png'
                plot_img = save_plot(plot_img_path)
                
                # 100 Days moving average
                ma100 = df.Close.rolling(100).mean()
                plt.switch_backend('AGG')
                plt.figure(figsize=(12, 5))
                plt.plot(df.Close, label='Closing Price')
                plt.plot(ma100, 'r', label='100 DMA')
                plt.title(f'100 Days Moving Average of {ticker}')
                plt.xlabel('Days')
                plt.ylabel('Price')
                plt.legend()
                plot_img_path = f'{ticker}_100_dma.png'
                plot_100_dma = save_plot(plot_img_path)

                # 200 Days moving average
                ma200 = df.Close.rolling(200).mean()
                plt.switch_backend('AGG')
                plt.figure(figsize=(12, 5))
                plt.plot(df.Close, label='Closing Price')
                plt.plot(ma100, 'r', label='100 DMA')
                plt.plot(ma200, 'g', label='200 DMA')
                plt.title(f'200 Days Moving Average of {ticker}')
                plt.xlabel('Days')
                plt.ylabel('Price')
                plt.legend()
                plot_img_path = f'{ticker}_200_dma.png'
                plot_200_dma = save_plot(plot_img_path)

                # Splitting data into Training & Testing datasets
                data_training = pd.DataFrame(df.Close[0:int(len(df)*0.7)])
                data_testing = pd.DataFrame(df.Close[int(len(df)*0.7): int(len(df))])

                # Scaling down the data between 0 and 1
                scaler = MinMaxScaler(feature_range=(0,1))

                # Load ML Model
                model = load_model('stock_prediction_model.keras')

                # Preparing Test Data
                past_100_days = data_training.tail(100)
                final_df = pd.concat([past_100_days, data_testing], ignore_index=True)
                input_data = scaler.fit_transform(final_df)

                x_test = []
                y_test = []
                for i in range(100, input_data.shape[0]):
                    x_test.append(input_data[i-100: i])
                    y_test.append(input_data[i, 0])
                x_test, y_test = np.array(x_test), np.array(y_test)

                # Making Predictions
                y_predicted = model.predict(x_test)

                # Revert the scaled prices to original price
                y_predicted = scaler.inverse_transform(y_predicted.reshape(-1, 1)).flatten()
                y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()

                # Plot the final prediction
                plt.switch_backend('AGG')
                plt.figure(figsize=(12, 5))
                plt.plot(y_test, 'b', label='Original Price')
                plt.plot(y_predicted, 'r', label='Predicted Price')
                plt.title(f'Final Prediction for {ticker}')
                plt.xlabel('Days')
                plt.ylabel('Price')
                plt.legend()
                plot_img_path = f'{ticker}_final_prediction.png'
                plot_prediction = save_plot(plot_img_path)

                # Model Evaluation
                # Mean Squared Error (MSE)
                mse = mean_squared_error(y_test, y_predicted)

                # Root Mean Squared Error (RMSE)
                rmse = np.sqrt(mse)

                # R-Squared
                r2 = r2_score(y_test, y_predicted)

                # ===== 3-MONTH FUTURE PRICE PREDICTION =====
                # Prepare data for future prediction
                last_100_days = input_data[-100:]
                
                # Get current date and predict for next 3 months (approximately 60-90 trading days)
                current_date = df['Date'].iloc[-1]
                future_prices = []
                future_dates = []
                
                # Predict next ~21 trading days (approximately 1 month), 3 times
                num_predictions_per_month = 21
                temp_input = last_100_days.copy()
                
                for month in range(3):
                    month_prices = []
                    for day in range(num_predictions_per_month):
                        # Make prediction
                        x_input = temp_input.reshape(1, 100, 1)
                        out = model.predict(x_input, verbose=0)
                        month_prices.append(out[0, 0])
                        
                        # Update temp_input by removing first element and adding new prediction
                        temp_input = np.append(temp_input[1:], out)
                    
                    # Get the last predicted price for this month (end of month prediction)
                    month_end_price = scaler.inverse_transform(np.array([[month_prices[-1]]]))
                    future_prices.append(float(month_end_price[0, 0]))
                    
                    # Calculate approximate date (21 trading days ≈ 30 calendar days)
                    future_date = current_date + timedelta(days=30 * (month + 1))
                    future_dates.append(future_date.strftime('%Y-%m-%d'))

                return Response({
                    'status': 'success',
                    'plot_img': plot_img,
                    'plot_100_dma': plot_100_dma,
                    'plot_200_dma': plot_200_dma,
                    'plot_prediction': plot_prediction,
                    'mse': float(mse),
                    'rmse': float(rmse),
                    'r2': float(r2),
                    'future_predictions': [
                        {
                            'month': 1,
                            'date': future_dates[0],
                            'predicted_price': future_prices[0]
                        },
                        {
                            'month': 2,
                            'date': future_dates[1],
                            'predicted_price': future_prices[1]
                        },
                        {
                            'month': 3,
                            'date': future_dates[2],
                            'predicted_price': future_prices[2]
                        }
                    ]
                    })
            except Exception as e:
                return Response({"error": f"Error processing ticker: {str(e)}"}, 
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({"error": "Invalid ticker provided. Please enter a valid stock ticker."}, 
                            status=status.HTTP_400_BAD_REQUEST)