import React from 'react';
//import './App.css';
import AdminContainer from "./container/AdminContainer";

import '@frontend-appointment/common-sass';
// import 'react-selectize/themes/index.css'
// import 'react-selectize/dist/index.min.css'
import 'font-awesome/css/font-awesome.min.css';


const App = props => {
    return (
        <AdminContainer {...props}/>
    )
};

export default App;
