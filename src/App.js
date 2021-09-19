import React, { useContext } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// 
import { AuthProvider } from "./contexts/AuthContext"
import { ThemeContext } from "./contexts/ThemeContext"
// Components
import GuestRoute from './components/GuestRoute'
import PrivateRoute from './components/PrivateRoute'
import Navigation from './components/Navigation'
import Home from './views/Home'
import Login from "./views/Login"
import Admin from "./views/Admin"
import CaseStudy from "./views/CaseStudy"

export default function App() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? 'dark' : ''}>
    <AuthProvider>
      <Router>
        <main className="w-full min-h-screen flex flex-col bg-white text-black dark:bg-gray-900 dark:text-white">
          {/* Nav */}
          <Navigation />
          {/* Content */}
          <Switch>
            <Route exact path="/" component={Home} />
            <GuestRoute path="/login" component={Login} />
            <PrivateRoute path="/admin" component={Admin} />
            <Route path="/id/:id" component={CaseStudy}/>
          </Switch>
        </main>
      </Router>
    </AuthProvider>
    </div>
  )
}