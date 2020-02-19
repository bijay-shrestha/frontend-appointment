import React from 'react';
//import './App.css';
import AdminContainer from "./container/AdminContainer";
import '@frontend-appointment/common-sass';
import 'font-awesome/css/font-awesome.min.css';
import 'material-icons/iconfont/material-icons.scss';

const App = props => {
    return (
        <AdminContainer {...props}/>
    )
};

export default App;
