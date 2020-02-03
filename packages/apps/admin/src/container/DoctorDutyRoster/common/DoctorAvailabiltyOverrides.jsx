import React from 'react';
import {Col, Row} from "react-bootstrap";
import {CButton, CCheckbox, CDataTable} from "@frontend-appointment/ui-elements";
import TableAction from "../../CommonComponents/table-components/TableAction";
import StatusLabel from "../../CommonComponents/table-components/StatusLabel";
import AddOverrideModal from "./AddOverride";

const DoctorAvailabilityOverrides = ({
                                         hasOverrideDutyRoster,
                                         overrideData,
                                         doctorDutyRosterOverrideRequestDTOS,
                                         onDeleteHandler,
                                         onEditHandler,
                                         handleOverrideDutyRoster,
                                         showAddOverrideModal,
                                         setShowAddOverrideModal
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
                    <Col>
                        <CButton
                            id="add-override"
                            variant='outline-secondary'
                            size='lg'
                            name='Add More'
                            className="pull-right"
                            onClickHandler={setShowAddOverrideModal}
                        >
                        </CButton>
                        <AddOverrideModal
                            overrideData={overrideData}
                            showAddOverrideModal={showAddOverrideModal}
                            setShowAddOverrideModal={setShowAddOverrideModal}
                        />
                    </Col>
                </Row>
                <Row>
                    {hasOverrideDutyRoster === 'Y' ?
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
                                        field: 'fromDate',
                                        // headerClass: "fi",
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true
                                    },
                                    {
                                        headerName: 'To Date',
                                        field: 'toDate',
                                        // headerClass: "fi",
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true
                                    },
                                    {
                                        headerName: 'Start Time',
                                        field: 'startTime',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true
                                    },
                                    {
                                        headerName: 'End Time',
                                        field: 'endTime',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true,
                                    },
                                    {
                                        headerName: 'Days Off',
                                        field: 'dayOffStatus',
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
                                            onClick: function (e, id, type) {
                                                type === 'D'
                                                    ? onDeleteHandler(id)
                                                    : onEditHandler(id)
                                            }
                                        },
                                        cellStyle: {overflow: 'visible', 'z-index': '99'}
                                    }
                                ]}
                                frameworkComponents={{
                                    // childActionRenderer: TableAction,
                                    // childLabelRenderer: StatusLabel
                                }}
                                defaultColDef={{resizable: true}}
                                // getSelectedRows={checkIfRoleExists(props.filteredActions, 4) ? props.onPreviewHandler : () => {}}
                                rowSelection={'single'}
                                // setShowModal={props.setShowModal} // {this.showModal}
                                rowData={doctorDutyRosterOverrideRequestDTOS}
                            />
                        </>
                        : ''}
                </Row>
            </div>
        </Col>
    </>
};

export default DoctorAvailabilityOverrides;
