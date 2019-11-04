import React, { Component } from "react";
import { Form, Table, Button } from "react-bootstrap";
import styled from "styled-components";
import { getCours } from "../../../fetch-API/cours";
import {
  affectationeEtudiantCours,
  deleteAffectationeEtudiantCours
} from "../../../fetch-API/affectation";

export default class AffectationEtudiant extends Component {
  constructor(props) {
    super(props);
    this.state = { cours: [], etudiant: "", allCours: [] };
  }

  componentDidMount() {
    if (this.props.location.state) {
      const e = this.props.location.state.etudiant;
      this.setState({
        etudiant: e,
        cours: e.cours
      });
    }

    getCours()
      .then(response => this.setState({ allCours: response }))
      .catch();
  }

  tableCoursAffected() {
    const cours = this.state.cours.map((r, i) => {
      return (
        <tr key={i}>
          <td>{r.idCours}</td>
          <td>{r.intitule}</td>
          <td>{r.description}</td>
          <td>
            <Button
              onClick={() => this.affectationCours(r)}
              variant="outline-primary"
            >
              Information
            </Button>
            {"  "}
            <Button
              onClick={() => this.deleteCours(r)}
              variant="outline-danger"
            >
              Retirer
            </Button>
          </td>
        </tr>
      );
    });

    if (this.state.cours.length !== 0) {
      return (
        <Table responsive>
          <thead>
            <tr>
              <th>Identifiant</th>
              <th>Intitulé</th>
              <th>Description</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>{cours}</tbody>
        </Table>
      );
    } else {
      return (
        <div>
          <font color="red"> Inscrits à aucun cours.</font>
        </div>
      );
    }
  }

  tableAutreCours() {
   
      const allCours = [];

      this.state.allCours.forEach(c => {
        if (this.state.cours.find(r => r.idCours === c.idCours)) {
        } else {
          allCours.push(c);
        }
      });

      const allCoursDisplay = allCours.map((r, i) => {
        return (
          <tr key={i}>
            <td>{r.idCours}</td>
            <td>{r.intitule}</td>
            <td>{r.description} </td>
            <td>
              <Button
                onClick={() => this.affectationCours(r)}
                variant="outline-primary"
              >
                {" "}
                Associer
              </Button>
            </td>
          </tr>
        );
      });

      return (
        <Table responsive>
          <thead>
            <tr>
              <th>Identifiant</th>
              <th>Intitulé</th>
              <th>Description</th>
              <th> </th>
            </tr>
          </thead>
          <tbody> {allCoursDisplay}</tbody>
        </Table>
      );
    

  
      
    }

  render() {
    return (
      <React.Fragment>
        <Title> Affectation de l'élève</Title>
        <Wrapper>
          <Form>
            <Form.Group controlId="formLastName">
              <Form.Label>Inscrit aux cours</Form.Label>
              {this.tableCoursAffected()}
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Affecter Nouveaux Cours</Form.Label>
              {this.tableAutreCours()}
            </Form.Group>
          </Form>

          <Button
            onClick={() => this.confirmAffectation()}
            variant="outline-success"
          >
            Confirmer les changements
          </Button>
        </Wrapper>
      </React.Fragment>
    );
  }
  affectationCours(r) {
    let array = this.state.cours;
    array.push(r);
    this.setState({ cours: array });

    this.setState({
      allCours: this.state.allCours.filter(e => e.idCours !== r.idCours)
    });
  }

  confirmAffectation() {
    const state = this.state;
    this.state.cours.forEach(e => {
      console.log(e);
      affectationeEtudiantCours(state.etudiant.matricule, e.idCours);
      console.log("Affectation réussie");
    });
    this.props.history.push("/etudiants");
  }

  deleteCours(r) {
    let array = this.state.cours.filter(e => e.idCours !== r.idCours);
    this.setState({
      cours: array
    });
    array = this.state.allCours;
    array.push(r);
    this.setState({ allCours: array });

    deleteAffectationeEtudiantCours(
      this.state.etudiant.matricule,
      r.idCours
    ).then(console.log("Supprimer"));
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

const Title = styled.h1`
  color: #428bca;
  font-size: 2em;
  text-align: center;
`;
