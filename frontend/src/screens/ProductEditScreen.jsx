import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { ArrowLeft, Save, Upload } from 'lucide-react'

const ProductEditScreen = () => {
  const { id: productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/admin/productlist')
    } else {
      if (!product || !product.name || (product.id || product._id) !== Number(productId)) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    formData.append('product_id', productId)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/products/upload/', formData, config)

      setImage(data)
      setUploading(false)
    } catch (err) {
      console.error(err)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    )
  }

  return (
    <Container className="py-4">
      <Link to="/admin/productlist" className="btn btn-light border rounded-pill mb-4 px-3 d-inline-flex align-items-center gap-2">
        <ArrowLeft size={16} /> Back to Product List
      </Link>

      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <Card className="border-0 shadow-sm rounded-4 p-4 bg-white">
            <h3 className="fw-bold mb-4">Edit Product #{productId}</h3>

            {loadingUpdate && <Loader size="40px" />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="name" className="mb-3">
                      <Form.Label className="fw-semibold small">Product Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-3"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="price" className="mb-3">
                      <Form.Label className="fw-semibold small">Price ($)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="rounded-3"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="image" className="mb-3">
                  <Form.Label className="fw-semibold small">Image URL / File</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image URL or upload below"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="rounded-3 mb-2"
                  />
                  <Form.Control
                    type="file"
                    onChange={uploadFileHandler}
                    className="rounded-3"
                  />
                  {uploading && <Loader size="30px" />}
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="brand" className="mb-3">
                      <Form.Label className="fw-semibold small">Brand</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="rounded-3"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="countInStock" className="mb-3">
                      <Form.Label className="fw-semibold small">Count In Stock</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter stock quantity"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                        className="rounded-3"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="category" className="mb-3">
                  <Form.Label className="fw-semibold small">Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded-3"
                  />
                </Form.Group>

                <Form.Group controlId="description" className="mb-4">
                  <Form.Label className="fw-semibold small">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="4"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="rounded-3"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 rounded-pill py-2 fw-semibold btn-indigo d-flex align-items-center justify-content-center gap-2"
                  style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
                >
                  <Save size={18} /> Update Product Details
                </Button>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductEditScreen
