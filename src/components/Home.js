import React from "react";
import styled from "styled-components";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

const Wrapper = styled.section`
  padding: 6em;
`;

export class Home extends React.Component {
  logged() {
    if (localStorage.getItem("token")) {
      return (
        <Container>
          <Row>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src="https://www.in-prep.eu/wp-content/uploads/2018/05/20180424_144045-256x256.jpg"
                />
                <Card.Body>
                  <Card.Title>Etudiants</Card.Title>
                  <Card.Text>
                    Gérer les étudiants et leurs affectations aux cours.
                  </Card.Text>
                  <Button href="/etudiants" variant="primary">
                    Accéder
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl0a77FNokptaef9yvpsqh4g7Pwn9XKZTSG8RXEvBMRBDwlRjreQ&s"
                />
                <Card.Body>
                  <Card.Title>Enseignants</Card.Title>
                  <Card.Text>
                    Gérer les enseignants et leurs affectations aux cours.
                  </Card.Text>
                  <Button href="/enseignants" variant="primary">
                    Accéder
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4jDyrK53v5uKEtMoK8IGnCyYeFcXdOc3se3yIyepm3wLy1aBK0Q&s"
                />
                <Card.Body>
                  <Card.Title>Cours</Card.Title>
                  <Card.Text>
                    Gérer les cours et les affectations des enseignants et
                    étudiants.
                  </Card.Text>
                  <Button href="/cours" variant="primary">
                    Accéder
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    }
  }

  notLogged() {
    if (!localStorage.getItem("token")) {
      return (
        <Card className="text-center">
          <Card.Header>Connexion</Card.Header>
          <Card.Body>
            <Card.Title>Bienvenue sur EMI.net</Card.Title>
            <Card.Text>Il semblerait que vous n'êtes pas connecté.</Card.Text>
            <Button href="/connexion" variant="primary">
              Se Connecter
            </Button>
          </Card.Body>
        </Card>
      );
    }
  }

  render() {
    return (
      <Wrapper>
        {this.notLogged()}
        {this.logged()}
      </Wrapper>
    );
  }
}
