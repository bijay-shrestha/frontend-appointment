import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard'
import PropTypes from 'prop-types';

class CCopyToClipboard extends React.PureComponent {
    state = {
        showAlert: false,
    }

    handleOnCopy = (text) => {
        this.setState({
            showAlert: true
        });
        this.props.onCopy && this.props.onCopy(text);
    }

    closeAlert = () => {
        this.setState({
            showAlert: false
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        const {
            id,
            textToCopy,
            children,
            options,
            // toastDelayTime
        } = this.props

        // const {
        //     showAlert
        // } = this.state;
        return <>
            <CopyToClipboard
                id={id}
                onCopy={this.handleOnCopy}
                options={options}
                text={textToCopy}>
                {children}
            </CopyToClipboard>

            <p>
                {`Copied ${textToCopy} to clipboard!`}
            </p>
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
