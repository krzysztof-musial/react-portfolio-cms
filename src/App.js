import React, { useContext } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// Contexts
import { ThemeContext } from "./contexts/ThemeContext"
// Components
import { PrivateRoute } from "./components/Routes"
// Pages
import HomePage from './views/HomePage'
import ProjectPage from "./views/ProjectPage";
import AdminPage from "./todelete/AdminPage";
import { ProjectsPage } from "./views/ProjectsPage"
import { EditorPage } from "./views/EditorPage"

export default function App() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <main className="w-full min-h-screen text-black bg-white dark:text-white dark:bg-trueGray-900">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/id/:id" component={ProjectPage}/>
            <PrivateRoute path="/editor/:id" component={EditorPage}/>
            <PrivateRoute path="/projects" component={ProjectsPage} />
            <PrivateRoute path="/admin" component={AdminPage} />
          </Switch>
        </main>
      </Router>
    </div>
  )
}