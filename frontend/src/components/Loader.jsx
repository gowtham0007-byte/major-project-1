import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = ({ size = '100px' }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center my-5 py-4">
      <Spinner
        animation="border"
        role="status"
        style={{
          width: size,
          height: size,
          margin: 'auto',
          display: 'block',
          color: '#6366f1'
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <span className="mt-3 text-muted fw-semibold">Loading data...</span>
    </div>
  )
}

export default Loader
