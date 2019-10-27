import React, { Component } from "react";
import styled from "styled-components";
import { Form, Button, Alert } from "react-bootstrap";
import { getJwt } from "../fetch-API/jwt";

export default class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", error: false };
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

  handleSubmit(event) {
    event.preventDefault();
    const e = { username: this.state.username, password: this.state.password };
    getJwt(e).then(response => {
      if (response) {
        localStorage.setItem("token", response.token);
        this.props.history.push("/");
      } else {
        this.setState({ error: true });
      }
    });
  }

  invalidConnection() {
    if (this.state.error) {
      return <Alert variant="danger">La connexion a échouée. Verifiez votre identifiant et mot de passe</Alert>;
    }
  }
  render() {
    return (
      <Wrapper>
        <FormBS>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Identifiant</Form.Label>
              <Form.Control
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                type="text"
                required
                placeholder="Entrer l'identifiant"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                type="password"
                required
                placeholder="Mot de passe"
              />
            </Form.Group>
            {this.invalidConnection()}

            <Button variant="primary" type="submit">
              Se Connecter
            </Button>
          </Form>
        </FormBS>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  border: 5px solid #428bca;
  border-radius: 8px;
  margin: 0em 4em;
  flex: 5 5;
  flex-direction: row;
  background-color: gray 0.4;
`;

const FormBS = styled.div`
  margin: 0em 4em;
  flex: 5 5;
  flex-direction: row;
`;
