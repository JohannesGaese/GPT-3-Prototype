import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "react-mde/lib/styles/css/react-mde-all.css";

import { FilterProvider } from "./context/FilterContext";

import BackendRoute from "./components/routing/BackendRoute";

import VisNavbar from "./components/layout/VisNavbar";

import Home from "./components/pages/Home";
import Reporting from "./components/pages/Reporting"
import DonationInputPanel from "./components/pages/DonationInputPanel"
import HomeToShow from "./components/pages/HomeToShow";
import LandingPage from "./components/pages/LandingPage";

import { withRouter } from "react-router-dom";


function App({ location }) {
  return (
    <Fragment>
      <FilterProvider>
        <div className="App">
          <BrowserRouter>  
            <Route exact path="/" component={LandingPage} />
            <VisNavbar/>
          
            <Switch>             
              <Route exact path="/home" component={HomeToShow} />
              <Route exact path="/database" component={Home} />
              <Route exact path="/reporting" component={Reporting} />
              <Route exact path="/impactcalculator" component={DonationInputPanel} />
            </Switch>
            </BrowserRouter>
        </div>
      </FilterProvider>
    </Fragment>




  );
}

export default App;
