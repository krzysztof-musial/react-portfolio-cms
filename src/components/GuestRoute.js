import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"

export default function GuestRoute({ component: Component, ...rest }) {
  const { currentUser } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props => {
        return !currentUser ? <Component {...props} /> : <Redirect to="/admin" />
      }}
    ></Route>
  )
}