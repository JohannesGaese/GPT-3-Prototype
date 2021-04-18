import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "react-mde/lib/styles/css/react-mde-all.css";


import BackendRoute from "./components/routing/BackendRoute";

import VisNavbar from "./components/layout/VisNavbar";

import { withRouter } from "react-router-dom";
import Analyze from "./components/pages/Analyze";
import Implement from "./components/pages/Implement";
import PythonScript from "./components/pages/PythonScript";


function App({ location }) {
  return (
    <Fragment>
        <div className="App">
          <BrowserRouter>  
            <VisNavbar/>
            <Switch>
              <Route exact path={["/", "/analyze"]} component={Analyze} />
              <Route exact path={"/implement"} component={Implement} />              
              <Route exact path={"/script"} component={PythonScript} />
            </Switch>
            </BrowserRouter>
        </div>
    </Fragment>




  );
}

export default App;
