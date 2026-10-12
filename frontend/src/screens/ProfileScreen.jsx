import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table, Card, Container, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { User, ShoppingBag, Eye, CheckCircle2 } from 'lucide-react'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, navigate, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      )
      setMessage('')
    }
  }

  return (
    <Container className="py-4">
      <Row className="g-4">
        {/* Left Column: User Profile Info Edit */}
        <Col md={4}>
          <Card className="border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="d-flex align-items-center gap-2 mb-3">
              <User className="text-primary" size={22} />
              <h4 className="fw-bold mb-0">User Profile</h4>
            </div>

            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {success && (
              <Message variant="success">
                <CheckCircle2 size={16} className="me-1 d-inline" /> Profile Updated Successfully!
              </Message>
            )}
            {loading && <Loader size="40px" />}

            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label className="fw-semibold small">Full Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-3"
                />
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label className="fw-semibold small">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-3"
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label className="fw-semibold small">Change Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Leave blank to keep unchanged"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-3"
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword" className="mb-4">
                <Form.Label className="fw-semibold small">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-3"
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100 rounded-pill py-2 fw-semibold btn-indigo"
                style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
              >
                Update Profile
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Right Column: Display My Orders at Profile Screen */}
        <Col md={8}>
          <Card className="border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <ShoppingBag className="text-primary" size={22} />
                <h4 className="fw-bold mb-0">My Orders History</h4>
              </div>
              {orders && (
                <Badge bg="light" text="dark" className="border px-3 py-2 rounded-pill fw-semibold">
                  {orders.length} Total Orders
                </Badge>
              )}
            </div>

            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant="danger">{errorOrders}</Message>
            ) : orders && orders.length === 0 ? (
              <Message variant="info">You have not placed any orders yet.</Message>
            ) : (
              <div className="table-responsive">
                <Table hover className="align-middle text-nowrap">
                  <thead className="table-light">
                    <tr>
                      <th>ORDER ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id || order._id}>
                        <td className="fw-bold text-secondary">#{order.id || order._id}</td>
                        <td className="small">{order.createdAt?.substring(0, 10)}</td>
                        <td className="fw-bold text-indigo" style={{ color: '#4f46e5' }}>
                          ${order.totalPrice}
                        </td>
                        <td>
                          {order.isPaid ? (
                            <Badge bg="success" className="px-2 py-1">
                              Paid ({order.paidAt?.substring(0, 10)})
                            </Badge>
                          ) : (
                            <Badge bg="danger" className="px-2 py-1">Not Paid</Badge>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            <Badge bg="success" className="px-2 py-1">
                              Delivered ({order.deliveredAt?.substring(0, 10)})
                            </Badge>
                          ) : (
                            <Badge bg="warning" text="dark" className="px-2 py-1">In Transit</Badge>
                          )}
                        </td>
                        <td>
                          <LinkContainer to={`/order/${order.id || order._id}`}>
                            <Button variant="light" size="sm" className="rounded-pill px-3 border">
                              <Eye size={14} className="me-1" /> Details
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileScreen
