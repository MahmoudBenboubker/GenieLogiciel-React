import React, { Component } from "react";
import { Form, Table, Button } from "react-bootstrap";
import styled from "styled-components";
import { getEnseignants } from "../../../fetch-API/users";
import { getEtudiants } from "../../../fetch-API/etudiants";
import {
  affectationEnseignantCours,
  affectationeEtudiantCours
} from "../../../fetch-API/affectation";

export default class AffectationCours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idEnseignant: "",
      nom: "",
      prenom: "",
      email: "",
      intitule: "",
      idCours: "",
      dataEnseignant: [],
      allEtudiants: [],
      etudiants: []
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
    const state = this.state;
    console.log(state.etudiants);
    affectationEnseignantCours(
      parseInt(state.idEnseignant, 10),
      state.idCours
    ).then(console.log("Done"));

    this.state.etudiants.forEach(e => {
      affectationeEtudiantCours(e.matricule,state.idCours).then(console.log("Done etudiant-cours"))
    });

    this.props.history.push("/");
  }

  componentDidMount() {
    if (this.props.location.state) {
      const e = this.props.location.state.cours;
      this.setState({
        intitule: e.intitule,
        idCours: e.idCours,
        etudiants: e.etudiants,
        idEnseignant: e.ens.idEnseignant
      });
    } else {
    }

    getEnseignants().then(response =>
      this.setState({ dataEnseignant: response })
    );

    getEtudiants().then(response => {
      this.setState({ allEtudiants: response });
    });
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

    const etudiants = this.state.etudiants.map((r, i) => {
      return (
        <tr key={i}>
          <td>{r.matricule}</td>
          <td>{r.nom}</td>
          <td>{r.prenom}</td>
          <td>{r.annee}</td>
          <td>{r.filiere}</td>
          <td>{r.mail}</td>
          <td>
            <Button
              onClick={() => this.updateEtudiant(r)}
              variant="outline-primary"
            >
              Information
            </Button>
            <Button
              onClick={() => this.deleteEtudiant(r)}
              variant="outline-danger"
            >
              Retirer
            </Button>
          </td>
        </tr>
      );
    });

    const allEtudiants = [];

    this.state.allEtudiants.forEach(e => {
      if (this.state.etudiants.find(r => r.matricule === e.matricule)) {
      } else {
        allEtudiants.push(e);
      }
    });

    const allEtudiantsDisplay = allEtudiants.map((r, i) => {
      return (
        <tr key={i}>
          <td>{r.matricule}</td>
          <td>{r.nom}</td>
          <td>{r.prenom}</td>
          <td>{r.annee}</td>
          <td>{r.filiere}</td>
          <td>{r.mail}</td>
          <td>
            <Button
              onClick={() => this.affecterEtudiant(r)}
              variant="outline-success"
            >
              Affecter
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <React.Fragment>
        {this.title()}
        <Wrapper>
          <Form>
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

            <Form.Group controlId="formLastName">
              <Form.Label>Etudiants déjà inscrits</Form.Label>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Matricule</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Année</th>
                    <th>Filière</th>
                    <th>Mail</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>{etudiants} </tbody>
              </Table>
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Liste des étudiants non inscrits</Form.Label>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Matricule</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Année</th>
                    <th>Filière</th>
                    <th>Mail</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody> {allEtudiantsDisplay}</tbody>
              </Table>
            </Form.Group>
            <ButtonBR onClick={this.handleSubmit} primary>
              Confirmer
            </ButtonBR>
          </Form>
        </Wrapper>
      </React.Fragment>
    );
  }

  affecterEtudiant(r) {
    console.log(r);
    const array = this.state.etudiants;
    array.push(r);
    this.setState({ etudiants: array });
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

const ButtonBR = styled.button`
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
