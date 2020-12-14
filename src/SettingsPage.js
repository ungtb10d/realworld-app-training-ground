import React from "react";
import { AuthContext } from "./Auth";

export function SettingsPage() {
  const { signOutUser } = React.useContext(AuthContext);

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            {/* TODO: add SettingsForm here.  */}
            <hr />

            <button className="btn btn-outline-danger" onClick={signOutUser}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
