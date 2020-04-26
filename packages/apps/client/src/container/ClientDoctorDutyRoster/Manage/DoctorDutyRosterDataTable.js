import {CDataTable, CLoading, CPagination} from '@frontend-appointment/ui-elements';
import React from 'react';
import {ActionFilterUtils} from '@frontend-appointment/helpers';
import TableAction from "../../CommonComponents/table-components/TableAction";
import StatusLabel from "../../CommonComponents/table-components/StatusLabel";
import {CDoctorNameDisplayForTable} from "@frontend-appointment/ui-components";
import PreviewHandlerHoc from "../../CommonComponents/hoc/PreviewHandlerHoc";

const {checkIfRoleExists} = ActionFilterUtils;

const DoctorDutyRosterDataTable = ({
                                       isSearchRosterLoading,
                                       searchErrorMessage,
                                       doctorDutyRosterList,
                                       filteredAction,
                                       totalItems,
                                       maxSize,
                                       currentPage,
                                       handlePageChange,
                                       onPreviewHandler,
                                       onDeleteHandler,
                                       onEditHandler,
                                       onCloneAndAddNew
                                   }) => {
    return (
        <>
            <div className="manage-details">
                <h5 className="title">Doctor Roster Details</h5>
                {!isSearchRosterLoading && !searchErrorMessage && doctorDutyRosterList.length ?
                    (<>
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
                                    // },
                                    {
                                        headerName: 'Doctor Name',
                                        field: 'doctorName',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true,
                                        cellRenderer:"doctorNameRenderer"
                                    },
                                    {
                                        headerName: 'Specialization Name',
                                        field: 'specializationName',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true
                                    },
                                    {
                                        headerName: 'From Date',
                                        field: 'fromDate',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true
                                    },
                                    {
                                        headerName: 'To Date',
                                        field: 'toDate',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true
                                    },
                                    {
                                        headerName: 'Time Duration (minutes)',
                                        field: 'rosterGapDuration',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true
                                    },
                                    {
                                        headerName: 'Status',
                                        field: 'status',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true,
                                        cellRenderer: 'childLabelRenderer'
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
                                            onClick: function (e, id, type, data) {
                                                type === 'D'
                                                    ? onDeleteHandler(data)
                                                    : type === 'E'
                                                    ? onEditHandler(id)
                                                    : type === 'C' ? onCloneAndAddNew(id)
                                                        : onPreviewHandler(id)
                                            },
                                            filteredAction: filteredAction
                                        },
                                        cellStyle: {overflow: 'visible', 'z-index': '99'}
                                    }
                                ]}
                                frameworkComponents={{
                                    childActionRenderer: TableAction,
                                    childLabelRenderer: StatusLabel,
                                    doctorNameRenderer: PreviewHandlerHoc(CDoctorNameDisplayForTable, checkIfRoleExists, filteredAction, 4, onPreviewHandler)
                                }}
                                defaultColDef={{resizable: true}}
                                getSelectedRows={checkIfRoleExists(filteredAction, 4) ? onPreviewHandler : () => {
                                }}
                                rowSelection={'single'}
                                rowData={doctorDutyRosterList}
                            />
                            <CPagination
                                totalItems={totalItems}
                                maxSize={maxSize}
                                currentPage={currentPage}
                                onPageChanged={handlePageChange}
                            />
                        </>
                    ) : !isSearchRosterLoading && searchErrorMessage ? (
                        <div className="filter-message">
                            <div className="no-data">
                                <i className="fa fa-file-text-o"/>
                            </div>
                            <div className="message"> {searchErrorMessage}</div>
                        </div>
                    ) : (
                        <CLoading/>
                    )}
            </div>
        </>
    )
};

export default DoctorDutyRosterDataTable;
