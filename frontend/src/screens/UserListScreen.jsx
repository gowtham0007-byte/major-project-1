import React, { useEffect } from 'react'
import { Table, Button, Container, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../actions/userActions'
import { Users, Check, X, Trash2 } from 'lucide-react'

const UserListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <Container className="py-4">
      <h2 className="fw-bold mb-4 d-flex align-items-center gap-2">
        <Users size={24} className="text-primary" /> Users Management
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
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const uId = user.id || user._id
                  return (
                    <tr key={uId}>
                      <td className="fw-semibold text-secondary">#{uId}</td>
                      <td className="fw-bold text-dark">{user.name}</td>
                      <td>
                        <a href={`mailto:${user.email}`} className="text-decoration-none">
                          {user.email}
                        </a>
                      </td>
                      <td>
                        {user.isAdmin ? (
                          <Badge bg="success" className="px-2 py-1 d-inline-flex align-items-center gap-1">
                            <Check size={14} /> Admin
                          </Badge>
                        ) : (
                          <Badge bg="secondary" className="px-2 py-1 d-inline-flex align-items-center gap-1">
                            <X size={14} /> Customer
                          </Badge>
                        )}
                      </td>
                      <td>
                        <Button
                          variant="light"
                          size="sm"
                          className="rounded-circle p-2 border text-danger"
                          onClick={() => deleteHandler(uId)}
                          disabled={user.email === userInfo.email}
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

export default UserListScreen
