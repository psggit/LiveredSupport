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
          path="/complaint-success"
          component={ComplaintsSuccess}
        />
        <Route
          path="/complaint-failure"
          component={ComplaintsFailure}
        />
        <Route
          path="/complaints"
          component={Complaints}
        />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))