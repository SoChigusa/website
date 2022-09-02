import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function Header({ headerData }) {
  const newTips = headerData.tips.slice(0, 6);
  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand="sm">
      <Container>
        <Navbar.Brand href="/">So Chigusa</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-50 nav-justified">
            <Nav.Item key="home">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item key="cv">
              <Nav.Link href="/cv">CV</Nav.Link>
            </Nav.Item>
            <Nav.Item key="research">
              <Nav.Link href="/research">Research</Nav.Link>
            </Nav.Item>
            <Nav.Item key="note">
              <Nav.Link href="/note">Note</Nav.Link>
            </Nav.Item>
            <NavDropdown key="tips" title="Tips" id="basic-nav-dropdown">
              <NavDropdown.Item href="/tips">List</NavDropdown.Item>
              <NavDropdown.Divider />
              {
                newTips.map((post) => (
                  <NavDropdown.Item href={`/tips/${post.slug}`}>{post.frontMatter.title}</NavDropdown.Item>
                ))
              }
              <NavDropdown.Divider />
              <NavDropdown.Item href="/tips">もっと見る</NavDropdown.Item>
            </NavDropdown>
            <Nav.Item key="git">
              <Nav.Link href="/git">Git</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
