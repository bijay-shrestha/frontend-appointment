import React from 'react';
import RoomSetupHOC from "./RoomSetupHOC";
import RoomSetupSearchFilter from "./RoomSetupSearchFilter";
import RoomSetupDataTable from "./RoomSetupDataTable";

const RoomSetup = (props) => {
    const RoomSetup = RoomSetupHOC(
        ({
             filteredAction,
             searchData,
             tableData,
         }) =>
            <>
                <RoomSetupSearchFilter searchData={searchData}/>
                <RoomSetupDataTable filteredAction={filteredAction} tableData={tableData}/>
            </>, props, '');
    return <RoomSetup/>
};

export default RoomSetup;
