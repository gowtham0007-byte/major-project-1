import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Container, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOrders } from '../actions/orderActions'
import { ShoppingBag, Eye } from 'lucide-react'

const OrderListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo])

  return (
    <Container className="py-4">
      <h2 className="fw-bold mb-4 d-flex align-items-center gap-2">
        <ShoppingBag size={24} className="text-primary" /> All Orders Management
      </h2>

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
                  <th>ORDER ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const oId = order.id || order._id
                  return (
                    <tr key={oId}>
                      <td className="fw-bold text-secondary">#{oId}</td>
                      <td>{order.user && (order.user.name || order.user.email)}</td>
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
                        <LinkContainer to={`/order/${oId}`}>
                          <Button variant="light" size="sm" className="rounded-pill px-3 border">
                            <Eye size={14} className="me-1" /> Details
                          </Button>
                        </LinkContainer>
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

export default OrderListScreen
