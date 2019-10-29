import React, {Component} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { About } from "./components/About";
import  NavigationBar  from "./components/NavigationBar";
import { Jumbotron } from "./components/Jumbotron";
import AddCours from "./components/metier/AddCours";
import AddEtudiant from "./components/metier/AddEtudiant";
import Cours from "./components/metier/Cours";
import AddUser from "./components/metier/AddUser";
import Enseignant from "./components/metier/Enseignant";
import Connexion from "./components/Connexion";
import Etudiants from "./components/metier/Etudiants";
import AffectationCours from "./components/metier/Affectation/AffectationCours";
import AffectationEnseignant from "./components/metier/Affectation/AffectationEnseignant";


export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {isLogged : false}
  }

 
  render(){
  return (
    <React.Fragment>
      <NavigationBar isLogged={this.state.isLogged}  />
      <Jumbotron />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cours" component={Cours} />
          <Route exact path="/about" component={About} />
          <Route exact path="/ajouter-cours" component={AddCours} />
          <Route exact path="/ajouter-enseignant" component={AddUser} />
          <Route exact path="/ajouter-etudiant" component={AddEtudiant} />
          <Route exact path="/enseignants" component={Enseignant} />
          <Route exact path="/etudiants" component={Etudiants} />
          <Route exact path="/affectation-cours" component={AffectationCours} />
          <Route exact path="/affectation-enseignant" component={AffectationEnseignant} />
          <Route exact path="/connexion" component={Connexion} />
        </Switch>
      </Router>
    </React.Fragment>
  )}
}

