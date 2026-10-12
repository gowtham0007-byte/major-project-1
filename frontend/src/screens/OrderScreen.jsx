import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, Container, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'
import { MapPin, CreditCard, ShoppingBag, CheckCircle, Truck } from 'lucide-react'

const OrderScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  useEffect(() => {
    if (!order || successPay || successDeliver || (order.id || order._id) !== Number(id)) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(id))
    }
  }, [dispatch, id, successPay, successDeliver, order])

  const successPaymentHandler = () => {
    dispatch(payOrder(id, { id: 'PAYMENT_ID_12345', status: 'COMPLETED', update_time: new Date().toISOString() }))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Container className="py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="fw-bold text-dark mb-0">Order #{order.id || order._id}</h3>
        <Badge bg="light" text="dark" className="border px-3 py-2 rounded-pill fw-semibold">
          Created: {order.createdAt?.substring(0, 10)}
        </Badge>
      </div>

      <Row className="g-4">
        <Col md={8}>
          <ListGroup variant="flush" className="shadow-sm rounded-4 bg-white overflow-hidden border p-3">
            {/* Customer & Shipping Details */}
            <ListGroup.Item className="border-bottom py-3">
              <h5 className="fw-bold d-flex align-items-center gap-2 mb-2">
                <MapPin size={18} className="text-primary" /> Shipping Info
              </h5>
              <p className="mb-1 text-secondary small">
                <strong>Name:</strong> {order.user?.name} ({order.user?.email})
              </p>
              <p className="mb-2 text-secondary small">
                <strong>Address:</strong> {order.shippingAddress?.address},{' '}
                {order.shippingAddress?.city}, {order.shippingAddress?.postalCode},{' '}
                {order.shippingAddress?.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Delivered on {order.deliveredAt?.substring(0, 10)}</Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>

            {/* Payment Info */}
            <ListGroup.Item className="border-bottom py-3">
              <h5 className="fw-bold d-flex align-items-center gap-2 mb-2">
                <CreditCard size={18} className="text-primary" /> Payment Info
              </h5>
              <p className="mb-2 text-secondary small">
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt?.substring(0, 10)}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            {/* Order Items */}
            <ListGroup.Item className="py-3">
              <h5 className="fw-bold d-flex align-items-center gap-2 mb-3">
                <ShoppingBag size={18} className="text-primary" /> Order Items
              </h5>
              <ListGroup variant="flush">
                {order.orderItems?.map((item, index) => (
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
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Order Summary & Actions */}
        <Col md={4}>
          <Card className="border-0 shadow-sm rounded-4 p-3 bg-white">
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-transparent border-0">
                <h5 className="fw-bold mb-3">Order Summary</h5>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between text-secondary small">
                <span>Shipping:</span>
                <span className="fw-semibold text-dark">${order.shippingPrice}</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between text-secondary small">
                <span>Tax:</span>
                <span className="fw-semibold text-dark">${order.taxPrice}</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between fs-5 fw-bold text-dark pt-3 border-top">
                <span>Total:</span>
                <span style={{ color: '#4f46e5' }}>${order.totalPrice}</span>
              </ListGroup.Item>

              {/* Payment Action Simulation */}
              {!order.isPaid && (
                <ListGroup.Item className="bg-transparent border-0 pt-3">
                  {loadingPay && <Loader size="30px" />}
                  <Button
                    type="button"
                    className="w-100 rounded-pill btn-success py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                    onClick={successPaymentHandler}
                  >
                    <CheckCircle size={18} /> Simulate Test Payment
                  </Button>
                </ListGroup.Item>
              )}

              {/* Admin Delivery Toggle */}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item className="bg-transparent border-0 pt-3">
                  {loadingDeliver && <Loader size="30px" />}
                  <Button
                    type="button"
                    className="w-100 rounded-pill btn-primary py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                    onClick={deliverHandler}
                  >
                    <Truck size={18} /> Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default OrderScreen
