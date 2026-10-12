import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { ShoppingBag, User, LogOut, ShieldCheck, Package, Users, ShoppingCart } from 'lucide-react'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const logoutHandler = () => {
    dispatch(logout())
  }

  const totalCartItems = cartItems.reduce((acc, item) => acc + Number(item.qty), 0)

  return (
    <header className="sticky-top">
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="py-3 navbar-custom shadow-sm">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="fw-extrabold fs-4 d-flex align-items-center gap-2">
              <span className="p-2 rounded-3 bg-gradient-indigo text-white d-inline-flex align-items-center">
                <ShoppingBag size={20} />
              </span>
              <span className="brand-text">E-COMMERCE</span>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="mx-auto my-2 my-lg-0">
              <SearchBox />
            </div>

            <Nav className="ms-auto align-items-lg-center gap-2">
              <LinkContainer to="/cart">
                <Nav.Link className="d-flex align-items-center gap-1 position-relative me-2">
                  <ShoppingCart size={18} />
                  <span>Cart</span>
                  {totalCartItems > 0 && (
                    <Badge
                      bg="indigo"
                      style={{ backgroundColor: '#6366f1' }}
                      pill
                      className="ms-1"
                    >
                      {totalCartItems}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  title={
                    <span className="d-inline-flex align-items-center gap-1">
                      <User size={18} />
                      {userInfo.name || userInfo.username}
                    </span>
                  }
                  id="username"
                  className="custom-nav-dropdown"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item className="d-flex align-items-center gap-2">
                      <User size={16} /> Profile & Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler} className="d-flex align-items-center gap-2 text-danger">
                    <LogOut size={16} /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="d-flex align-items-center gap-1 btn btn-outline-light rounded-pill px-3 py-1 text-white">
                    <User size={18} /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title={
                    <span className="d-inline-flex align-items-center gap-1 text-warning fw-semibold">
                      <ShieldCheck size={18} /> Admin
                    </span>
                  }
                  id="adminmenu"
                >
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item className="d-flex align-items-center gap-2">
                      <Users size={16} /> Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item className="d-flex align-items-center gap-2">
                      <Package size={16} /> Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item className="d-flex align-items-center gap-2">
                      <ShoppingBag size={16} /> Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
