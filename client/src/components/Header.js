import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Container } from 'react-bootstrap'

export const Header = () => {
  return (
    <header>
      <Navbar expand="lg" className='navbar-dark bg-primary' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>AWP Shop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to='/cart'>
                <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>                
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link href="/login"><i className='fas fa-user'></i>Sign In</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
        
      </Navbar>
    </header>
  )
}
