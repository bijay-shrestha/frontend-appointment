import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";

const DoctorDutyRosterShiftWiseHOC = (ComposedComponent, props, type) => {
    class DoctorDutyRosterShiftWiseHOC extends PureComponent {

        render() {
            return <>
                <ComposedComponent/>
            </>;
        }
    }

    return ConnectHoc(DoctorDutyRosterShiftWiseHOC, [], {});

};

export default DoctorDutyRosterShiftWiseHOC;
