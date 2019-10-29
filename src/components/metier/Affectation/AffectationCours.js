import React, { Component } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { getEnseignants } from "../../../fetch-API/users";
import {affectationEnseignantCours} from "../../../fetch-API/affectation"

export default class AffectationCours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idEnseignant: "",
      nom: "",
      prenom: "",
      email: "",
      intitule: "",
      idCours : "",
      dataEnseignant: []
    };

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
    const state  = this.state
    console.log(state)
    affectationEnseignantCours(state.idEnseignant,state.idCours).then(console.log("Done"))
  }

  componentDidMount() {
    if (this.props.location.state) {
      const e = this.props.location.state.cours;
      this.setState({
        intitule: e.intitule,
        idCours : e.idCours
      });
    } else {
    }

    getEnseignants().then(response =>
      this.setState({ dataEnseignant: response })
    );
  }

  title() {
    if (this.props.location.state) {
      return (
        <Title>
          Affectation du cours : {this.state.intitule}
          <b>
            {this.state.nom} {"    "} {this.state.prenom}
          </b>
        </Title>
      );
    } else {
      return <Title>Ajouter d'un nouvel enseignant</Title>;
    }
  }
  render() {
    const enseignants = this.state.dataEnseignant.map((r, i) => {
      return (
        <option value={r.idEnseignant}>
          {r.idEnseignant} - {r.nom} {r.prenom}
        </option>
      );
    });
    return (
      <React.Fragment>
        {this.title()}
        <Wrapper>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formLastName">
              <Form.Label>Enseignant</Form.Label>
              <Form.Control
                required
                name="idEnseignant"
                value={this.state.idEnseignant}
                onChange={this.handleInputChange}
                as="select"
              >
                  <option value=""> - Enseignant -</option>
                {enseignants}
              </Form.Control>
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
