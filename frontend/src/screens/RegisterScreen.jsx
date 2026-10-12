import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Card, Container, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userActions'
import { UserPlus, Eye, EyeOff, CheckCircle2 } from 'lucide-react'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo, successMessage } = userRegister

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      setMessage('')
      dispatch(register(name, email, password))
    }
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={5}>
          <Card className="border-0 shadow-lg rounded-4 p-4 bg-white">
            <Card.Body>
              <div className="text-center mb-4">
                <div className="p-3 bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-2">
                  <UserPlus size={28} className="text-primary" />
                </div>
                <h3 className="fw-bold">Create an Account</h3>
                <p className="text-muted small">Sign up to unlock instant JWT session & checkout</p>
              </div>

              {message && <Message variant="danger">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>}
              {successMessage && (
                <Message variant="success">
                  <CheckCircle2 size={16} className="me-2 d-inline" /> {successMessage}
                </Message>
              )}
              {loading && <Loader size="50px" />}

              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label className="fw-semibold small">Full Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-3 py-2"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label className="fw-semibold small">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-3 py-2"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label className="fw-semibold small">Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-start-3 py-2 border-end-0"
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      className="rounded-end-3 border-start-0 bg-white text-muted"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="confirmPassword" className="mb-4">
                  <Form.Label className="fw-semibold small">Confirm Password</Form.Label>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="rounded-3 py-2"
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 rounded-pill py-2 fw-bold text-white btn-indigo mb-3"
                  disabled={loading}
                  style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
                >
                  Register & Sign Up
                </Button>
              </Form>

              <Row className="py-2 text-center">
                <Col className="small text-muted">
                  Have an Account?{' '}
                  <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="fw-semibold text-primary">
                    Login Here
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterScreen
