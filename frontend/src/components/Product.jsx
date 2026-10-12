import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  const productId = product.id || product._id

  return (
    <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden product-card hover-lift">
      <Link to={`/product/${productId}`}>
        <div className="position-relative overflow-hidden bg-light text-center p-3">
          <Card.Img
            src={product.image}
            variant="top"
            className="product-image object-fit-contain"
            style={{ height: '220px', transition: 'transform 0.3s ease' }}
          />
          {product.countInStock === 0 && (
            <Badge bg="danger" className="position-absolute top-0 end-0 m-3 px-2 py-1">
              Out of Stock
            </Badge>
          )}
        </div>
      </Link>

      <Card.Body className="d-flex flex-column justify-content-between p-4">
        <div>
          <div className="text-uppercase text-muted small fw-bold mb-1">{product.brand}</div>
          <Link to={`/product/${productId}`} className="text-decoration-none text-dark">
            <Card.Title as="h6" className="fw-semibold text-truncate mb-2" title={product.name}>
              {product.name}
            </Card.Title>
          </Link>
          <Card.Text as="div" className="mb-2">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </Card.Text>
        </div>

        <div className="d-flex align-items-center justify-content-between mt-3 pt-2 border-top">
          <span className="fs-5 fw-bold text-indigo" style={{ color: '#4f46e5' }}>
            ${product.price}
          </span>
          <Link
            to={`/product/${productId}`}
            className="btn btn-outline-primary btn-sm rounded-pill px-3"
          >
            View Details
          </Link>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Product
