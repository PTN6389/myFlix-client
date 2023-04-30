import { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavigationBar = ({user, onLoggedOut, onSearch}) => {
  const [query, setQuery] = useState("");

useEffect(() => {
  onSearch(query);
}, [query]);
  



  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={() => setQuery("")}>myFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
                <>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                </>
            )}
            {user && (
                <>
                    <Nav.Link as={Link} to="/" onClick={() => setQuery("")}>Home</Nav.Link>
                    <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                </>
            )}
            
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="outline-light" onClick={() => { onSearch(query);}}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

