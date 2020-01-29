import {CButton, CDataTable, CLoading, CPagination} from '@frontend-appointment/ui-elements';
import React, {PureComponent} from 'react';
// import React, {memo} from 'react';
//import {ConfirmDelete} from '@frontend-appointment/ui-components';
// import {ActionFilterUtils} from "@frontend-appointment/helpers";
// import TableAction from "./tableComponents/TableAction";
import {CModal}  from "@frontend-appointment/ui-elements";
import EditDoctorDutyRoster from "./EditDoctorDutyRoster";

class DoctorDutyRosterDataTable extends PureComponent {
    state={show:false}
    handleShow=()=>{
        this.setState(prevState =>({
            show:!prevState.show
        }))
    }

    render() {
    const modalBody=(<EditDoctorDutyRoster/>)
   
        const {
        onInputChange,
        searchParameters,
        resetSearchForm,
        hospitalList
    } = this.props;
    return (
        <>
         <div className="manage-details">
        <h5 className="title">Doctor Roster Details</h5>
        
        <CButton href="" variant="link" size="lg"  onClickHandler={this.handleShow} name="">Edit Roster</CButton>
        </div>


    <CModal 
        show={this.state.show}
                modalHeading="Edit Doctor Roster"
                size="lg"
                bodyChildren={modalBody}
                onHide={this.handleShow}
                centered={false}
                dialogClassName="preview-modal"
                // footerChildren={<CButton
                //     id="departmentConfirm"
                //     variant="primary"
                     size="lg"
                //     className="float-right btn-action"
                //     onClickHandler={onConfirmClick}/>}
                closeButton={true}></CModal>
        </>
    )
}
}

export default DoctorDutyRosterDataTable;