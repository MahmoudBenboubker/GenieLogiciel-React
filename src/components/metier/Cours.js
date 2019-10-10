import React, { Component } from "react";
import { Table, Alert } from "react-bootstrap";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { getCours, deleteCours } from "../../fetch-API/cours";

export default class Cours extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], isLoading: true};
  }

  updateCours(r){
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

  deleteCours(r){
    deleteCours(r).then(console.log("Suppression réussite"));
    this.setState({
      data: this.state.data.filter(e => e.idCour !== r.idCour)
    });
  }
  componentDidMount() {
  this.setState({isLoading:true})

      getCours()
        .then(response => this.setState({ data: response }))
        .catch()
      ;

        if(this.props.history.location.state){
          const r = this.props.history.location.state.enseignant.cours
          console.log(r)        
               this.setState({data : r} )
        }

        this.setState({isLoading:false})
    
  }

  render() {

    const isLoading = this.state.isLoading
    if (isLoading){
      console.log("Loading..")
    }

    const coursArray = this.state.data.map((r, i) => {
      return (
        <tr key={i}>
          <td>{r.idCour}</td>
          <td>{r.intitule}</td>
          <td>{r.description}</td>
          <td>
            <Button onClick={()=> this.updateCours(r)} variant="outline-success">Modifier</Button>
            <Button onClick={()=> this.deleteCours(r)} variant="outline-danger">Supprimer</Button>
          </td>
        </tr>
      );
    });

    return (
      <React.Fragment>
        <Wrapper>
        <Button href="/ajouter-cours">Ajouter Cours</Button>
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
