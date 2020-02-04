import React from 'react';
import {Col, Row} from "react-bootstrap";
import {CButton, CCheckbox, CDataTable} from "@frontend-appointment/ui-elements";
import AddOverrideModal from "./AddOverride";
import DayOffStatusLabel from "../../CommonComponents/table-components/DayOffStatusLabel";
import OverrideActions from "./table-components/OverrideActions";

const DoctorAvailabilityOverrides = ({
                                         hasOverrideDutyRoster,
                                         overrideData,
                                         doctorDutyRosterOverrideRequestDTOS,
                                         onRemove,
                                         onModify,
                                         handleOverrideDutyRoster,
                                         showAddOverrideModal,
                                         setShowAddOverrideModal,
                                         handleOverrideFormInputChange,
                                         onEnterKeyPress,
                                         addOverride,
                                         isModifyOverride
                                     }) => {
    return <>
        <Col>
            <div className="doctor-override bg-white mt-2">
                <Row>
                    <Col>
                        <CCheckbox
                            id="check--override"
                            label="Override"
                            className="select-all check-all"
                            checked={hasOverrideDutyRoster === 'Y'}
                            onChange={handleOverrideDutyRoster}
                        />
                    </Col>
                    {hasOverrideDutyRoster === 'Y' &&
                    <Col>
                        <CButton
                            id="add-override"
                            variant='outline-secondary'
                            size='lg'
                            name='Add More'
                            className="pull-right"
                            disabled={hasOverrideDutyRoster === 'N'}
                            onClickHandler={setShowAddOverrideModal}
                        >
                        </CButton>
                        <AddOverrideModal
                            isModifyOverride={isModifyOverride}
                            overrideData={overrideData}
                            showAddOverrideModal={showAddOverrideModal}
                            setShowAddOverrideModal={setShowAddOverrideModal}
                            handleOverrideFormInputChange={handleOverrideFormInputChange}
                            onEnterKeyPress={onEnterKeyPress}
                            addOverride={addOverride}
                        />
                    </Col>
                    }
                </Row>
                <Row>
                    {hasOverrideDutyRoster === 'Y' && doctorDutyRosterOverrideRequestDTOS.length ?
                        <>
                            <CDataTable
                                classes="ag-theme-balham"
                                id="roles-table"
                                width="100%"
                                height="460px"
                                enableSorting
                                editType
                                columnDefs={[
                                    // {
                                    //     headerName: 'SN',
                                    //     field: 'sN',
                                    //     headerClass: 'resizable-header header-first-class',
                                    //     resizable: true,
                                    //     sortable: true,
                                    //     editable: true,
                                    //     sizeColumnsToFit: true,
                                    //     cellClass: 'first-class'
                                    //     //   cellClass: function(params) { return ['my-class-1','my-class-2']; }
                                    // },
                                    {
                                        headerName: 'From Date',
                                        field: 'fromDateDisplay',
                                        // headerClass: "fi",
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true
                                    },
                                    {
                                        headerName: 'To Date',
                                        field: 'toDateDisplay',
                                        // headerClass: "fi",
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true
                                    },
                                    {
                                        headerName: 'Start Time',
                                        field: 'startTimeDisplay',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true
                                    },
                                    {
                                        headerName: 'End Time',
                                        field: 'endTimeDisplay',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true,
                                    },
                                    {
                                        headerName: 'Days Off',
                                        field: 'dayOffStatus',
                                        cellRenderer: 'childLabelRenderer',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true,
                                    },
                                    {
                                        headerName: 'Remarks',
                                        field: 'remarks',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true,
                                    },
                                    {
                                        headerName: '',
                                        action: 'action',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true,
                                        cellRenderer: 'childActionRenderer',
                                        cellClass: 'actions-button-cell',
                                        cellRendererParams: {
                                            onClick: function (e, data, index, type) {
                                                type === 'R'
                                                    ? onRemove(data, index)
                                                    : onModify(data, index)
                                            }
                                        },
                                        cellStyle: {overflow: 'visible', 'z-index': '99'}
                                    }
                                ]}
                                frameworkComponents={{
                                    childActionRenderer: OverrideActions,
                                    childLabelRenderer: DayOffStatusLabel
                                }}
                                defaultColDef={{resizable: true}}
                                // getSelectedRows={checkIfRoleExists(props.filteredActions, 4) ? props.onPreviewHandler : () => {}}
                                rowSelection={'single'}
                                // setShowModal={props.setShowModal} // {this.showModal}
                                rowData={doctorDutyRosterOverrideRequestDTOS}
                            />
                        </>
                        : (hasOverrideDutyRoster === 'Y' && !doctorDutyRosterOverrideRequestDTOS.length ?
                            <div className="filter-message">
                                <div className="no-data">
                                    <i className="fa fa-file-text-o"/>
                                </div>
                                <div className="message"> No overrides added!</div>
                            </div> : '')}
                </Row>
            </div>
        </Col>
    </>
};

export default DoctorAvailabilityOverrides;
