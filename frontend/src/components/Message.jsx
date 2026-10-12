import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant = 'info', children }) => {
  return (
    <Alert variant={variant} className="shadow-sm border-0 rounded-3 my-3">
      {children}
    </Alert>
  )
}

export default Message
