import React, { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import Modalcenter from './components/Modalcenter'
import { useNavigate } from 'react-router-dom';

function Headers() {
    const [modalShow, setModalShow] = React.useState(false);
    const [data,setdata]=useState([])
    const nav=useNavigate()

    const Logout=()=>{
      localStorage.removeItem("token")
      nav('/login')
    }
  
  return (
    <div>

<Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Votting System</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Home</Nav.Link>
            <Nav.Link  onClick={() => setModalShow(true)}>Add Pole</Nav.Link>
            {/* <Nav.Link href="#features">view Result  </Nav.Link> */}
            <Nav.Link href="/sendchat">chat </Nav.Link>

            <Nav.Link onClick={Logout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Modalcenter
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

    </div>
  )
}

export default Headers