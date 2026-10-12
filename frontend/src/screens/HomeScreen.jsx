import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Badge } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'
import { Sparkles, ShieldCheck, Truck, Headphones } from 'lucide-react'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword') || ''

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <Container className="py-4">
      {/* Hero Banner */}
      {!keyword && (
        <div className="hero-banner rounded-4 p-5 text-white mb-5 position-relative overflow-hidden shadow">
          <Row className="align-items-center position-relative z-1">
            <Col lg={7}>
              <Badge bg="light" text="dark" className="px-3 py-2 rounded-pill fw-semibold mb-3">
                <Sparkles size={14} className="me-1 text-primary" /> Premium Quality & Top Brands
              </Badge>
              <h1 className="display-4 fw-extrabold mb-3">
                Discover Next-Gen Products
              </h1>
              <p className="lead mb-4 text-light opacity-90">
                Explore our handpicked collection of electronics, gadgets, and accessories with instant delivery and secure payments.
              </p>
            </Col>
          </Row>
        </div>
      )}

      {/* Feature Highlights */}
      {!keyword && (
        <Row className="g-4 mb-5 text-center">
          <Col md={4}>
            <div className="p-4 bg-white rounded-4 shadow-sm h-100 border">
              <Truck size={32} className="text-primary mb-3" />
              <h6 className="fw-bold mb-1">Fast & Free Shipping</h6>
              <p className="text-muted small mb-0">On all orders over $50 with live tracking</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 bg-white rounded-4 shadow-sm h-100 border">
              <ShieldCheck size={32} className="text-success mb-3" />
              <h6 className="fw-bold mb-1">Secure JWT Payments</h6>
              <p className="text-muted small mb-0">100% encrypted & protected transactions</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 bg-white rounded-4 shadow-sm h-100 border">
              <Headphones size={32} className="text-info mb-3" />
              <h6 className="fw-bold mb-1">24/7 Dedicated Support</h6>
              <p className="text-muted small mb-0">Expert assistance whenever you need it</p>
            </div>
          </Col>
        </Row>
      )}

      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="fw-bold text-dark mb-0">
          {keyword ? `Search Results for "${keyword}"` : 'Latest Products'}
        </h2>
        {products && (
          <span className="text-muted small fw-semibold">
            {products.length} Products Found
          </span>
        )}
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : products && products.length === 0 ? (
        <Message variant="info">No products found matching your search.</Message>
      ) : (
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product.id || product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default HomeScreen
