import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import { CreditCard, ArrowRight } from 'lucide-react'

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (!shippingAddress.address) {
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <Container className="py-4">
      <CheckoutSteps step1 step2 step3 />
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="d-flex align-items-center gap-2 mb-3">
              <CreditCard className="text-primary" size={22} />
              <h4 className="fw-bold mb-0">Select Payment Method</h4>
            </div>

            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-4">
                <Form.Label as="legend" className="fw-semibold small text-muted mb-3">
                  Choose Payment Provider
                </Form.Label>
                <Col>
                  <div className="p-3 border rounded-3 mb-2 d-flex align-items-center gap-3 bg-light">
                    <Form.Check
                      type="radio"
                      label="PayPal or Credit Card"
                      id="PayPal"
                      name="paymentMethod"
                      value="PayPal"
                      checked={paymentMethod === 'PayPal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="fw-bold text-dark"
                    />
                  </div>

                  <div className="p-3 border rounded-3 d-flex align-items-center gap-3 bg-light">
                    <Form.Check
                      type="radio"
                      label="Stripe / Debit Card"
                      id="Stripe"
                      name="paymentMethod"
                      value="Stripe"
                      checked={paymentMethod === 'Stripe'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="fw-bold text-dark"
                    />
                  </div>
                </Col>
              </Form.Group>

              <Button
                type="submit"
                className="w-100 rounded-pill py-2 fw-semibold btn-indigo d-flex align-items-center justify-content-center gap-2"
                style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
              >
                Continue to Order Overview <ArrowRight size={18} />
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default PaymentScreen
