import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap";
import { render } from "react-dom";

import AddVHS from "./Components/AddVHS.component";
import VHSList from "./Components/VHS-list.component";
import SingleVHS from "./Components/VHS.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/vhs" className="navbar-brand">
            VHSVHSVHS
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/vhs"} className="nav-link">
                VHS
              </Link>
            </li>
            <li className="nav-item">
              <Link to="{/add}" className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route exact path={["/", "/vhs"]} component={VHSList} />
            <Route exact path="/add" component={AddVHS} />
            <Route exact path="/vhs/:id" component={SingleVHS} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
