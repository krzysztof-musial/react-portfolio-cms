import React, { useContext } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// Contexts
import { ThemeContext } from "./contexts/ThemeContext"
// Components
import { PrivateRoute } from "./components/Routes"
// Pages
import { Home } from "./pages/Home";
import { Project } from "./pages/Project";
import { Dashboard } from './pages/Dashboard'
import { Editor } from './pages/Editor'

export default function App() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <main className="w-full min-h-screen text-black bg-gray-50 dark:text-white dark:bg-gray-900">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/id/:id" component={Project}/>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/editor/:id" component={Editor}/>
          </Switch>
        </main>
      </Router>
    </div>
  )
}