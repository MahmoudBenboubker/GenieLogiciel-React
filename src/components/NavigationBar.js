import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }

  .navbar-brand,
  .navbar-nav .nav-link {
    color: #bbb;

    &:hover {
      color: white;
    }
  }
`;

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogged: false };
  }

  checkLogged() {
    if (localStorage.getItem("token")) {
      return (
        <React.Fragment>
          <Nav.Item>
            {" "}
            <Nav.Link href="/">Accueil</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {" "}
            <Nav.Link href="/cours">Cours</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {" "}
            <Nav.Link href="/enseignants">Enseignants</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {" "}
            <Nav.Link href="/etudiants">Étudiants</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {" "}
            <Nav.Link
              eventKey="logOff"
              onSelect={() => localStorage.removeItem("token")}
              href="/"
            >
              Déconnexion
            </Nav.Link>
          </Nav.Item>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Nav.Item>
            {" "}
            <Nav.Link href="/connexion">Connexion</Nav.Link>
          </Nav.Item>
        </React.Fragment>
      );
    }
  }
  render() {
    return (
      <Styles>
        <Navbar expand="lg">
          <Navbar.Brand href="/">EMI Net</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">{this.checkLogged()}</Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles>
    );
  }
}
