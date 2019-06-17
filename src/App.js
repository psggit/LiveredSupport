import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Switch } from "react-router-dom"
import { Route } from "react-router-dom"
import { createBrowserHistory } from "history"
import { Router } from "react-router"
import Complaints from "./complaints"
import ComplaintsFailure from "./complaint-failure"
import ComplaintsSuccess from "./complaint-success"

const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route
          exact
          path="/"
          component={Complaints}
        />
        <Route
          exact
          path="/complaint-failure"
          component={ComplaintsFailure}
        />
        <Route
          exact
          path="/complaint-success"
          component={ComplaintsSuccess}
        />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))