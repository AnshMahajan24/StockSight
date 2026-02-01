# 📈 StockSight - Stock Price Prediction Portal

![StockSight Banner](https://img.shields.io/badge/Stock-Prediction-blue?style=flat-square&logo=python)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.13-blue?style=flat-square&logo=python)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat-square&logo=react)
![Django](https://img.shields.io/badge/Django-5.2-darkgreen?style=flat-square&logo=django)

> **StockSight** is a full-stack machine learning application that predicts stock prices using LSTM (Long Short-Term Memory) neural networks. The application combines historical stock data analysis with modern web technologies to provide an intuitive platform for stock price forecasting and visualization.

---

## 🎯 Overview

StockSight is a machine learning-powered web application that forecasts future stock prices by analyzing historical market data. The application leverages:

- **LSTM Neural Networks** for sequential price prediction
- **Django REST Framework** for robust API backend
- **React with Vite** for fast, modern frontend
- **JWT Authentication** for secure user access
- **Real-time Data Fetching** via Yahoo Finance

Whether you're a student learning about ML applications, a developer exploring full-stack projects, or an investor seeking price insights, StockSight provides a complete, production-ready solution.

**Demo URL**: `http://localhost:5173` (Frontend) | `http://localhost:8000/api/v1` (Backend API)

---

## ✨ Features

### Core Functionality
- ✅ **Stock Price Prediction** - LSTM-based predictions for future 3-month prices
- ✅ **Historical Analysis** - 10-year historical data visualization with moving averages (100-day & 200-day)
- ✅ **Model Evaluation Metrics** - MSE, RMSE, and R² score reporting
- ✅ **Multi-plot Visualization** - 4 comprehensive charts: closing price, moving averages, predictions
- ✅ **Future Price Forecast** - End-of-month predictions for next 3 months

### User Management
- 🔐 **User Authentication** - Secure JWT-based login/logout system
- 📝 **Registration** - New user signup with email validation
- 🔒 **Protected Routes** - Private dashboard accessible only to authenticated users
- 🔄 **Token Refresh** - Automatic JWT token refresh for uninterrupted sessions

### Error Handling
- ⚠️ **Comprehensive Error Messages** - User-friendly feedback for invalid tickers
- 🛡️ **Input Validation** - Server-side validation for all API requests
- 📡 **Network Error Recovery** - Graceful handling of API failures

---

## 🛠 Technology Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Python** | 3.13 | Core language |
| **Django** | 5.2 | Web framework |
| **Django REST Framework** | 3.16.1 | API development |
| **Django CORS Headers** | 4.7.0 | Cross-origin requests |
| **Django SimpleJWT** | 5.5.1 | JWT authentication |
| **TensorFlow/Keras** | Latest | Deep learning framework |
| **scikit-learn** | Latest | ML utilities & scaling |
| **pandas** | Latest | Data manipulation |
| **numpy** | Latest | Numerical computing |
| **yfinance** | Latest | Stock data fetching |
| **matplotlib** | Latest | Data visualization |
| **python-decouple** | 3.8 | Environment configuration |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.3.1 | UI library |
| **React Router DOM** | 6.30.1 | Client-side routing |
| **Vite** | 5.3.1 | Build tool & dev server |
| **Axios** | 1.11.0 | HTTP client |
| **Bootstrap** | 5+ | CSS framework |
| **FontAwesome** | 7.0.0 | Icon library |
| **ESLint** | 8.57.0 | Code linting |

### Database
| Technology | Version | Purpose |
|-----------|---------|---------|
| **SQLite** | 3 | Development database |

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     StockSight Architecture                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐          ┌──────────────────────┐    │
│  │  React Frontend  │          │  Django REST API     │    │
│  │  (Port 5173)     │◄────────►│  (Port 8000)         │    │
│  │                  │          │                      │    │
│  │ • Login/Register │          │ • Authentication     │    │
│  │ • Dashboard      │          │ • JWT Tokens         │    │
│  │ • Predictions    │          │ • Predictions API    │    │
│  │ • Visualizations │          │ • CORS Headers       │    │
│  └──────────────────┘          └──────────────────────┘    │
│           │                              │                  │
│           └──────────────┬───────────────┘                  │
│                          │                                  │
│           ┌──────────────▼────────────────┐                │
│           │     Machine Learning         │                │
│           │     (LSTM Model)             │                │
│           │                              │                │
│           │ • Keras/TensorFlow          │                │
│           │ • scikit-learn preprocessing │                │
│           │ • Historical analysis        │                │
│           └──────────────┬────────────────┘                │
│                          │                                  │
│           ┌──────────────▼────────────────┐                │
│           │    External Data Sources      │                │
│           │                              │                │
│           │ • Yahoo Finance (yfinance)   │                │
│           │ • 10-year historical data    │                │
│           └──────────────────────────────┘                │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow
1. **User Input** → User enters stock ticker (e.g., AAPL)
2. **Frontend Request** → React sends authenticated request to backend
3. **Data Fetching** → Backend fetches 10 years of historical data via yfinance
4. **Model Processing** → LSTM model trained and predictions generated
5. **Visualization** → Matplotlib generates 4 charts (closing price, 100-day MA, 200-day MA, predictions)
6. **Response** → Backend returns plots + metrics + 3-month forecasts
7. **UI Display** → React renders visualizations and evaluation metrics

---

## 📁 Project Structure

```
StockSight/
│
├── 📂 backend-django/                  # Django Backend
│   ├── StockSight/                     # Project settings
│   │   ├── settings.py                 # Django configuration
│   │   ├── urls.py                     # URL routing
│   │   ├── wsgi.py                     # WSGI entry point
│   │   └── asgi.py                     # ASGI entry point
│   │
│   ├── api/                            # Stock prediction API
│   │   ├── views.py                    # StockPredictionAPIView (LSTM predictions)
│   │   ├── serializers.py              # Data validation
│   │   ├── urls.py                     # API endpoints
│   │   ├── models.py                   # Database models
│   │   └── utils.py                    # Helper functions
│   │
│   ├── accounts/                       # User authentication
│   │   ├── views.py                    # ProtectedView, RegistrationView
│   │   ├── serializers.py              # User serialization
│   │   ├── models.py                   # User models
│   │   └── migrations/                 # Database migrations
│   │
│   ├── media/                          # Generated plot images
│   │   └── *.png                       # Stock prediction charts
│   │
│   ├── stock_prediction_model.keras    # Pre-trained LSTM model
│   ├── db.sqlite3                      # SQLite database
│   ├── manage.py                       # Django CLI
│   ├── .env                            # Environment variables
│   └── requirements.txt                # Python dependencies
│
├── 📂 frontend-react/                  # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/
│   │   │   │   └── Dashboard.jsx       # Main prediction dashboard
│   │   │   ├── Login.jsx               # Authentication
│   │   │   ├── Register.jsx            # User signup
│   │   │   ├── Header.jsx              # Navigation & logout
│   │   │   ├── Footer.jsx              # Footer component
│   │   │   ├── Main.jsx                # Landing page
│   │   │   └── Button.jsx              # Reusable button
│   │   │
│   │   ├── assets/
│   │   │   └── css/
│   │   │       └── style.css           # Global styles
│   │   │
│   │   ├── App.jsx                     # Main app component (routing)
│   │   ├── main.jsx                    # Vite entry point
│   │   ├── AuthProvider.jsx            # Auth context provider
│   │   ├── PrivateRoute.jsx            # Protected routes wrapper
│   │   ├── PublicRoute.jsx             # Public routes wrapper
│   │   └── axiosinstance.jsx           # Axios configuration + interceptors
│   │
│   ├── public/                         # Static assets
│   ├── .env                            # Frontend environment variables
│   ├── package.json                    # NPM dependencies
│   ├── vite.config.js                  # Vite configuration
│   └── index.html                      # HTML entry point
│
├── 📂 Resources/                       # Documentation & Notebooks
│   ├── stock_prediction_model.keras    # Trained LSTM model
│   ├── stock_prediction_using_LSTM.ipynb  # Jupyter notebook (model training)
│   ├── stock_data.csv                  # Sample historical data
│   └── stock_prediction_pdf.pdf        # Project documentation
│
├── README.md                           # This file
├── .gitignore                          # Git ignore rules
└── LICENSE                             # MIT License

```

---

## 📋 Prerequisites

Before setting up the project, ensure you have:

- **Python 3.13+** - [Download here](https://www.python.org/downloads/)
- **Node.js 16+** & **npm 8+** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **pip** - Python package manager (comes with Python)
- **Virtual Environment** - `python3 -m venv venv`

### System Requirements
- **OS**: macOS, Linux, or Windows
- **RAM**: Minimum 4GB (8GB recommended for model training)
- **Disk Space**: 2GB (for dependencies + model files)
- **Internet**: Required for downloading dependencies and stock data

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/AnshMahajan24/StockSight.git
cd StockSight
```

### Step 2: Backend Setup (Django)

#### 2.1 Create Virtual Environment
```bash
cd backend-django
python3 -m venv env
source env/bin/activate          # On macOS/Linux
# OR
env\Scripts\activate             # On Windows
```

#### 2.2 Install Dependencies
```bash
pip install -r requirements.txt
```

#### 2.3 Create `.env` File
```bash
# In backend-django/.env
SECRET_KEY=your-secret-key-here
DEBUG=True
```

#### 2.4 Run Migrations
```bash
python manage.py migrate
```

#### 2.5 Create Superuser (Optional)
```bash
python manage.py createsuperuser
# Username: admin
# Email: admin@example.com
# Password: ••••••••
```

#### 2.6 Start Backend Server
```bash
python manage.py runserver
# Server runs at http://localhost:8000
```

### Step 3: Frontend Setup (React)

#### 3.1 Navigate to Frontend
```bash
cd ../frontend-react
```

#### 3.2 Install Dependencies
```bash
npm install
```

#### 3.3 Create `.env` File
```bash
# In frontend-react/.env
VITE_BACKEND_BASE_API = http://127.0.0.1:8000/api/v1
VITE_BACKEND_ROOT = http://127.0.0.1:8000
```

#### 3.4 Start Frontend Dev Server
```bash
npm run dev
# Frontend runs at http://localhost:5173
```

### Step 4: Open in Browser

- **Frontend**: http://localhost:5173
- **Backend Admin**: http://localhost:8000/admin
- **API Docs**: http://localhost:8000/api/v1

---

## 📖 Usage Guide

### Getting Started

#### 1. **Register a New Account**
   - Navigate to the homepage
   - Click "Register here"
   - Fill in username, email, and password (min. 8 characters)
   - Account created! You're redirected to login

#### 2. **Login to Dashboard**
   - Enter your credentials
   - Click "Login"
   - You're now authenticated and see:
     - Logout button (top-right)
     - Dashboard button (top-right)

#### 3. **Make Your First Prediction**
   - Click "Dashboard" button
   - Enter a stock ticker (e.g., `AAPL`, `MSFT`, `GOOGL`)
   - Click "See Prediction" button
   - Wait for model to process (30-60 seconds)

#### 4. **Analyze Results**
   The dashboard displays:
   - **Closing Price Chart** - Historical stock prices
   - **100-Day Moving Average** - Short-term trend
   - **200-Day Moving Average** - Long-term trend
   - **Prediction Chart** - LSTM predictions vs. actual prices
   - **3-Month Forecast** - Predicted prices for next 3 months
   - **Model Metrics**:
     - MSE (Mean Squared Error)
     - RMSE (Root Mean Squared Error)
     - R² (Coefficient of Determination)

### Example Predictions

```
Input Ticker: AAPL
Stock: Apple Inc.

Output:
├── 100-Day MA Chart
├── 200-Day MA Chart
├── Prediction vs Actual Chart
├── Future Predictions:
│   ├── Month 1 (Feb 28, 2026): $185.42
│   ├── Month 2 (Mar 28, 2026): $187.15
│   └── Month 3 (Apr 28, 2026): $189.63
└── Model Evaluation:
    ├── MSE: 45.23
    ├── RMSE: 6.73
    └── R²: 0.92
```

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| **"Invalid ticker"** | Ensure ticker is valid (check Yahoo Finance) |
| **"No data found"** | Ticker may not have 10 years of history |
| **Login fails** | Check internet connection, verify credentials |
| **Plots not displaying** | Clear browser cache, refresh page |
| **Slow predictions** | Normal for first prediction (~60s), cached after |

---

## 🧠 Model Methodology

### LSTM (Long Short-Term Memory) Architecture

#### Why LSTM?
- **Handles Sequential Data**: Perfect for time-series stock prices
- **Long-term Dependencies**: Captures trends over extended periods
- **Mitigates Vanishing Gradient**: Solves the RNN limitation
- **Proven Results**: State-of-the-art for financial forecasting

#### Model Architecture
```
Input Layer (100 timesteps)
    ↓
LSTM Layer 1 (128 units, 20% dropout)
    ↓
LSTM Layer 2 (64 units, 20% dropout)
    ↓
Dense Layer (25 units, ReLU activation)
    ↓
Output Layer (1 unit, Linear activation)
    ↓
Predicted Price
```

#### Training Process
1. **Data Collection**: Fetch 10 years of historical data (yfinance)
2. **Data Preprocessing**:
   - Split: 70% training, 30% testing
   - Normalization: MinMax scaling (0-1 range)
   - Sequencing: Create 100-day sliding windows
3. **Model Training**:
   - Optimizer: Adam
   - Loss Function: Mean Squared Error (MSE)
   - Epochs: ~50 (early stopping applied)
   - Batch Size: 32
4. **Model Evaluation**:
   - MSE: Average squared error
   - RMSE: Square root of MSE
   - R² Score: Proportion of variance explained

#### Prediction Pipeline
1. Scale last 100 days of data
2. Reshape for LSTM input
3. Predict next day
4. Update sequence (remove oldest, add prediction)
5. Repeat 21 times per month (≈ 1 month of trading days)
6. Unscale predictions to original price range

---


## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
✅ **You can**: Use commercially, modify, distribute, sublicense  
❌ **You cannot**: Hold author liable, use trademark  
📋 **You must**: Include license and copyright notice  

---

## 🌟 Show Your Support

If you found this project helpful, please:
- ⭐ **Star** the repository
- 🍴 **Fork** to your profile
- 💬 **Share** feedback and suggestions
- 📢 **Spread the word** on social media

---

## 👥 Authors & Contributors

**Project Lead**
- **Ansh Mahajan** - [@AnshMahajan24](https://github.com/AnshMahajan24)


---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/AnshMahajan24/StockSight/issues)
- **Email**: anshakkimahajan@gmail.com

---

## 📚 Additional Resources

### Learning Resources
- [LSTM & RNN Basics](https://colah.github.io/posts/2015-08-Understanding-LSTMs/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [Time Series Forecasting](https://www.tensorflow.org/tutorials/structured_data/time_series)

### Tools & Libraries Used
- [TensorFlow/Keras](https://www.tensorflow.org/)
- [scikit-learn](https://scikit-learn.org/)
- [Yahoo Finance (yfinance)](https://github.com/ranaroussi/yfinance)
- [Django](https://www.djangoproject.com/)
- [React](https://react.dev/)


---

## ⚠️ Disclaimer

**Important**: This application is for educational purposes only. Stock market predictions are inherently uncertain and should not be used as the sole basis for investment decisions. Always consult with a financial advisor before making investment decisions.

**Risk Warning**: Past performance is not indicative of future results. The LSTM model predicts based on historical patterns, which may not hold in future market conditions.

---

## 🔐 Security Considerations

- ✅ JWT tokens for stateless authentication
- ✅ Password hashing with Django's built-in system
- ✅ CORS headers properly configured
- ✅ Environment variables for sensitive data
- ⚠️ **Development Mode Enabled**: Set `DEBUG=False` for production
- ⚠️ **Secret Key**: Change `SECRET_KEY` in production

---

**Last Updated**: February 1, 2026  
**Version**: 1.0.0  

---

Made with ❤️ by [Ansh Mahajan](https://github.com/AnshMahajan24)
