import React from 'react';
import {CButton, CDataTable} from "@frontend-appointment/ui-elements";
import TableAction from "../CommonComponents/table-components/TableAction";
import StatusSelect from "../CommonComponents/table-components/StatusSelect";
import ActionForEditableTable from "../CommonComponents/table-components/ActionForEditableTable";

const QualificationAliasDataTable = ({tableData}) => {
    const {
        qualificationAliasList,
        addNewRow,
        startEditing,
        editRowNumber,
        saveAlias,
        cancelAlias
    } = tableData;

    return <>
        <div className="manage-details">
            <h5 className="title">Qualification Alias Setup</h5>
            <CButton
                id="add-alias"
                name="Add New"
                onClickHandler={addNewRow}
            />
            {/*{!isSearchRosterLoading && !searchErrorMessage && doctorDutyRosterList.length ?*/}
            {/*(*/}
            <>
                <CDataTable
                    classes="ag-theme-balham"
                    id="roles-table"
                    width="100%"
                    height="460px"
                    startEditing={startEditing}
                    enableSorting
                    editType="fullRow"
                    columnDefs={[
                        {
                            headerName: 'Name',
                            field: 'name',
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true,
                            editable: true
                        },
                        {
                            headerName: 'Status',
                            field: 'status',
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true,
                            // cellRenderer: 'statusSelectRenderer',
                            editable: true,
                            cellEditor: "agSelectCellEditor",
                            cellEditorParams: {
                                values: ["Active", "In-active"]
                            }
                        },
                        {
                            headerName: '',
                            action: 'action',
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true,
                            cellRenderer: 'childActionRenderer',
                            cellClass: 'actions-button-cell',
                            editable: false,
                            cellRendererParams: {
                                onClick: function (e, data, type) {
                                    type === 'S'
                                        ? saveAlias(data)
                                        : cancelAlias(data)
                                },
                                // filteredAction: filteredAction
                            },
                            cellStyle: {overflow: 'visible', 'z-index': '99'}
                        }
                    ]}
                    frameworkComponents={{
                        childActionRenderer: ActionForEditableTable,
                        statusSelectRenderer: StatusSelect
                    }}
                    defaultColDef={{resizable: true}}
                    // getSelectedRows={checkIfRoleExists(filteredAction, 4) ? onPreviewHandler : () => {
                    // }}
                    rowSelection={'single'}
                    rowData={qualificationAliasList}
                />
                {/*<CPagination*/}
                {/*    totalItems={totalItems}*/}
                {/*    maxSize={maxSize}*/}
                {/*    currentPage={currentPage}*/}
                {/*    onPageChanged={handlePageChange}*/}
                {/*/>*/}
            </>
            {/*)*/}
            {/*: !isSearchRosterLoading && searchErrorMessage ? (*/}
            {/*        <div className="filter-message">*/}
            {/*            <div className="no-data">*/}
            {/*                <i className="fa fa-file-text-o"/>*/}
            {/*            </div>*/}
            {/*            <div className="message"> {searchErrorMessage}</div>*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <CLoading/>*/}
            {/*    )}*/}
        </div>
    </>;
};

export default QualificationAliasDataTable;
