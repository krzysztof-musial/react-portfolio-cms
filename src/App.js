import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// Components
import Home from './views/Home'
import Login from './views/Login'

export default function App() {
  return (
    <main className="w-full min-h-screen">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </main>
  )
}