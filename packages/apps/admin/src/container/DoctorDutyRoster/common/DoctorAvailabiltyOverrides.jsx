import React from 'react';
import {Col, Row} from "react-bootstrap";
import {CButton, CCheckbox, CDataTable} from "@frontend-appointment/ui-elements";
import AddOverrideModal from "./AddOverride";
import {
    DayOffStatusLabel,
    EndTimeDisplayForTable,
    FromDateDisplayForTable,
    OverrideActions,
    StartTimeDisplayForTable,
    ToDateDisplayForTable
} from "@frontend-appointment/ui-components";

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
                                         isModifyOverride,
                                         overrideUpdateErrorMessage,
                                         doctorInfoData,
                                         overrideFormValid
                                     }) => {
    return <>
        <Col>
            <div className="doctor-override bg-white mt-2">
                <Row>
                    <Col>
                        <CCheckbox
                            id="check--override"
                            label="Override "
                            className="select-all check-all"
                            checked={hasOverrideDutyRoster === 'Y'}
                            onChange={handleOverrideDutyRoster}
                        >
                        </CCheckbox>
                        <span className="optional"> (optional)</span>
                    </Col>
                    {hasOverrideDutyRoster === 'Y' &&
                    <Col>
                        <CButton
                            id="add-override"
                            variant='outline-secondary'
                            size='lg'
                            name=''
                            className="pull-right"
                            disabled={hasOverrideDutyRoster === 'N'}
                            onClickHandler={setShowAddOverrideModal}
                        >
                            <><i className='fa fa-plus'/> Add</>
                        </CButton>
                        <AddOverrideModal
                            isModifyOverride={isModifyOverride}
                            overrideData={overrideData}
                            showAddOverrideModal={showAddOverrideModal}
                            setShowAddOverrideModal={setShowAddOverrideModal}
                            handleOverrideFormInputChange={handleOverrideFormInputChange}
                            onEnterKeyPress={onEnterKeyPress}
                            addOverride={addOverride}
                            overrideUpdateErrorMessage={overrideUpdateErrorMessage}
                            doctorInfoData={doctorInfoData}
                            overrideFormValid={overrideFormValid}
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
                                height="240px"
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
                                        field: 'fromDate',
                                        // headerClass: "fi",
                                        cellRenderer: 'fromDateRenderer',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true
                                    },
                                    {
                                        headerName: 'To Date',
                                        field: 'toDate',
                                        // headerClass: "fi",
                                        cellRenderer: 'toDateRenderer',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true
                                    },
                                    {
                                        headerName: 'Start Time',
                                        field: 'startTime',
                                        cellRenderer: 'startTimeRenderer',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true
                                    },
                                    {
                                        headerName: 'End Time',
                                        field: 'endTime',
                                        cellRenderer: 'endTimeRenderer',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true,
                                    },
                                    {
                                        headerName: 'Off',
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
                                    childLabelRenderer: DayOffStatusLabel,
                                    fromDateRenderer: FromDateDisplayForTable,
                                    toDateRenderer: ToDateDisplayForTable,
                                    startTimeRenderer: StartTimeDisplayForTable,
                                    endTimeRenderer: EndTimeDisplayForTable

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
