import {
    loginActionConstant,
    userMenusActionConstant,
    loggedInAdminInfoActionConstants,
    logoutActionConstants,
    forgotPasswordAndVerificationConstants
} from './actionconstants'
import * as LoginActions from './loginaction'
import * as MenuActions from './menuactions'
import * as LoggedInAdminInfoActions from './loggedInAdminInfoAction';
import * as LogoutActions from './logoutActions';
import {weekdaysActionConstants} from '../common/weekdays/weekdaysActionConstants';
import * as WeekdaysActions from '../common/weekdays/weekdaysActions';
import * as ForgotPasswordActions from '../common/forgotPasswordAndVerificationAction';
import * as CountryActions from '../common/country/countryActions';
import {countryActionConstants} from '../common/country/countryActionConstants';
import * as DoctorSalutationAction from '../common/doctorSalutation/doctorSalutationAction';
import {doctorSalutationActionConstants} from '../common/doctorSalutation/doctorSalutationActionConstants';

export {
    loginActionConstant,
    LoginActions,
    userMenusActionConstant,
    MenuActions,
    loggedInAdminInfoActionConstants,
    LoggedInAdminInfoActions,
    logoutActionConstants,
    LogoutActions,
    weekdaysActionConstants,
    WeekdaysActions,
    ForgotPasswordActions,
    forgotPasswordAndVerificationConstants,
    countryActionConstants,
    CountryActions,
    DoctorSalutationAction,
    doctorSalutationActionConstants
}
