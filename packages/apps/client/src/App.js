import React from 'react';
//import './App.css';
import ClientContainer from "./container/ClientContainer";
import '@frontend-appointment/common-sass-client';
import 'font-awesome/css/font-awesome.min.css';
import 'material-icons/iconfont/material-icons.scss';
// import 'react-selectize/themes/index.css'

const App = props => {
    return (
        <ClientContainer {...props}/>
    )
};

export default App;
