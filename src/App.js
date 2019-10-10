import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Contact } from "./components/Contact";
import { About } from "./components/About";
import { NavigationBar } from "./components/NavigationBar";
import { Jumbotron } from "./components/Jumbotron";
import AddCours from "./components/metier/AddCours";
import Cours from "./components/metier/Cours";
import AddUser from "./components/metier/AddUser";
import Enseignant from "./components/metier/Enseignant";

function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <Jumbotron />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/ajouter-cours" component={AddCours} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/cours" component={Cours} />
          <Route exact path="/about" component={About} />
          <Route exact path="/ajouter-enseignant" component={AddUser} />
          <Route exact path="/enseignants" component={Enseignant} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
