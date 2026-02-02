import React, { useState } from 'react'
import Button from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faRobot, faImage } from '@fortawesome/free-solid-svg-icons'

const Main = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <main className="container my-5">
        <section className="hero rounded-4 p-5 text-center text-light">
          <div className="d-flex align-items-center justify-content-center mb-3">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-3">
              <rect width="24" height="24" rx="6" fill="#0d6efd"/>
              <path d="M7 14l3-3 2 2 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 className="display-5 fw-bold mb-0">StockSight</h1>
          </div>

          <p className="lead mb-3">Predict stock prices for any listed company. Just enter a ticker symbol and get a forecast with price charts.</p>

          <div className="d-flex justify-content-center gap-3 mb-3">
            <Button text="Open Dashboard" class="btn-primary" url="/dashboard" />
            <button onClick={() => setShowModal(true)} className="btn btn-outline-light">How it works</button>
          </div>

          <p className="small opacity-75">Simple, fast & free — see predictions in 20–90 seconds.</p>
        </section>

        <section className="mt-5">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm feature-card">
                <div className="card-body d-flex align-items-start gap-3">
                  <FontAwesomeIcon icon={faChartLine} size="2x" className="text-primary mt-1" />
                  <div>
                    <h5 className="card-title">See Price History</h5>
                    <p className="card-text mb-0">View the stock's price over time with trend lines to understand if it's going up or down.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm feature-card">
                <div className="card-body d-flex align-items-start gap-3">
                  <FontAwesomeIcon icon={faRobot} size="2x" className="text-success mt-1" />
                  <div>
                    <h5 className="card-title">Get Predictions</h5>
                    <p className="card-text mb-0">Our AI learns from years of data to forecast the next 3 months of prices.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm feature-card">
                <div className="card-body d-flex align-items-start gap-3">
                  <FontAwesomeIcon icon={faImage} size="2x" className="text-info mt-1" />
                  <div>
                    <h5 className="card-title">Free & Safe</h5>
                    <p className="card-text mb-0">No account fees or hidden costs. Your data is never stored on our servers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 text-center small text-muted">
          <p className="mb-1">Note: This tool provides forecasts for educational purposes only — not financial advice.</p>
        </section>
      </main>

      <style>{`
        .hero { background: linear-gradient(135deg, #061226 0%, #071726 60%); }
        .card { border-radius: .6rem; }
        .feature-card { border: 0; }
        .btn-primary { background: #0d6efd; border-color: #0d6efd; }
        .btn-outline-light { color: #fff; border-color: rgba(255,255,255,0.2); }
        @media (max-width: 576px) { .hero { padding: 2rem 1rem; } }
        .modal-backdrop { position: fixed; inset: 0; background: rgba(2,6,23,0.6); display: flex; align-items: center; justify-content: center; z-index: 1050; }
        .how-modal { background: #0b1220; color: #fff; padding: 1.5rem; border-radius: .5rem; max-width: 580px; width: 90%; max-height: 80vh; overflow-y: auto; }
        .how-modal h5 { margin-top: 0; margin-bottom: 1.25rem; font-weight: 600; }
        .steps { display: flex; flex-direction: column; gap: 1rem; margin: 1.5rem 0; }
        .step { display: flex; gap: 1rem; align-items: flex-start; }
        .step-number { 
          background: #0d6efd; 
          color: white; 
          width: 32px; 
          height: 32px; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-weight: 600; 
          flex-shrink: 0;
          margin-top: 0.25rem;
        }
        .step-title { margin: 0; font-size: 0.95rem; font-weight: 500; }
        .step p { margin: 0.5rem 0 0 0; font-size: 0.875rem; line-height: 1.4; color: #ccc; }
      `}</style>

      {showModal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="how-modal">
            <h5>Getting Started with StockSight</h5>
            
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div>
                  <h6 className="step-title">Create an Account</h6>
                  <p className="mb-2">Click "Register" if you're new, or "Login" if you already have an account. It takes just a few seconds.</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">2</div>
                <div>
                  <h6 className="step-title">Open the Dashboard</h6>
                  <p className="mb-2">After logging in, you'll see the prediction form. This is where you search for stocks.</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">3</div>
                <div>
                  <h6 className="step-title">Find a Stock (Optional)</h6>
                  <p className="mb-2">Click "Browse stocks" to see a list of company symbols if you don't know what to search for. Popular ones: AAPL (Apple), MSFT (Microsoft), TSLA (Tesla), GOOGL (Google).</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">4</div>
                <div>
                  <h6 className="step-title">Enter a Ticker Symbol</h6>
                  <p className="mb-2">Type any stock ticker (like AAPL, TSLA, MSFT) into the search box and click "Predict".</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">5</div>
                <div>
                  <h6 className="step-title">See Your Forecast</h6>
                  <p className="mb-2">Wait 20–90 seconds. You'll get a chart showing price history, a forecast for the next 3 months, and how confident our model is.</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">6</div>
                <div>
                  <h6 className="step-title">Make Informed Decisions</h6>
                  <p className="mb-0">Use the forecast as one piece of research—not as financial advice. Always do your own research before investing.</p>
                </div>
              </div>
            </div>

            <p className="small text-muted mt-3 mb-2">💡 Tip: You can search for as many stocks as you want. Each prediction takes 20–90 seconds.</p>

            <div className="d-flex justify-content-end">
              <button className="btn btn-light btn-sm" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Main