import React, { Component } from "react";
import { Table, Alert } from "react-bootstrap";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { getCours } from "../../fetch-API/cours";

export default class Cours extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
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

  componentDidMount() {
    if (this.props.location.state === undefined ) {
      getCours()
        .then(response => this.setState({ data: response }))
        .catch()
        .then(console.log(this.props));
    }
    else if (this.props.location.state.enseignant) {
      this.setState({data : this.props.location.state.enseignant.cours})
    }
  }

  render() {
    const coursArray = this.state.data.map((r, i) => {
      return (
        <tr key={i}>
          <td>{r.idCour}</td>
          <td>{r.intitule}</td>
          <td>{r.description}</td>{" "}
        </tr>
      );
    });

    return (
      <React.Fragment>
        {this.coursAjouté()}
        <Button href="/ajouter-cours">Ajouter Cours</Button>
        <br />
        <Wrapper>
          <Table responsive>
            <thead>
              <tr>
                <th>Identifiant</th>
                <th>Intitulé</th>
                <th>Description</th>
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
