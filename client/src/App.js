import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HomePages } from './pages/HomePages'
import { ProductPages } from './pages/ProductPages'


const App = () => {
  return (
    <Router>
      <Header />
        <main className='py-3'>
          <Container>
            <Route exact path='/' component={HomePages} />
            <Route path='/product/:id' component={ProductPages} />
          </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App
