import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../Logo/bookspace_logo.png';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';

function NavBar() {

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt=""
            width="30"
            height="30"
            className="d-inline-block align-top"
            style={{ "filter": "invert(100%)" }}
          />{' '}BookSpace</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
            variant="underline"
          >
            <Nav.Link as={Link} to="/" className={`${location.pathname === "/" ? "active" : ""}`}>Home</Nav.Link>
            <Nav.Link as={Link} to="/About" className={`${location.pathname === "/About" ? "active" : ""}`}>About</Nav.Link>
          </Nav>
          {!localStorage.getItem('token') ? <Form className="d-flex">
            <Link to='/login' className='btn btn-success mx-1'>Login</Link>
            <Link to='/signup' className='btn btn-success mx-1'>SignUp</Link>
          </Form> : <Button className='btn-success' onClick={handleLogout}>Logout</Button>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;