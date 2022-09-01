import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function Header({headerData}) {
  console.log(headerData);
  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand="sm">
      <Container>
        <Navbar.Brand href="/">So Chigusa</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-50 nav-justified">
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/cv">CV</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/research">Research</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/note">Note</Nav.Link>
            </Nav.Item>
            <NavDropdown title="Tips" id="basic-nav-dropdown">
              <NavDropdown.Item href="/tips">List</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/tips/test2">test2</NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
              <Nav.Link href="/git">Git</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
