import React from 'react'
import {CButton} from '@frontend-appointment/ui-elements'
import {ActionFilterUtils} from '@frontend-appointment/helpers'

const {checkIfRoleExists} = ActionFilterUtils
const AppointmentQuickCheckInOption = props => {
    const {filteredAction, onClick, isConfirming} = props
    return checkIfRoleExists(filteredAction, 14) ? (
        <CButton
            id="check-in"
            variant="primary"
            size="sm"
            className="btn-action ml-2 quick-checkin"
            name=""
            disabled={isConfirming}
            onClickHandler={e =>
                onClick(e, props.node.data.id || props.node.data, 'C')
            }
        >
            <><i className="fa fa-sign-in"/> &nbsp;</>
        </CButton>
    ) : null
}
export default AppointmentQuickCheckInOption;
