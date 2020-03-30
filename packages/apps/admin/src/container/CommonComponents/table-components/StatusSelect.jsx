import React, {PureComponent} from 'react';
import {CSelect} from "@frontend-appointment/ui-elements";

class StatusSelect extends PureComponent {
    render() {
        return (
            <>
                {
                    this.props.node.data.isNew && this.props.startEditing?
                    <CSelect
                        value={this.props.node.data.status}
                        // defaultValue={this.props.defaultValue}
                        onChange={(e) => {
                            if (e) {
                                const {value, label} = e.target;
                                this.props.node.data.status = {value: value, label: label}
                            }
                        }}
                        options={this.props.options}/>
                        : this.props.node.data.status === 'Y' ? 'Active' : 'Inactive'
                }

            </>
        );
    };
}

export default StatusSelect;
