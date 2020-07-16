import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard'
import PropTypes from 'prop-types';
import {Alert} from 'react-bootstrap'

class CCopyToClipboard extends React.PureComponent {
    state = {
        showAlert: false,
    }
    alertTimer = null;

    handleOnCopy = (text) => {
        this.setState({
            showAlert: true
        });
        this.clearAlertOnTimeOut();
        this.props.onCopy && this.props.onCopy(text);
    }

    closeAlert = () => {
        this.setState({
            showAlert: false
        })
    }

    clearAlertOnTimeOut = () => {
        this.alertTimer = setTimeout(() => this.closeAlert(), 7000)
    }

    componentWillUnmount() {
        clearTimeout(this.alertTimer)
    }

    componentDidMount() {

    }

    render() {
        const {
            id,
            textToCopy,
            children,
            options,
            copiedMessage
            // toastDelayTime
        } = this.props

        const {
            showAlert
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
                variant={'success'}
                onClose={this.closeAlert}
                show={showAlert}
                className="clip-alert"
                dismissible>
                {/*<Alert.Heading>{alertType}</Alert.Heading>*/}
                <p>
                    {copiedMessage}
                    {/*{`Copied ${textToCopy} to clipboard!`}*/}
                </p>
            </Alert>

            {/*<p className="copy-message">*/}
            {/*    <i className="fa fa-check"></i>{`Copied Appointmet No:${textToCopy} to clipboard!`}*/}
            {/*</p>*/}


            {/* <Toast onClose={() => this.closeAlert()}
                   show={showAlert}
                   delay={toastDelayTime ? toastDelayTime : 5000}
                   autohide>
                <Toast.Header>
                    <strong className="mr-auto">Copied!</strong>
                </Toast.Header>
                <Toast.Body>  {`Copied ${textToCopy} to clipboard!`}</Toast.Body>
            </Toast> */}
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
