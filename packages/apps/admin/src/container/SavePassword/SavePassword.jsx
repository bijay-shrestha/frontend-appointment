import React from 'react';
import {NewPassword} from '@frontend-appointment/ui-components';
import {CFullPageLoading, CPageNotFound} from '@frontend-appointment/ui-elements';
import {ConnectHoc} from '@frontend-appointment/commons';
import {savePassword, verifyToken} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants';
import Cookies from "js-cookie";

const {SAVE_COMPANY_ADMIN_PASSWORD, VERIFY_COMPANY_ADMIN} = AdminModuleAPIConstants.companyAdminSetupApiConstants;

class SavePassword extends React.PureComponent {

    state = {
        isLoading: true,
        isVerified: false,
        token: ''
    };

    onSubmitHandler = async userPassword => {
        try {
            let passwordSaveData = {password: userPassword.password, token: this.state.token};
            await this.props.savePassword(SAVE_COMPANY_ADMIN_PASSWORD, passwordSaveData);
            localStorage.clear();
            await this.props.history.push('/password/save/success');
            return null;
        } catch (e) {
            console.log(e);
            const err = e.errorMessage
                ? e.errorMessage
                : 'Sorry Server Could not process data';
            return err
        }
    };

    verifyIfTokenValid = async () => {
        let token = this.props.location.search.split('=')[1];
        try {
            await this.props.verifyToken(VERIFY_COMPANY_ADMIN, token);
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
                <NewPassword {...this.props} onSubmitHandler={this.onSubmitHandler}/>
                : (!isLoading && !isVerified ?
                    <CPageNotFound/>
                    : <CFullPageLoading/>)
            }
        </>
    }
}

export default ConnectHoc(
    SavePassword,
    [],
    {
        verifyToken,
        savePassword
    }
);
