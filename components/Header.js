import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
      <Container>
        <Navbar.Brand href="home">So Chigusa</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/cv">CV</Nav.Link>
            <Nav.Link href="/research">Research</Nav.Link>
            <Nav.Link href="/note">Note</Nav.Link>
            <NavDropdown title="Tips" id="basic-nav-dropdown">
              <NavDropdown.Item href="/tips">List</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/tips/test2">test2</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/git">Git</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}