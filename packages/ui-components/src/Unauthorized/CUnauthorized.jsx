import React from 'react';
import "./unauthorize.scss";

const CUnauthorized = props => {
    return (
        <div className="unauthorized">
            <div className="filter-message">
                <div className="message-cont">
                    <h1>ACCESS DENIED</h1>
                    <h5 className="">You don't have permission to view this page. </h5>
                    <h6>Please contact your system administrator.</h6>
                    <i class="fa fa-lock" aria-hidden="true"></i>
                 </div>
            </div>
        </div>
    )
};

export default CUnauthorized;
