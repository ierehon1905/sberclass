import React from "react";
import Hierarchy from "./containers/Hierarchy";
import Flow from "./containers/Flow";
import { Header } from "./containers/Header";
import Footer from "./containers/Footer";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header></Header>
      <div style={{ display: "flex", flexGrow: 2 }}>
        <Hierarchy />
        <Flow></Flow>
      </div>
      <Footer />
    </div>
  );
}

export default App;
