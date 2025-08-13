import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRegistration = async (e) => {
    e.preventDefault()
    setLoading(true)
    const userData = { username, email, password }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData)
      console.log(response.data)
      console.log('registration successful')
      setErrors({})
      setSuccess(true)
    } catch (error) {
      setErrors(error.response.data)
      setSuccess(false)
      console.error('registration error : ', error.response.data)
    } finally {
      setLoading(false)
    }
  }

  const ErrorMessage = ({ message }) => {
    if (!message) return null
    return (
      <div className="text-danger mt-1 d-flex align-items-center" style={{ fontSize: '0.85rem' }}>
        <i className="bi bi-exclamation-circle-fill me-1"></i> {message}
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">

             

              <h3 className="text-center mb-4 fw-bold" style={{ color: "#17a2b8" }}>
                Create an Account
              </h3>

              <form onSubmit={handleRegistration}>
                {/* Username */}
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control form-control-lg rounded-pill ${errors.username ? 'is-invalid' : ''}`}
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ paddingLeft: "20px" }}
                  />
                  <ErrorMessage message={errors.username} />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <input
                    type="email"
                    className={`form-control form-control-lg rounded-pill ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ paddingLeft: "20px" }}
                  />
                  <ErrorMessage message={errors.email} />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <input
                    type="password"
                    className={`form-control form-control-lg rounded-pill ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Set password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingLeft: "20px" }}
                  />
                  <ErrorMessage message={errors.password} />
                </div>

                 {/* Success Message */}
              {success && (
                <div className="alert alert-success py-2 text-center mb-4 rounded-3 shadow-sm">
                  Registration successful
                </div>
              )}

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
                      <span>Registering...</span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-info btn-lg rounded-pill shadow-sm"
                      style={{ height: "50px", fontWeight: "500" }}
                    >
                      Register
                    </button>
                  )}
                </div>
              </form>

              {/* Extra Info */}
              <p className="text-center text-muted mt-4 mb-0">
                Already have an account?{" "}
                <Link to={'/login'} className="text-info fw-semibold">
                  Login here
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
        .text-danger {
          color: #d9534f !important;
        }
        .alert-success {
          background-color: #d4edda;
          color: #155724;
        }
      `}</style>
    </div>
  )
}

export default Register
