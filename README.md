# 📈 StockSight

**AI-powered stock price prediction using LSTM neural networks**

![Python](https://img.shields.io/badge/Python-3.13-blue?style=flat) ![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat) ![Django](https://img.shields.io/badge/Django-5.2-darkgreen?style=flat) ![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## 🎯 About

StockSight is a full-stack ML application that predicts stock prices using LSTM neural networks. Analyze historical trends, view moving averages, and get AI-powered 3-month forecasts with model evaluation metrics.

---

## ✨ Features

- **Stock Price Prediction** — LSTM-based forecasting for next 3 months
- **Historical Analysis** — 10-year data with 100-day & 200-day moving averages
- **JWT Authentication** — Secure login/signup with token refresh
- **Model Metrics** — MSE, RMSE, and R² score evaluation
- **Real-time Data** — Yahoo Finance integration
- **Responsive UI** — Modern React + Vite frontend

---

## 🔗 Live Demo

`https://stocksight-e622.onrender.com/`

---

## 🏗️ Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | React 18, Vite, Axios, Bootstrap |
| **Backend** | Django 5, Django REST Framework, TensorFlow/Keras |
| **Database** | PostgreSQL |
| **Deployment** | Render |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+, npm
- Python 3.10+, pip

### Backend Setup

```bash
cd backend-django
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend: `http://127.0.0.1:8000`

### Frontend Setup

```bash
cd frontend-react
npm install
npm run dev
```

Frontend: `http://127.0.0.1:5173`

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
5. Unscale predictions to original price range

Made with ❤️ by [Ansh Mahajan](https://github.com/AnshMahajan24)