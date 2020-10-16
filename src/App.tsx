import React from "react";
import Hierarchy from "./containers/Hierarchy";
import Flow from "./containers/Flow";
import { Header } from "./containers/Header";
import Footer from "./containers/Footer";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./containers/NavBar";
import Edit from "./containers/Edit";
import httpFetch from "./utils/httpFetch";

function App() {
  httpFetch('/kekApi/kek', { method: 'GET' });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header></Header>
      {/* <div style={{ flexGrow: 2 }}> */}
      <div style={{ display: "flex", flexGrow: 2 }}>
        <NavBar />
        <Switch>
          <Route path="/flow">
            <Hierarchy />
            <Flow></Flow>
          </Route>
          <Route path="/edit-page/:id">
            <Edit />
          </Route>
          <Redirect to="/flow" />
        </Switch>
      </div>
      {/* </div> */}
      <Footer />
    </div>
  );
}

export default App;
