import React, {PureComponent} from 'react';
import {CFControl} from "@frontend-appointment/ui-elements";

class InputFieldForTable extends PureComponent {

    state = {
        val: ''
    };

    setValue = (e) => {
        this.setState({
            val: e.target.value
        })
    };

    render() {
        return (
            <>
                {
                    this.props.node.data.isNew && this.props.startEditing ?
                        <div style={{width:"600px"}}>
                        <CFControl
                            id={this.props.fieldName}
                            value={this.state.val}
                            onChange={this.setValue}
                        />
                        </div>
                        : this.props.node.data.name
                }

            </>
        );
    };
}

export default InputFieldForTable;
