import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { AuthContext } from '../AuthProvider'
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const {isLoggedIn, setIsLoggedIn } = React.useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const userinfo = {username , password}
    console.log(userinfo)
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/' , userinfo)
      localStorage.setItem('access_token' , response.data.access)
      localStorage.setItem('refresh_token' , response.data.refresh)
      console.log('login successful')
      setIsLoggedIn(true);
      // Redirect to dashboard or home page
      window.location.href = '/' 
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message)
      setError(error.response?.data?.detail || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">

              {/* Title */}
              <h3 className="text-center mb-4 fw-bold" style={{ color: "#17a2b8" }}>
                Login
              </h3>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button type="button" className="btn-close" onClick={() => setError('')}></button>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin}>
                {/* Username */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-pill"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ paddingLeft: "20px" }}
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <input
                    type="password"
                    className="form-control form-control-lg rounded-pill"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingLeft: "20px" }}
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  {loading ? (
                    <button
                      type="submit"
                      className="btn btn-info btn-lg rounded-pill shadow-sm d-flex justify-content-center align-items-center gap-2"
                      style={{ height: "50px", fontWeight: "500" }}
                      disabled
                    >
                      <FontAwesomeIcon icon={faSpinner} spin />
                      <span>Logging in...</span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-info btn-lg rounded-pill shadow-sm"
                      style={{ height: "50px", fontWeight: "500" }}
                    >
                      Login
                    </button>
                  )}
                </div>
              </form>

              {/* Extra Info */}
              <p className="text-center text-muted mt-4 mb-0">
                Don’t have an account?{" "}
                <Link to={'/register'} className="text-info fw-semibold">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inline styling for better UI */}
      <style>{`
        .form-control:focus {
          border-color: #17a2b8;
          box-shadow: 0 0 6px rgba(23, 162, 184, 0.4);
        }
      `}</style>
    </div>
  )
}

export default Login
