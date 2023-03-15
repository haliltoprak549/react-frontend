import React from "react"
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

const NavigationBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Hostel Management System</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home Page</Nav.Link>
                        <NavDropdown title="Guests" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/guests">List Guests</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/guests/add">
                                Add New Guest

                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Rooms" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/rooms">List Rooms</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/rooms/add">
                                Add New Room
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/support">Support Us</Nav.Link>
                        <Nav.Link href="/about">About Us</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar