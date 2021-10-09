import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"

// function GuestRoute({ component: Component, ...rest }) {
//   const { currentUser } = useContext(AuthContext)

//   return (
//     <Route
//       {...rest}
//       render={props => {
//         return !currentUser ? <Component {...props} /> : <Redirect to="/admin" />
//       }}
//     ></Route>
//   )
// }

function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useContext(AuthContext)
  
    return (
      <Route
        {...rest}
        render={props => {
          return currentUser ? <Component {...props} /> : <Redirect to="/" />
        }}
      ></Route>
    )
}

export { PrivateRoute }