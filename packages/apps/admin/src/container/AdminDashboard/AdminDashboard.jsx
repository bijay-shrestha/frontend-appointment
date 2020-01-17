import React from 'react';
import {Image} from "react-bootstrap";

const AdminDashboard = () => {
    return (
        <div className="dashboard-wrapper">


           <div className="unauthorized">
            <div className="filter-message">
                <div className="message-cont">
                    <h1>COMING SOON</h1>
                    <h5 className="">Dashboard will be carefully curated as features are added into the app. </h5>
                    <h6>Good things come to those who wait.</h6>
                    <i class="fa fa-stethoscope" aria-hidden="true"></i>
                    {/* <Image src={require('../../images/clock.gif')} className="loader" /> */}

                 </div>
            </div>
        </div>
        </div>
    );
};

export default AdminDashboard;
