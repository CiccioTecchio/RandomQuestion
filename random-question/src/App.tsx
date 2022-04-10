import { Container } from 'react-bootstrap';
import './App.scss';
import Body from './components/body/Body';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

function App() {
  

  return (
    <Container fluid>    
      <Header/>
      <Body/>
      <Footer/>
    </Container>
  );
}

export default App;
