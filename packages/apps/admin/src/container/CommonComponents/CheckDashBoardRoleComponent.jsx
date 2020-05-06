import {checkDashboardRole} from '@frontend-appointment/helpers'
const CheckDashBoardRole = props => {
    const {component,code}=props
    const ComposedComponent = component;
    const checkDashBoardWithCode =()=>{
     return checkDashboardRole(code);
    }
    return (
    checkDashBoardWithCode()?ComposedComponent:null
    )
}
export default CheckDashBoardRole;