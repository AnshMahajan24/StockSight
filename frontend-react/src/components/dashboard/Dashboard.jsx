import {useEffect, useState} from 'react'
import axiosInstance from '../../axiosinstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
    const [ticker, setTicker] = useState('')
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [plot, setPlot] = useState()
    const [ma100, setMA100] = useState()
    const [ma200, setMA200] = useState()
    const [prediction, setPrediction] = useState()
    const [mse, setMSE] = useState()
    const [rmse, setRMSE] = useState()
    const [r2, setR2] = useState()
    const [futurePredictions, setFuturePredictions] = useState()

    useEffect(()=>{
        const fetchProtectedData = async () =>{
            try{
                const response = await axiosInstance.get('/protected-view/');
            }catch(error){
                console.error('Error fetching data:', error)
            }
        }
        fetchProtectedData();
    }, [])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true)
        setError('')
        try{
            const response = await axiosInstance.post('/predict/', {
                ticker: ticker
            });
            console.log(response.data);
            
            // Check if there's an error in the response data
            if(response.data.error){
                setError(response.data.error)
                setLoading(false)
                return
            }
            
            // Images are now base64-encoded data URLs from the backend
            setPlot(response.data.plot_img)
            setMA100(response.data.plot_100_dma)
            setMA200(response.data.plot_200_dma)
            setPrediction(response.data.plot_prediction)
            setMSE(response.data.mse)
            setRMSE(response.data.rmse)
            setR2(response.data.r2)
            setFuturePredictions(response.data.future_predictions)
        }catch(error){
            console.error('There was an error making the API request', error)
            const errorMessage = error.response?.data?.error || error.response?.data?.detail || 'Invalid ticker or an error occurred. Please try again.'
            setError(errorMessage)
        }finally{
            setLoading(false);
        }
    }

  return (
    <div className='container'>
                {loading && (
                    <div className="ds-overlay" role="status" aria-live="polite">
                        <div className="ds-spinner"> 
                            <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                            <div className="mt-2">Generating prediction — this can take 20–90 seconds</div>
                        </div>
                    </div>
                )}
        <div className="row">
            <div className="col-md-7 mx-auto">
              <div className="ds-form-section">
                <h5 className="text-light mb-3">Stock Prediction</h5>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input 
                            type="text" 
                            className='form-control' 
                            placeholder='Enter stock ticker (e.g., AAPL)' 
                            onChange={(e) => setTicker(e.target.value)} 
                            disabled={loading}
                            required
                        />
                        <button type='submit' className='btn btn-primary' disabled={loading}>
                            {loading ? <><FontAwesomeIcon icon={faSpinner} spin className="me-1"/> Wait</> : 'Predict'}
                        </button>
                    </div>
                    {error && <small className='text-danger d-block mt-2'>{error}</small>}
                    <small className='text-muted d-block mt-2'>Don't know a ticker? <a href="https://stockanalysis.com/stocks/" target="_blank" rel="noopener noreferrer" className="text-info">Browse stocks <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" className="ms-1"/></a></small>
                </form>
              </div>
            </div>

            {/* Print prediction plots */}
            {prediction && (
                <div className="prediction mt-5">
                <div className="p-3">
                    {plot && (
                        <img src={plot} style={{ maxWidth: '100%' }} />
                    )}
                </div>

                <div className="p-3">
                    {ma100 && (
                        <img src={ma100} style={{ maxWidth: '100%' }} />
                    )}
                </div>

                <div className="p-3">
                    {ma200 && (
                        <img src={ma200} style={{ maxWidth: '100%' }} />
                    )}
                </div>

                <div className="p-3">
                    {prediction && (
                        <img src={prediction} style={{ maxWidth: '100%' }} />
                    )}
                </div>

                <div className="text-light p-3 mt-3">
                    <h5>3-Month Forecast</h5>
                    {futurePredictions && (
                        <div className="row">
                            {futurePredictions.map((pred) => (
                                <div key={pred.month} className="col-md-4 mb-3">
                                    <div className="card bg-dark border-info">
                                        <div className="card-body">
                                            <h5 className="card-title text-info">Month {pred.month}</h5>
                                            <p className="card-text">
                                                <strong>Date:</strong> {pred.date}
                                            </p>
                                            <p className="card-text">
                                                <strong>Predicted Price:</strong> ${pred.predicted_price.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="text-light p-3">
                    <h5>Model Metrics</h5>
                    <div className="row">
                      <div className="col-md-4 mb-2">
                        <small className="text-muted">MSE</small>
                        <p className="mb-0 text-info">{mse?.toFixed ? mse.toFixed(2) : mse}</p>
                      </div>
                      <div className="col-md-4 mb-2">
                        <small className="text-muted">RMSE</small>
                        <p className="mb-0 text-info">{rmse?.toFixed ? rmse.toFixed(2) : rmse}</p>
                      </div>
                      <div className="col-md-4 mb-2">
                        <small className="text-muted">R²</small>
                        <p className="mb-0 text-info">{r2?.toFixed ? r2.toFixed(2) : r2}</p>
                      </div>
                    </div>
                </div>

            </div>
            )}
            

        </div>
    </div>
  )
}

// Inline styles for overlay
const styles = `
.ds-overlay { position: fixed; inset: 0; background: rgba(2,6,23,0.6); display: flex; align-items: center; justify-content: center; z-index: 2000; }
.ds-spinner { background: #0b1220; color: #fff; padding: 1rem 1.25rem; border-radius: .5rem; text-align: center; min-width: 260px; }
.ds-form-section { background: rgba(15,23,36,0.5); border-radius: .5rem; padding: 1rem; margin-bottom: 1rem; }
.input-group .btn-primary { background: #0d6efd; border-color: #0d6efd; }
@media (max-width: 576px) { .ds-spinner { min-width: 200px; } }
`

// append styles to document head at runtime (simple, isolated)
if (typeof document !== 'undefined' && !document.getElementById('ds-overlay-styles')) {
  const s = document.createElement('style')
  s.id = 'ds-overlay-styles'
  s.innerHTML = styles
  document.head.appendChild(s)
}

// append styles to document head at runtime (simple, isolated)
if (typeof document !== 'undefined' && !document.getElementById('ds-overlay-styles')) {
    const s = document.createElement('style')
    s.id = 'ds-overlay-styles'
    s.innerHTML = styles
    document.head.appendChild(s)
}

export default Dashboard