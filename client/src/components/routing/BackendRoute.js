import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";


const BackendRoute = ({ component: Component, ...rest }) => {
    
  
    return (
      <Route
        {...rest}
        render={props =>
         
            <Redirect
              to={{
                pathname: "/",
                state: { redirect: window.location.pathname }
              }}
            />
        }
      />
    );
  };
  
  export default BackendRoute;