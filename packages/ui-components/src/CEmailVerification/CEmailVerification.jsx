import React from 'react';
import {CFullPageLoading, CPageNotFound} from '@frontend-appointment/ui-elements';
import {ConnectHoc} from '@frontend-appointment/commons';
import {verifyToken} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants';
import CEmailVerificationView from "./CEmailVerificationView";
import {EnvironmentVariableGetter} from "@frontend-appointment/helpers";

const {VERIFY_ADMIN_EMAIL} = AdminModuleAPIConstants.adminSetupAPIConstants;
const {VERIFY_COMPANY_ADMIN_EMAIL} = AdminModuleAPIConstants.companyAdminSetupApiConstants;

class CEmailVerification extends React.PureComponent {

    state = {
        isLoading: true,
        isVerified: false,
        token: ''
    };

    verifyIfTokenValid = async () => {
        let token = this.props.location.search.split('=')[1];
        let EMAIL_VERIFY_API = EnvironmentVariableGetter.REACT_APP_MODULE_CODE === EnvironmentVariableGetter.ADMIN_MODULE_CODE ?
            VERIFY_COMPANY_ADMIN_EMAIL : VERIFY_ADMIN_EMAIL;
        try {
            await this.props.verifyToken(EMAIL_VERIFY_API, token);
            this.setState({
                isLoading: false,
                isVerified: true,
                token: token
            })
        } catch (e) {
            this.setState({
                isLoading: false,
                isVerified: false,
                token: ''
            });
        }
    };

    componentDidMount() {
        this.verifyIfTokenValid();
    }

    render() {
        const {isLoading, isVerified} = this.state;
        return <>
            {!isLoading && isVerified ?
                <CEmailVerificationView {...this.props}/>
                : (!isLoading && !isVerified ?
                    <CPageNotFound/>
                    : <CFullPageLoading/>)
            }
        </>
    }
}

export default ConnectHoc(
    CEmailVerification,
    [],
    {
        verifyToken
    }
);
