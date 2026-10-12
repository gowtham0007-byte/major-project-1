import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Container, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import { Plus, Edit, Trash2, Package } from 'lucide-react'

const ProductListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login')
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id || createdProduct.id}/edit`)
    } else {
      dispatch(listProducts())
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <Container className="py-4">
      <Row className="align-items-center mb-4">
        <Col>
          <h2 className="fw-bold mb-0 d-flex align-items-center gap-2">
            <Package size={24} className="text-primary" /> Products Management
          </h2>
        </Col>
        <Col className="text-end">
          <Button
            className="rounded-pill btn-indigo px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2"
            onClick={createProductHandler}
            style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
          >
            <Plus size={18} /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader size="40px" />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader size="40px" />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="bg-white rounded-4 shadow-sm border p-3">
          <div className="table-responsive">
            <Table hover className="align-middle text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>STOCK</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const pId = product.id || product._id
                  return (
                    <tr key={pId}>
                      <td className="fw-semibold text-secondary">#{pId}</td>
                      <td className="fw-bold text-dark">{product.name}</td>
                      <td className="fw-bold text-indigo" style={{ color: '#4f46e5' }}>
                        ${product.price}
                      </td>
                      <td>
                        <Badge bg="light" text="dark" className="border">
                          {product.category}
                        </Badge>
                      </td>
                      <td>{product.brand}</td>
                      <td>
                        {product.countInStock > 0 ? (
                          <Badge bg="success" className="px-2 py-1">
                            {product.countInStock}
                          </Badge>
                        ) : (
                          <Badge bg="danger" className="px-2 py-1">
                            0 (Out of stock)
                          </Badge>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/admin/product/${pId}/edit`}>
                          <Button variant="light" size="sm" className="me-2 rounded-circle p-2 border">
                            <Edit size={16} className="text-primary" />
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="light"
                          size="sm"
                          className="rounded-circle p-2 border text-danger"
                          onClick={() => deleteHandler(pId)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </Container>
  )
}

export default ProductListScreen
