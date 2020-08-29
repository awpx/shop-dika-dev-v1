import React from 'react';
import { Container } from 'react-bootstrap'
import { Footer } from './components/Footer';
import { Header } from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <main>
      <Container>
        main
      </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
