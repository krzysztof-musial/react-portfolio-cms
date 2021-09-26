import React, { useContext } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// 
import { AuthProvider } from "./contexts/AuthContext"
import { ThemeContext } from "./contexts/ThemeContext"
// Components
import { GuestRoute, PrivateRoute } from "./components/Routes"
import Home from './views/Home'
import Login from "./views/Login"
import Admin from "./views/Admin"
import Project from "./views/Project"

export default function App() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? 'dark' : ''}>
    <AuthProvider>
      <Router>
        <main className="w-full min-h-screen flex flex-col bg-white text-black dark:bg-gray-900 dark:text-white">
          {/* Content */}
          <Switch>
            <Route exact path="/" component={Home} />
            <GuestRoute path="/login" component={Login} />
            <Route path="/id/:id" component={Project}/>
            <PrivateRoute path="/admin" component={Admin} />
          </Switch>
        </main>
      </Router>
    </AuthProvider>
    </div>
  )
}