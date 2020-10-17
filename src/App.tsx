import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import View from "./components/View";
import ChooseTaskGroup from "./containers/ChooseTaskGroup";
import Hierarchy from "./containers/Hierarchy";
import EditTaskGroup from "./containers/EditTaskGroup";
import Footer from "./containers/Footer";
import { Header } from "./containers/Header";
import NavBar from "./containers/NavBar";
import httpFetch from "./utils/httpFetch";
import Release from "./containers/Release";

function App() {
  httpFetch("/kekApi/kek", { method: "GET" });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header></Header>
      {/* <div style={{ flexGrow: 2 }}> */}
      <div style={{ display: "flex", flexGrow: 2 }}>
        <NavBar />
        <Switch>
          {/* <Route path="/flow">
            <Hierarchy />
            <Flow></Flow>
          </Route>
          <Route path="/edit-page/:id">
            <Edit />
          </Route> */}
          <Route path="/release/:moduleId">
            <View>
              <Release />
            </View>
          </Route>
          <Route path="/edit-task-group" exact>
            {/* <EditTaskGroup /> */}
            <View>
              <ChooseTaskGroup />
            </View>
          </Route>
          <Route path="/edit-task-group/:moduleId/:topicId/:taskGroupId" exact>
            <View>
              <EditTaskGroup />
            </View>
          </Route>
          <Redirect to="/edit-task-group" />
        </Switch>
      </div>
      {/* </div> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
