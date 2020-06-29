import React from 'react';

export const DepartmentRevenueAppointmentAmount = props => {
  const {cancelledRevenue, doctorRevenue, totalRevenue} = props.node.data
  return (
    
      <div id="revenueAmountId" className="dr-amount">Rs. {totalRevenue}
      <ul id="breakDownAmountId" className="dr-details">
        <li><i className="fa fa-money "></i> {doctorRevenue}</li>
        <li><i className="fa fa-money red"></i> {cancelledRevenue}</li>
      </ul>
      </div>

  )
}
