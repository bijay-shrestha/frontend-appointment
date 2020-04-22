import React from 'react';

const CNoDashboardRoleContent = ()=>{
  return <div className="unauthorized">
        <div className="filter-message">
            <div className="message-cont">
                <h1>NO ACCESS</h1>
                <h5 className="">You don't have permission <b>YET</b> to view dashboard. </h5>
                <h6>Please contact your system administrator.</h6>
                <i className="fa fa-lock" aria-hidden="true"></i>
            </div>
        </div>
    </div>
};

export default CNoDashboardRoleContent;
