import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, Container } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react'

const CartScreen = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }

  return (
    <Container className="py-4">
      <h2 className="fw-bold mb-4 d-flex align-items-center gap-2">
        <ShoppingBag size={24} className="text-primary" /> Shopping Cart
      </h2>

      <Row className="g-4">
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message variant="info">
              Your cart is empty. <Link to="/">Go Back Shopping</Link>
            </Message>
          ) : (
            <ListGroup variant="flush" className="shadow-sm rounded-4 bg-white overflow-hidden border">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product} className="p-3 border-bottom">
                  <Row className="align-items-center g-3">
                    <Col md={2} xs={3}>
                      <Image src={item.image} alt={item.name} fluid rounded className="bg-light p-1" />
                    </Col>
                    <Col md={4} xs={9}>
                      <Link to={`/product/${item.product}`} className="fw-semibold text-dark text-decoration-none">
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2} xs={4} className="fw-bold text-indigo" style={{ color: '#4f46e5' }}>
                      ${item.price}
                    </Col>
                    <Col md={2} xs={4}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                        className="rounded-3 form-select-sm"
                      >
                        {[...Array(Math.min(item.countInStock, 10)).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2} xs={4} className="text-end">
                      <Button
                        type="button"
                        variant="light"
                        className="text-danger border-0 p-2 rounded-circle hover-bg-danger"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        {/* Subtotal Summary Card */}
        <Col md={4}>
          <Card className="border-0 shadow-sm rounded-4 p-3 bg-white">
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-transparent">
                <h5 className="fw-bold mb-3">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2 text-secondary">
                  <span>Total Items:</span>
                  <span className="fw-bold text-dark">
                    {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                  </span>
                </div>
                <div className="d-flex justify-content-between fs-5 fw-bold text-dark pt-2 border-top">
                  <span>Subtotal:</span>
                  <span style={{ color: '#4f46e5' }}>
                    ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                  </span>
                </div>
              </ListGroup.Item>

              <ListGroup.Item className="bg-transparent border-0 pt-3">
                <Button
                  type="button"
                  className="w-100 rounded-pill btn-indigo py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                  style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
                >
                  Proceed To Checkout <ArrowRight size={18} />
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CartScreen
