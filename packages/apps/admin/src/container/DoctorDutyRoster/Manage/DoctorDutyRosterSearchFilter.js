import React, {PureComponent} from 'react';
import {CButton, CForm, CHybridInput, CHybridSelect} from "@frontend-appointment/ui-elements";
import {Button, Col, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {EnterKeyPressUtils} from "@frontend-appointment/helpers";

class DoctorDutyRosterSearchFilter extends PureComponent {

    render() {
        const {
            onInputChange,
            searchParameters,
            resetSearchForm,
            hospitalList
        } = this.props;
        return (
            <>
             <div id="advanced-search" className='advanced-search'>
                        <div className='search-header d-flex justify-content-between'>
                            <h5 className="title">Search Doctor Duty Roster</h5>
                            <div>
                                <CButton
                                    id="reset-form"
                                    variant='outline-secondary'
                                    size='sm'
                                    name='Reset'
                                    //onClickHandler={resetSearchForm}
                                    >
                                    {' '}
                                    <i className='fa fa-refresh'/>
                                </CButton>
                            </div>

                        </div>
                        <CForm id='department-info' className='add-info mt-4'>
                            <Container-fluid>
                                <Row>
                                    <Col sm={12} md={4} xl={4}>
                                        <CHybridInput
                                            id="department-name"
                                            name="departmentName"
   
                                        />
                                    </Col>
                         
                                </Row>
                            </Container-fluid>
                            <div className="search-toggle-btn">

                            </div>
                        </CForm>
                    </div> 
                   
            </>
            )
    }    
}


export default DoctorDutyRosterSearchFilter;