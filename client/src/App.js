import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "react-mde/lib/styles/css/react-mde-all.css";


import BackendRoute from "./components/routing/BackendRoute";

import VisNavbar from "./components/layout/VisNavbar";

import Home from "./components/pages/Home";

import { withRouter } from "react-router-dom";


function App({ location }) {
  return (
    <Fragment>
        <div className="App">
          <BrowserRouter>  
            <VisNavbar/>
            <Switch>
              <Route exact path="/" component={Home} />             
              
            </Switch>
            </BrowserRouter>
        </div>
    </Fragment>




  );
}

export default App;
