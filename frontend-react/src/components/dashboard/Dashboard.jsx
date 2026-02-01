import {useEffect, useState} from 'react'
import axiosInstance from '../../axiosinstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

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
        <div className="row">
            <div className="col-md-6 mx-auto">
                <form onSubmit={handleSubmit}>
                    <input type="text" className='form-control' placeholder='Enter Stock Ticker' 
                    onChange={(e) => setTicker(e.target.value)} required
                    />
                    <small>{error && <div className='text-danger'>{error}</div>}</small>
                    <button type='submit' className='btn btn-info mt-3'>
                        {loading ? <span><FontAwesomeIcon icon={faSpinner} spin /> Please wait...</span>: 'See Prediction'}
                    </button>
                </form>
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

                <div className="text-light p-3">
                    <h4>Future Price Predictions (Next 3 Months)</h4>
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
                    <h4>Model Evalulation</h4>
                    <p>Mean Squared Error (MSE): {mse}</p>
                    <p>Root Mean Squared Error (RMSE): {rmse}</p>
                    <p>R-Squared: {r2}</p>
                </div>

            </div>
            )}
            

        </div>
    </div>
  )
}

export default Dashboard