import React, { Component } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { postCours,getCours } from "../../fetch-API/cours";

export default class AddCours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intitule: "",
      description: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const cours = {
      intitule: this.state.intitule,
      description: this.state.description
    };
    postCours(cours).then(this.props.history.push("/cours",{cours : cours}));
    event.preventDefault();
  }

  render() {
    getCours();
    return (
      <React.Fragment>
        <Background>
          <Title>Création d'un cours</Title>
          <Wrapper>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formCourse">
                <Form.Label>Nom de la matière</Form.Label>
                <Form.Control
                  name="intitule"
                  value={this.state.intitule}
                  onChange={this.handleChange}
                  type="textarea"
                  required
                  placeholder=""
                />
                <Form.Text className="text-muted">
                  Entrer le nom de la matière.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formTeacher">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  onChange={this.handleChange}
                  required
                  as="textarea"
                  rows="3"
                />
              </Form.Group>

              <Button primary type="submit">
                Ajouter
              </Button>
            </Form>
          </Wrapper>
        </Background>
      </React.Fragment>
    );
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

const Background = styled.div``;
