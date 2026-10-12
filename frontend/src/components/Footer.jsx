import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto border-top border-secondary">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
            <span className="fw-semibold">E-Commerce Platform</span> &copy; {new Date().getFullYear()} All Rights Reserved.
          </Col>
          <Col md={6} className="text-center text-md-end text-muted small">
            Built with Django REST Framework, React, Redux & Bootstrap
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
