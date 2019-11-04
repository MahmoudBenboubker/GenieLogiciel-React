import React, { Component } from "react";
import { Table, Alert } from "react-bootstrap";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { getCours, deleteCours } from "../../fetch-API/cours";

export default class Cours extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], isLoading: true, errorDelete : false };
  }

  updateCours(r) {
    this.setState({ isLoading : true})
    console.log("isLoading = true")
    this.props.history.push("/ajouter-cours", { cours: r });
  }

  coursAjouté() {
    if (this.props.location.state) {
      if (this.props.location.state.cours) {
        const coursAdded = this.props.location.state.cours;
        console.log(coursAdded);
        return (
          <StyledAlert variant="success">
            <StyledAlert.Heading>
              Le cours a bien été enregistré !
            </StyledAlert.Heading>
            <p> Intitulé :{coursAdded.intitule} </p>
            <p> Description : {coursAdded.description}</p>
          </StyledAlert>
        );
      }
    }
  }

  affectationCours(r){
    this.setState({ isLoading : true})
    console.log("isLoading = true")
    this.props.history.push("/affectation-cours", { cours: r });
  }

  newCours(){
    this.setState({ isLoading : true})
    console.log("isLoading = true")
    this.props.history.push("/ajouter-cours");
  }


  deleteCours(r) {
    if (!r.etudiants[0] && !r.ens)
  {  deleteCours(r).then(console.log("Suppression réussite"));
    this.setState({
      data: this.state.data.filter(e => e.idCours !== r.idCours)
    });
    this.setState({errorDelete : false})}
    else {
      this.setState({errorDelete : true})
    }
  }

   componentDidMount() {
    this.setState({ isLoading: true, data: [] });

     getCours()
      .then(response => this.setState({ data: response, isLoading : false }))

    if (this.props.history.location.state) {
      const r = this.props.history.location.state.enseignant.cours;
      console.log(r);
      this.setState({ data: r, isLoading: false });
    }

  }

  render() {
  
    if (this.state.isLoading) {
      getCours()
      .then(response => this.setState({ data: response, isLoading : false }))
      console.log("Loading..");
      return( <div />)
    }
    else {
    const coursArray = this.state.data.map((r, i) => {
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
              Affecter
            </Button>
            <Button
              onClick={() => this.updateCours(r)}
              variant="outline-success"
            >
              Modifier
            </Button>
            <Button
              onClick={() => this.deleteCours(r)}
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
          <Button onClick={() => this.newCours()}>Ajouter Cours</Button>
          {this.errorDelete()}
          <Table responsive>
            <thead>
              <tr>
                <th>Identifiant</th>
                <th>Intitulé</th>
                <th>Description</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>{coursArray}</tbody>
          </Table>
        </Wrapper>
      </React.Fragment>
    );
    }
  }
  errorDelete(){
    if (this.state.errorDelete) {
      return <Alert variant="danger">Veuillez desinscrire l'enseignant et les élèves de cecours.</Alert>;
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

const StyledAlert = styled(Alert)`
  margin: 0em 4em;
  flex: 5 5;
  flex-direction: row;
`;
