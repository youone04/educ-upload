import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import jwtDecode from 'jwt-decode';


function NavbarComp() {
  const getDataLogin = useSelector((state) => state.login);
  const { token } = getDataLogin.login;


  return (
    <Navbar bg="dark" variant="dark" style={{
      position: 'fixed', 
      zIndex: 1, 
      width: '100%',
      top: 0}} collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand className="m-1" as={Link} to="/"><b>IDN ED</b></Navbar.Brand>
        <Navbar.Toggle  className="m-1" aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse  className="m-2" id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features"><b>ABOUT</b></Nav.Link>
            <Nav.Link href="#pricing"><b>KONTAK</b></Nav.Link>
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            <Nav.Link  as={Link} to="/login">{
              token? jwtDecode(token).name.toUpperCase() : 'LOGIN'
            }</Nav.Link>
            {
              !token?
              <Nav.Link eventKey={2} href="#memes">
              DAFTAR
            </Nav.Link>:""
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;