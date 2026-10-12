import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Card, Container, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions'
import { Eye, EyeOff, LogIn } from 'lucide-react'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={5}>
          <Card className="border-0 shadow-lg rounded-4 p-4 bg-white">
            <Card.Body>
              <div className="text-center mb-4">
                <div className="p-3 bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-2">
                  <LogIn size={28} className="text-primary" />
                </div>
                <h3 className="fw-bold">Welcome Back</h3>
                <p className="text-muted small">Sign in with your JWT credentials to continue</p>
              </div>

              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader size="50px" />}

              <Form onSubmit={submitHandler}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label className="fw-semibold small">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email (e.g., john@example.com)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-3 py-2"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-4">
                  <Form.Label className="fw-semibold small">Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password (e.g., password123)"
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

                <Button
                  type="submit"
                  className="w-100 rounded-pill py-2 fw-bold text-white btn-indigo mb-3"
                  disabled={loading}
                  style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
                >
                  Sign In
                </Button>
              </Form>

              <Row className="py-2 text-center">
                <Col className="small text-muted">
                  New Customer?{' '}
                  <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="fw-semibold text-primary">
                    Register Here
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

export default LoginScreen
