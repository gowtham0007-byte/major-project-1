import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form, Badge, Container } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react'

const ProductScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productCreateReview = useSelector((state) => state.productCreateReview)
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productCreateReview

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted Successfully!')
      setRating(5)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(id))
  }, [dispatch, id, successProductReview])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const submitReviewHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(id, { rating, comment }))
  }

  return (
    <Container className="py-4">
      <Link to="/" className="btn btn-light border rounded-pill mb-4 px-3 d-inline-flex align-items-center gap-2">
        <ArrowLeft size={16} /> Back to Products
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="g-4 mb-5">
            {/* Product Image */}
            <Col md={6}>
              <div className="bg-white rounded-4 p-4 shadow-sm text-center border">
                <Image
                  src={product.image}
                  alt={product.name}
                  fluid
                  className="rounded-3 object-fit-contain"
                  style={{ maxHeight: '420px' }}
                />
              </div>
            </Col>

            {/* Product Details */}
            <Col md={3}>
              <ListGroup variant="flush" className="bg-transparent">
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <span className="text-uppercase text-primary small fw-bold">{product.brand}</span>
                  <h3 className="fw-bold mt-1 text-dark">{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Rating value={product.rating} text={`${product.numReviews} ratings`} />
                </ListGroup.Item>

                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <h4 className="fw-extrabold text-indigo" style={{ color: '#4f46e5' }}>
                    ${product.price}
                  </h4>
                </ListGroup.Item>

                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <p className="text-secondary small leading-relaxed">{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            {/* Buy Card */}
            <Col md={3}>
              <Card className="border-0 shadow-sm rounded-4 p-3 bg-white">
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <span className="text-muted fw-semibold">Price:</span>
                    <span className="fw-bold text-dark fs-5">${product.price}</span>
                  </ListGroup.Item>

                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <span className="text-muted fw-semibold">Status:</span>
                    {product.countInStock > 0 ? (
                      <Badge bg="success" className="px-2 py-1">In Stock ({product.countInStock})</Badge>
                    ) : (
                      <Badge bg="danger" className="px-2 py-1">Out of Stock</Badge>
                    )}
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <span className="text-muted fw-semibold">Quantity:</span>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="w-auto rounded-3 form-select-sm"
                      >
                        {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item className="pt-3 border-0">
                    <Button
                      onClick={addToCartHandler}
                      className="w-100 rounded-pill btn-indigo py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                      disabled={product.countInStock === 0}
                      style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
                    >
                      <ShoppingCart size={18} /> Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          {/* Customer Reviews Section */}
          <Row className="mt-5">
            <Col md={8}>
              <div className="bg-white rounded-4 p-4 shadow-sm border">
                <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
                  <Star size={20} className="text-warning fill-warning" /> Customer Reviews
                </h4>

                {product.reviews && product.reviews.length === 0 && (
                  <Message variant="info">No reviews yet for this product. Be the first to review!</Message>
                )}

                <ListGroup variant="flush" className="mb-4">
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <ListGroup.Item key={review.id || review._id} className="px-0 py-3 border-bottom">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <strong className="text-dark">{review.name}</strong>
                          <span className="text-muted small">{review.createdAt?.substring(0, 10)}</span>
                        </div>
                        <Rating value={review.rating} />
                        <p className="mt-2 text-secondary mb-0 small">{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                </ListGroup>

                {/* Write Review Form */}
                <div className="pt-3 border-top">
                  <h5 className="fw-bold mb-3">Write a Review</h5>
                  {loadingProductReview && <Loader size="40px" />}
                  {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}

                  {userInfo ? (
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group controlId="rating" className="mb-3">
                        <Form.Label className="fw-semibold small">Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          className="rounded-3"
                        >
                          <option value="5">5 - Excellent</option>
                          <option value="4">4 - Very Good</option>
                          <option value="3">3 - Average</option>
                          <option value="2">2 - Poor</option>
                          <option value="1">1 - Terrible</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="comment" className="mb-3">
                        <Form.Label className="fw-semibold small">Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Share your thoughts about this product..."
                          className="rounded-3"
                          required
                        />
                      </Form.Group>

                      <Button
                        type="submit"
                        variant="primary"
                        className="rounded-pill px-4"
                        disabled={loadingProductReview}
                      >
                        Submit Review
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="info">
                      Please <Link to="/login">sign in</Link> to write a review.
                    </Message>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default ProductScreen
