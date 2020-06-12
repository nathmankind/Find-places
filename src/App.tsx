import React from "react";
import "./App.less";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import History from "./components/History";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/history" component={History} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
