import React, { Component } from "react";
import { Table, Alert } from "react-bootstrap";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { getEtudiants, deleteEtudiant } from "../../fetch-API/etudiants";

export default class Etudiants extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], isLoading: true, error: false };
  }

  componentDidMount() {
    this.setState({ isLoading: true, data: [] });
    getEtudiants().then(response => {
      if (response) {
        this.setState({ isLoading: false, data: response });
      } else {
        this.setState({ error: true });
      }
    });
  }

  showErrors(){
      if (this.state.error){
          return(
            <Alert variant="danger">La connexion a échouée.</Alert>
          )
      }
  }

  deleteEtudiant(r){
   deleteEtudiant(r).then(console.log("Suppression réussite"));
    this.setState({
      data: this.state.data.filter(e => e.matricule !== r.matricule)
    });
  }

  
  updateEtudiant(r){
    this.props.history.push("/ajouter-etudiant", { etudiant: r });
   }

  render() {
    const isLoading = this.state.isLoading;
    if (isLoading) {
      console.log("Loading..");
    }

    const etudiants = this.state.data.map((r, i) => {
      return (
        <tr key={r.matricule}>
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
              Affecter
            </Button>
            <Button
              onClick={() => this.updateEtudiant(r)}
              variant="outline-success"
            >
              Modifier
            </Button>
            <Button
              onClick={() => this.deleteEtudiant(r)}
              variant="outline-danger"
            >
              Supprimer
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <React.Fragment>
        <Wrapper>
            {this.showErrors()}
          <Button href="/ajouter-etudiant">Ajouter Étudiant</Button>
          <Table responsive>
            <thead>
              <tr>
                <th>Matricule</th>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Année</th>
                <th>Filière</th>
                <th>Mail</th>
                <th>{" "}</th>
              </tr>
            </thead>
            <tbody> {etudiants} </tbody>
          </Table>
        </Wrapper>
      </React.Fragment>
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
