import React, { Component } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { getEnseignants, deleteEnseignant } from "../../fetch-API/users.js";

export default class Enseignant extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  showCours(r) {
    this.props.history.push("/cours", { enseignant: r });
  }

  deleteEnseignant(r) {
    deleteEnseignant(r).then(console.log("Suppression réussite"));
    this.setState({
      data: this.state.data.filter(e => e.idEnseignant !== r.idEnseignant)
    });
  }

  componentDidMount() {
    getEnseignants()
      .then(response => this.setState({ data: response }))
      .catch();
  }

  render() {
    const enseignantArray = this.state.data.map((r, i) => {
      return (
        <tr key={i}>
          <td>{r.idEnseignant}</td>
          <td>{r.nom}</td>
          <td>{r.prenom}</td>
          <td>{r.mail}</td>
          <td>
            <Button onClick={() => this.showCours(r)} variant="outline-dark">
              Cours{" "}
            </Button>
            <Button variant="outline-success">Modifier</Button>{" "}
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
