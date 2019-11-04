import React, { Component } from "react";
import { Table, Alert } from "react-bootstrap";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { getEnseignants, deleteEnseignant } from "../../fetch-API/users.js";

export default class Enseignant extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], isLoading: true, update: false, errorDelete : false };
  }

  showCours(r) {
    this.setState({ isLoading: true });
    console.log("Loading is true");
    this.props.history.push("/affectation-enseignant", { enseignant: r });
  }

  updateEnseignant(r) {
    this.setState({ isLoading: true });
    console.log("Loading is true");
    this.props.history.push("/ajouter-enseignant", { enseignant: r });
  }

  deleteEnseignant(r) {
    if (!r.cours[0]){
     deleteEnseignant(r).then(
      this.setState({
        data: this.state.data.filter(e => e.idEnseignant !== r.idEnseignant)
      })
    );
    this.setState({errorDelete : false})
    console.log(r.cours)
  }
  else {
    this.setState({errorDelete : true})
  }
  }

  newEnseignant() {
    this.setState({ isLoading: true });
    console.log("Loading is true");
    this.props.history.push("/ajouter-enseignant");
  }

  componentDidMount() {
    this.setState({ isLoading: true, data: [] });
    getEnseignants().then(response =>
      this.setState({ data: response, isLoading: false })
    );
  }

  render() {
    if (this.state.isLoading) {
      console.log("Loading du Render");
      getEnseignants().then(response =>
        this.setState({ data: response, isLoading: false })
      );
      return <div>Loading</div>;
    } else {
      console.log("Fin du Loading");

      const enseignantArray = this.state.data.map(r => {
        return (
          <tr key={r.idEnseignant}>
            <td>{r.nom}</td>
            <td>{r.prenom}</td>
            <td>{r.mail}</td>
            <td>
              <Button
                onClick={() => this.showCours(r)}
                variant="outline-primary"
              >
                Affecter
              </Button>{" "}
              <Button
                onClick={() => this.updateEnseignant(r)}
                variant="outline-success"
              >
                Modifier
              </Button>{" "}
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
          <Button onClick={() => this.newEnseignant()}>
            Ajouter Enseignant
          </Button>
{this.errorDelete()}
          <Table responsive>
            <thead>
              <tr>
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
  
  errorDelete(){
    if (this.state.errorDelete) {
      return <Alert variant="danger">Veuillez desinscrire cet enseignant de tout ses cours.</Alert>;
    }
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
