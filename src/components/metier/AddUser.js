import React, { Component } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { postEnseignant } from "../../fetch-API/users";

export default class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = { matricule: "", nom: "", prenom: "", email: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  formStatut() {
    if (this.state.userStatut === "Étudiant") {
      return (
        <React.Fragment>
          <Form.Group controlId="formGenie">
            <Form.Label>Génie</Form.Label>
            <Form.Control as="select">
              <option>...</option>
              <option>Génie Informatique</option>
              <option>Génie Civil</option>
              <option>Génie Industriel</option>
              <option>Génie Électrique</option>
            </Form.Control>
            <Form.Text className="text-muted">
              Entrer le génie de l'étudiant.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formGenie">
            <Form.Label>Promotion</Form.Label>
            <Form.Control as="select">
              <option>...</option>
              <option>1ère Année</option>
              <option>2ème Année</option>
              <option>3ème Année</option>
            </Form.Control>
            <Form.Text className="text-muted">
              Indiquer l'année de l'étudiant.
            </Form.Text>
          </Form.Group>
        </React.Fragment>
      );
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const enseignant = {
      idEnseignant: this.state.matricule,
      nom: this.state.nom,
      prenom: this.state.prenom,
      mail: this.state.email
    };

    postEnseignant(enseignant).then(this.props.history.push("/enseignants",{enseignant : enseignant}));
  }

  render() {
    return (
      <React.Fragment>
        <Title>Ajouter un nouvel enseignant</Title>
        <Wrapper>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formLastName">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                name="nom"
                value={this.state.nom}
                onChange={this.handleInputChange}
                type="text"
                placeholder=""
              />
            </Form.Group>

            <Form.Group controlId="formFirstName">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                name="prenom"
                value={this.state.prenom}
                onChange={this.handleInputChange}
                type="text"
                placeholder=""
              />
            </Form.Group>

            <Form.Group controlId="formMatricule">
              <Form.Label>Matricule</Form.Label>
              <Form.Control
                name="matricule"
                value={this.state.matricule}
                onChange={this.handleInputChange}
                type="number"
                placeholder=""
              />
            </Form.Group>

            <Form.Group controlId="formMatricule">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                type="email"
                placeholder=""
              />
            </Form.Group>

            <Button onSubmit={this.handleSubmit} primary type="submit">
              Ajouter
            </Button>
          </Form>
        </Wrapper>
      </React.Fragment>
    );
  }
}

const Wrapper = styled.div`
  padding: 4em;
  border: 5px solid #428bca;
  border-radius: 8px;
  margin: 4em;
  flex: 5 5;
  flex-direction: row;
`;

const Button = styled.button`
  color: #fff;
  background-color: #428bca;
  font-size: 1em;

  padding: 0.25em 1em;

  border: 2px solid #428bca;
  border-radius: 5px;

  margin: 0.25em;
`;

const Title = styled.h1`
  color: #428bca;
  font-size: 2em;
  text-align: center;
`;
