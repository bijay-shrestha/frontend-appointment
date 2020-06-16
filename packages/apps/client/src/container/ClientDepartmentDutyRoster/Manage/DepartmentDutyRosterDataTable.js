import {CDataTable, CLoading, CPagination} from '@frontend-appointment/ui-elements';
import React from 'react';
import {ActionFilterUtils} from '@frontend-appointment/helpers';
import PreviewHandlerHoc from "../../CommonComponents/table-components/hoc/PreviewHandlerHoc";
import TableAction from "../../CommonComponents/table-components/TableAction";
import {StatusLabel} from "@frontend-appointment/ui-components/src/CTableComponents";
import {RoomEnableBadge} from "@frontend-appointment/ui-components";

const {checkIfRoleExists} = ActionFilterUtils;

const DepartmentDutyRosterDataTable = ({dataTableProps,}) => {
    const {
        isSearchRosterLoading,
        searchErrorMessage,
        departmentDutyRosterList,
        filteredAction,
        totalItems,
        maxSize,
        currentPage,
        handlePageChange,
        onPreviewHandler,
        onDeleteHandler,
        onEditHandler,
        onCloneAndAddNew
    } = dataTableProps;
    return (
        <>
            <div className="manage-details">
                <h5 className="title">Department Roster Details</h5>
                {!isSearchRosterLoading && !searchErrorMessage && departmentDutyRosterList.length ?
                    (<>
                            <CDataTable
                                classes="ag-theme-balham"
                                id="roles-table"
                                width="100%"
                                height="460px"
                                enableSorting
                                editType
                                columnDefs={[
                                    {
                                        headerName: 'SN',
                                        field: 'sN',
                                        headerClass: 'resizable-header header-first-class',
                                        resizable: true,
                                        sortable: true,
                                        editable: true,
                                        sizeColumnsToFit: true,
                                        cellClass: 'first-class',
                                        width: 100
                                    },
                                    {
                                        headerName: 'Department Name',
                                        field: 'hospitalDeptName',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true,
                                        width: 200

                                    },
                                    {
                                        headerName: 'From Date',
                                        field: 'fromDate',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true,
                                        width: 120
                                    },
                                    {
                                        headerName: 'To Date',
                                        field: 'toDate',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true,
                                        width: 120
                                    },
                                    {
                                        headerName: 'Time Period(min)',
                                        field: 'rosterGapDuration',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true
                                    },
                                    {
                                        headerName: 'Room Number',
                                        field: 'roomNumber',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true,
                                        width: 140
                                    },
                                    {
                                        headerName: 'Room Enabled',
                                        field: 'isRoomEnabled',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true,
                                        cellRenderer: 'roomEnabledRenderer',
                                        width: 120
                                    },
                                    {
                                        headerName: 'Status',
                                        field: 'status',
                                        resizable: true,
                                        sortable: true,
                                        sizeColumnsToFit: true,
                                        cellRenderer: 'childLabelRenderer',
                                        width: 90
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
                                                    ? onEditHandler(data)
                                                    : type === 'C' ? onCloneAndAddNew(data)
                                                        : onPreviewHandler(data)
                                            },
                                            filteredAction: filteredAction
                                        },
                                        cellStyle: {overflow: 'visible', 'z-index': '99'}
                                    }
                                ]}
                                frameworkComponents={{
                                    childActionRenderer: TableAction,
                                    roomEnabledRenderer: PreviewHandlerHoc(RoomEnableBadge, checkIfRoleExists, filteredAction, 4, onPreviewHandler),
                                    childLabelRenderer: PreviewHandlerHoc(StatusLabel, checkIfRoleExists, filteredAction, 4, onPreviewHandler),
                                }}
                                defaultColDef={{resizable: true}}
                                getSelectedRows={checkIfRoleExists(filteredAction, 4) ? onPreviewHandler : () => {
                                }}
                                rowSelection={'single'}
                                rowData={departmentDutyRosterList}
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

export default DepartmentDutyRosterDataTable;
