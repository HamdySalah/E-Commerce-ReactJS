import React from 'react'
import { Link } from "react-router"

export default function NotFound() {
  return (
    <div className="text-center py-5">
      <div className="card border-0 shadow-sm p-5">
        <h1 className="display-1 fw-bold text-primary mb-4">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="lead text-muted mb-5">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <div>
          <Link to="/" className="btn btn-custom-gradient btn-lg">
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
