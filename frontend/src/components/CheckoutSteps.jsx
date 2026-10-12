import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4 border-bottom pb-3 gap-2">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link className="fw-bold text-primary">1. Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className="text-muted">1. Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link className="fw-bold text-primary">2. Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className="text-muted">2. Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link className="fw-bold text-primary">3. Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className="text-muted">3. Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link className="fw-bold text-primary">4. Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className="text-muted">4. Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
