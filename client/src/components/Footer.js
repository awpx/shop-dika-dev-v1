import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
          2020 Copyright &copy;  AWP Shop - All Right Reserved
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
