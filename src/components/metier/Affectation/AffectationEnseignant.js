import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import styled from "styled-components";
import { getCours } from "../../../fetch-API/cours";
import { affectationEnseignantCours } from "../../../fetch-API/affectation";

export default class AffectationEnseignant extends Component {
  constructor(props) {
    super(props);
    this.state = { idEnseignant: "", cours: [], allCours: [] };
  }

  componentDidMount() {
    if (this.props.history.location.state) {
      const state = this.props.history.location.state;
      this.setState({
        idEnseignant: state.enseignant.idEnseignant,
        cours: state.enseignant.cours
      });
    }

    getCours()
      .then(response => this.setState({ allCours: response }))
      .catch();
  }
  render() {
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
              Retirer
            </Button>
          </td>
        </tr>
      );
    });

    const allCours = this.state.allCours.map((r, i) => {
      return (
        <tr key={i}>
          <td>
            {r.intitule} - <i>{r.description}</i>
          </td>
          <td>
            <Button
              onClick={() => this.affectationCours(r)}
              variant="outline-primary"
            >
              Associer
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
              <th>Identifiant</th>
              <th>Intitulé</th>
              <th>Description</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>{cours}</tbody>
        </Table>

        <Title>Affecter nouveaux cours</Title>

        <Table responsivee>
          <thead>
            <tr>
              <th>Cours</th>
            </tr>
            <tbody>{allCours}</tbody>
          </thead>
        </Table>

        <Button
          onClick={() => this.confirmAffectation()}
          variant="outline-success"
        >
          Confirmer les changements
        </Button>
      </Wrapper>
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
    this.state.cours.map((e, i) => {
      console.log(e);
      affectationEnseignantCours(state.idEnseignant, e.idCours);
      console.log("Affectation réussie");
      return <div key={i} />;
    });
    this.props.history.push("/enseignants");
  }

  deleteCours(r) {
  /*  let array = this.state.allCours
    array.push(r)
    this.setState({
      allCours: array
    });
*/
     this.setState({
      data: this.state.data.filter(e => e.idCours !== r.idCours)
    });
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

const Title = styled.h1`
  color: #428bca;
  font-size: 2em;
  text-align: center;
`;
