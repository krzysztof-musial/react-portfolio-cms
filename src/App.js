import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
// Components
import Home from './views/Home'
import Login from './views/Login'

export default function App() {
  return (
    <Router>
      <main className="w-full min-h-screen">
        <div className="w-full bg-gray-900 text-white text-xs px-2 py-1 flex justify-between">
          <div className="flex space-x-2">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </div>
          <p>Not logged in.</p>
        </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
          </Switch>
      </main>
    </Router>
  )
}