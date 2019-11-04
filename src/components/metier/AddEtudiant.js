import React, { Component } from "react";
import { Form,Alert } from "react-bootstrap";
import styled from "styled-components";
import { postEtudiant } from "../../fetch-API/etudiants";

export default class AddEtudiant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matricule: "",
      nom: "",
      prenom: "",
      mail: "",
      annee: 0,
      filiere: "",
      error: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state) {
      const e = this.props.location.state.etudiant;
      this.setState({
        matricule: e.matricule,
        mail: e.mail,
        nom: e.nom,
        prenom: e.prenom,
        annee: e.annee,
        filiere: e.filiere
      });
    } else {
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    console.log(value);
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const etudiant = {
      matricule: this.state.matricule,
      nom: this.state.nom,
      prenom: this.state.prenom,
      mail: this.state.mail,
      annee: this.state.annee,
      filiere: this.state.filiere
    };

    if (this.state.annee === 0 && this.state.filiere === "") {
      this.setState({ error: true });
    } else {
      postEtudiant(etudiant);

      this.props.history.push("/etudiants", { etudiant: etudiant });
    }
  }

  title() {
    if (this.props.location.state) {
      return (
        <Title>
          Modifier l'enseignant :{" "}
          <b>
            {this.state.nom} {"    "} {this.state.prenom}
          </b>
        </Title>
      );
    } else {
      return <Title>Ajouter d'un nouvel étudiant</Title>;
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.title()}
        <Wrapper>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formLastName">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                required
                name="nom"
                value={this.state.nom}
                onChange={this.handleInputChange}
                type="text"
                placeholder=""
              />
            </Form.Group>

            <Form.Group controlId="formFirstName">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                required
                name="prenom"
                value={this.state.prenom}
                onChange={this.handleInputChange}
                type="text"
                placeholder=""
              />
            </Form.Group>

            <Form.Group controlId="formMatricule">
              <Form.Label>Matricule</Form.Label>
              <Form.Control
                required
                name="matricule"
                value={this.state.matricule}
                onChange={this.handleInputChange}
                type="number"
                placeholder=""
              />
            </Form.Group>

            <Form.Group controlId="formMatricule">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="mail"
                required
                value={this.state.mail}
                onChange={this.handleInputChange}
                type="email"
                placeholder=""
              />
            </Form.Group>

            <Form.Group controlId="formGridState">
              <Form.Label>Année</Form.Label>
              <Form.Control
                name="annee"
                required
                value={this.state.annee}
                onChange={this.handleInputChange}
                as="select"
              >
                <option> - Année -</option>
                <option value="1">Première Année</option>
                <option value="2">Deuxième Année</option>
                <option value="3">Troisième Année</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formGridState">
              <Form.Label>Génie</Form.Label>
              <Form.Control
                name="filiere"
                required
                value={this.state.filiere}
                onChange={this.handleInputChange}
                as="select"
              >
                <option>- Génie -</option>
                <option value="Informatique">Informatique</option>
                <option value="Civil">Civil</option>
                <option value="Minéral">Minéral</option>
                <option value="MIS">MIS</option>
                <option value="Industriel">Industriel</option>
              </Form.Control>
            </Form.Group>
            {this.allInput()}
            <Button onSubmit={this.handleSubmit} primary type="submit">
              Confirmer
            </Button>
          </Form>
        </Wrapper>
      </React.Fragment>
    );
  }

  allInput() {
    if (this.state.error) {
      return <Alert variant="danger">Veuillez spécifier l'année et la filière</Alert>;
    }
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

const Button = styled.button`
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
