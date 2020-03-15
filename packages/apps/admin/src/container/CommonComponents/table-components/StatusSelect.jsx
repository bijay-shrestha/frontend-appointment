import React, {PureComponent} from 'react';
import {CSelect} from "@frontend-appointment/ui-elements";

class StatusSelect extends PureComponent {
    render() {
        return (
            <>
                <CSelect
                    value={this.props.node.data.status}
                    onChange={() => {
                    }}
                    options={[
                        {value: 'Y', label: 'Active'},
                        {value: 'N', label: 'Inactive'},
                    ]
                    }/>
            </>
        );
    };
}

export default StatusSelect;
