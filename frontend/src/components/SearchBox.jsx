import React, { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} className="d-flex my-2 my-lg-0 me-3">
      <InputGroup style={{ maxWidth: '320px' }}>
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search products..."
          className="bg-light border-end-0 rounded-start-pill ps-3 shadow-none"
          style={{ fontSize: '0.9rem' }}
        />
        <Button
          type="submit"
          variant="outline-secondary"
          className="border-start-0 rounded-end-pill px-3 bg-light text-secondary"
        >
          <Search size={16} />
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchBox
