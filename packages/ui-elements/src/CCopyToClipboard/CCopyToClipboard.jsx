import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {Alert} from 'react-bootstrap'
import PropTypes from 'prop-types';

class CCopyToClipboard extends React.PureComponent {
    state = {
        copied: false,
        showAlert: false,
    }

    handleOnCopy = event => {
        this.setState({
            copied: true,
            showAlert: true
        });
        this.props.onCopy && this.props.onCopy(event);
    }

    closeAlert = () => {
        this.setState({
            showAlert: false
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setState({
            copied: false
        })
    }

    render() {
        const {
            id,
            onCopy,
            textToCopy,
            children,
            options
        } = this.props

        const {
            showAlert,
            copied
        } = this.state;
        return <>
            <CopyToClipboard
                id={id}
                onCopy={this.handleOnCopy}
                options={options}
                text={textToCopy}>
                {children}
            </CopyToClipboard>

            <Alert
                id={"alert".concat(id)}
                variant={'primary'}
                onClose={this.closeAlert}
                show={showAlert}
                dismissible>
                {/*<Alert.Heading>{alertType}</Alert.Heading>*/}
                <p>
                    {`Copied ${textToCopy} to clipboard!`}
                </p>
            </Alert>
        </>
    }


}

CCopyToClipboard.propTypes = {
    id: PropTypes.string.isRequired,
    onCopy: PropTypes.func,
    options: PropTypes.shape({debug: PropTypes.bool, message: PropTypes.string}),
    textToCopy: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}


export default CCopyToClipboard;
