import React from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "./Auth";

export function AppHeader() {
  const { user } = React.useContext(AuthContext);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a href="/" className="navbar-brand">
          conduit
        </a>
        {user ? (
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/editor" className="nav-link">
                <i className="ion-compose"></i>&nbsp;New Post
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/settings" className="nav-link">
                <i className="ion-gear-a"></i>&nbsp;Settings
              </Link>
            </li>

            <li className="nav-item">
              <Link to={`/@${user.username}`} className="nav-link">
                {user.image && (
                  <img
                    src={user.image}
                    className="user-pic"
                    alt={user.username}
                  />
                )}
                {user.username}
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Sign in
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Sign up
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
