import React, {PureComponent} from 'react';
import {Alert} from "react-bootstrap";

class CAlert extends PureComponent {

    render() {
        const {id, variant, onClose, alertType, message, show} = this.props;
        return <>
            <Alert
                id={id}
                variant={variant}
                onClose={onClose}
                show={show}
                dismissible>
                <Alert.Heading>{alertType}</Alert.Heading>
                <p>
                    {message}
                </p>
            </Alert>
        </>;
    }
}

export default CAlert;
