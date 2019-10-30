import React, { Component } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { getEnseignants, deleteEnseignant } from "../../fetch-API/users.js";

export default class Enseignant extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], isLoading: true };
  }

  showCours(r) {
    this.props.history.push("/affectation-enseignant", { enseignant: r });
  }

  updateEnseignant(r) {
    this.props.history.push("/ajouter-enseignant", { enseignant: r });
  }

  deleteEnseignant(r) {
    deleteEnseignant(r).then(console.log("Suppression réussite"));
    this.setState({
      data: this.state.data.filter(e => e.idEnseignant !== r.idEnseignant)
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true, data: [] });
    getEnseignants()
      .then(response => this.setState({ data: response }))
      .then(this.setState({ isLoading: false }));
  }

  render() {
    const isLoading = this.state.isLoading;
    if (isLoading) {
      console.log("Loading");
    }
    const enseignantArray = this.state.data.map((r, idEnseignant) => {
      return (
        <tr key={idEnseignant}>
          <td>{r.idEnseignant}</td>
          <td>{r.nom}</td>
          <td>{r.prenom}</td>
          <td>{r.mail}</td>
          <td>
            <Button onClick={() => this.showCours(r)} variant="outline-primary">
              Affecter
            </Button>{" "}
            <Button
              onClick={() => this.updateEnseignant(r)}
              variant="outline-success"
            >
              Modifier
            </Button>
            <Button
              onClick={() => this.deleteEnseignant(r)}
              variant="outline-danger"
            >
              Supprimer
            </Button>
          </td>
        </tr>
      );
    });
    return (
      <Wrapper>
        <Button
          onClick={() => this.setState({ isLoading: true, data: [] })}
          href="/ajouter-enseignant"
        >
          Ajouter Enseignant
        </Button>

        <Table responsive>
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{enseignantArray}</tbody>
        </Table>
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
