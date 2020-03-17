import React, {PureComponent} from 'react';

class StatusSelect extends PureComponent {
    render() {
        return (
            <>
                {
                    this.props.node.data.status === 'Y' ? 'Active' : 'Inactive'
                }

            </>
        );
    };
}

export default StatusSelect;
