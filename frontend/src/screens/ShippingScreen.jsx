import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import { MapPin, ArrowRight } from 'lucide-react'

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [country, setCountry] = useState(shippingAddress.country || '')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <Container className="py-4">
      <CheckoutSteps step1 step2 />
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="d-flex align-items-center gap-2 mb-3">
              <MapPin className="text-primary" size={22} />
              <h4 className="fw-bold mb-0">Shipping Address</h4>
            </div>

            <Form onSubmit={submitHandler}>
              <Form.Group controlId="address" className="mb-3">
                <Form.Label className="fw-semibold small">Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter street address"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  className="rounded-3 py-2"
                />
              </Form.Group>

              <Form.Group controlId="city" className="mb-3">
                <Form.Label className="fw-semibold small">City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                  className="rounded-3 py-2"
                />
              </Form.Group>

              <Form.Group controlId="postalCode" className="mb-3">
                <Form.Label className="fw-semibold small">Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter postal code"
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="rounded-3 py-2"
                />
              </Form.Group>

              <Form.Group controlId="country" className="mb-4">
                <Form.Label className="fw-semibold small">Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter country"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                  className="rounded-3 py-2"
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100 rounded-pill py-2 fw-semibold btn-indigo d-flex align-items-center justify-content-center gap-2"
                style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
              >
                Continue to Payment <ArrowRight size={18} />
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ShippingScreen
