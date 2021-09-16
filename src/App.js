import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// 
import { AuthProvider } from "./contexts/AuthContext"
// Components
import Navigation from './components/Navigation'
import Home from './views/Home'
import Login from './views/Login'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <main className="w-full min-h-screen flex flex-col space-y-8">
          {/* Nav */}
          <Navigation />
          {/* Content */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
          </Switch>
        </main>
      </Router>
    </AuthProvider>
  )
}