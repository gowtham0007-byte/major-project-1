import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { MapPin, CreditCard, ShoppingBag, CheckCircle2 } from 'lucide-react'

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { cartItems, shippingAddress, paymentMethod } = cart

  // Price Calculations
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  const shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2)
  const taxPrice = Number(0.15 * itemsPrice).toFixed(2)
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      navigate(`/order/${order.id || order._id}`)
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [navigate, success, order, dispatch])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    )
  }

  return (
    <Container className="py-4">
      <CheckoutSteps step1 step2 step3 step4 />
      <Row className="g-4">
        <Col md={8}>
          <ListGroup variant="flush" className="shadow-sm rounded-4 bg-white overflow-hidden border p-3">
            {/* Shipping Info */}
            <ListGroup.Item className="border-bottom py-3">
              <h5 className="fw-bold d-flex align-items-center gap-2 mb-2">
                <MapPin size={18} className="text-primary" /> Shipping Address
              </h5>
              <p className="mb-0 text-secondary small">
                <strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>

            {/* Payment Method */}
            <ListGroup.Item className="border-bottom py-3">
              <h5 className="fw-bold d-flex align-items-center gap-2 mb-2">
                <CreditCard size={18} className="text-primary" /> Payment Method
              </h5>
              <p className="mb-0 text-secondary small">
                <strong>Method:</strong> {paymentMethod}
              </p>
            </ListGroup.Item>

            {/* Order Items */}
            <ListGroup.Item className="py-3">
              <h5 className="fw-bold d-flex align-items-center gap-2 mb-3">
                <ShoppingBag size={18} className="text-primary" /> Order Items
              </h5>
              {cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index} className="px-0 py-2 border-0">
                      <Row className="align-items-center">
                        <Col md={1} xs={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={7} xs={6}>
                          <Link to={`/product/${item.product}`} className="fw-semibold text-dark text-decoration-none small">
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4} xs={4} className="text-end small fw-bold">
                          {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Order Summary Calculation */}
        <Col md={4}>
          <Card className="border-0 shadow-sm rounded-4 p-3 bg-white">
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-transparent border-0">
                <h5 className="fw-bold mb-3">Order Summary</h5>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between text-secondary small">
                <span>Items:</span>
                <span className="fw-semibold text-dark">${itemsPrice}</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between text-secondary small">
                <span>Shipping:</span>
                <span className="fw-semibold text-dark">${shippingPrice}</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between text-secondary small">
                <span>Tax (15%):</span>
                <span className="fw-semibold text-dark">${taxPrice}</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between fs-5 fw-bold text-dark pt-3 border-top">
                <span>Total:</span>
                <span style={{ color: '#4f46e5' }}>${totalPrice}</span>
              </ListGroup.Item>

              {error && (
                <ListGroup.Item className="bg-transparent border-0">
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              )}

              <ListGroup.Item className="bg-transparent border-0 pt-3">
                <Button
                  type="button"
                  className="w-100 rounded-pill btn-indigo py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                  style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
                >
                  <CheckCircle2 size={18} /> Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default PlaceOrderScreen
