import React from 'react';

export const DoctorRevenueAppointmentAmount = props => {
  const {cancelledRevenue, doctorRevenue, totalRevenue} = props.node.data
  return (
    <div>
      <p id="revenueAmountId" className="showTotal">Total Revenue Amount:totalRevenue}</p>
      <ul id="breakDownAmountId" className="hideTotal">
        <li>Successfull Revenue:{cancelledRevenue}</li>
        <li>Cancelled Revenue:{doctorRevenue}</li>
      </ul>
    </div>
  )
}
