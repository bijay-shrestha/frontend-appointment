//import React from 'react';
import ReactDOM from 'react-dom'
//import './index.css';
import * as serviceWorker from './serviceWorker'
import {Apps} from './configs'
// import {EnvironmentVariableGetter} from '@frontend-appointment/helpers'
// import {logoutUser} from '@frontend-appointment/thunk-middleware'
// window.addEventListener('storage', e => {
//   if (
//     e.key === EnvironmentVariableGetter.AUTH_TOKEN &&
//     e.oldValue &&
//     !e.newValue
//   ) {
//     localStorage.clear()
//     store.dispatch(logoutUser())
//   }
// })
ReactDOM.render(Apps, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
