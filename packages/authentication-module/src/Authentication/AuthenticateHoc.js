import React,{memo} from 'react'
import {Redirect} from 'react-router-dom'
const AuthenticateHOC = (ComposedComponent, condition) => {
  function Authenticate (props) {
    return (
      <>
        {condition() ? (
          <ComposedComponent {...props}  />
        ) : (
          <Redirect to="/" />
        )}
      </>
    )
  }
  return memo(Authenticate)
}
export default AuthenticateHOC
