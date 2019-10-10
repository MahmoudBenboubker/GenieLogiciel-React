import React, { Component } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { postEnseignant, updateEnseignant } from "../../fetch-API/users";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = { idEnseignant: "", nom: "", prenom: "", email: "" };
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

  componentDidMount() {
    if (this.props.location.state) {
      const e = this.props.location.state.enseignant;
      this.setState({
        idEnseignant: e.idEnseignant,
        email: e.mail,
        nom: e.nom,
        prenom: e.prenom
      });
    }else {}
  }

  handleSubmit(event) {
    event.preventDefault();
    const enseignant = {
      idEnseignant: this.state.idEnseignant,
      nom: this.state.nom,
      prenom: this.state.prenom,
      mail: this.state.email
    };
    if (this.props.location.state) {
      updateEnseignant(enseignant).then(
        this.props.history.push("/enseignants",{ enseignant: enseignant })
      );
    } else {
      postEnseignant(enseignant).then(
        this.props.history.push("/enseignants", { enseignant: enseignant })
      );
    }
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
                name="idEnseignant"
                value={this.state.idEnseignant}
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
              Confirmer
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
