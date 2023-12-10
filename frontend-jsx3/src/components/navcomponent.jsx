import React from 'react'
import Babi from "../assets/babiiii.jpg"
import { Navbar,Container, Nav, NavDropdown, Button } from "react-bootstrap";
import Profile from './Profile';
import { Link } from 'react-router-dom';
const navcomponent = () => {
  return (
    <div>

<Navbar  className="border-bottom-py-3 shadow-sm">
    
      
    <Navbar.Collapse >
<Nav>
<Link to={'/menu'}>

  <img className="imageb" src={Babi} alt="" />
        <Nav.Link >  <Profile /> </Nav.Link>
        </Link>
     
      </Nav>
    </Navbar.Collapse>

</Navbar>
    </div>
  )
}

export default navcomponent