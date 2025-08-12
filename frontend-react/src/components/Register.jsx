import React from 'react'
import { Link} from 'react-router-dom'
const  Register = () => {
  return (
    <>
       <div className="container py-5">
    <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-5">
                    <h3 className="text-center mb-4 fw-bold" style={{ color: "#17a2b8" }}>
                        Create an Account
                    </h3>
                    <form>
                        {/* Username */}
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control form-control-lg rounded-pill"
                                placeholder="Username"
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control form-control-lg rounded-pill"
                                placeholder="Email address"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <input
                                type="password"
                                className="form-control form-control-lg rounded-pill"
                                placeholder="Set password"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="d-grid">
                            <button
                                type="submit"
                                className="btn btn-info btn-lg rounded-pill shadow-sm"
                            >
                                Register
                            </button>
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
</div>

    </>
  )
}

export default  Register