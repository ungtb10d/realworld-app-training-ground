import React from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "./Auth";

export function PrivateRoute({ component: Component, ...rest }) {
  const { user } = React.useContext(AuthContext);

  return (
    <Route
      render={({ location }) =>
        user ? (
          <Component {...rest} />
        ) : (
          <Redirect to={{ pathname: "/", from: location }} />
        )
      }
    />
  );
}
