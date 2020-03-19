import React from 'react';
import {
    CButton,
    CDataTable,
    CFControl,
    CLoading,
    CPagination,
    CSelect,
    CTable
} from "@frontend-appointment/ui-elements";
import StatusSelect from "../CommonComponents/table-components/StatusSelect";
import ActionForEditableTable from "../CommonComponents/table-components/ActionForEditableTable";
import StatusRenderer from "../CommonComponents/table-components/StatusRenderer";
import InputFieldForTable from "../CommonComponents/table-components/InputFieldForTable";
import CTableTest from "./CTableTest";

const QualificationAliasDataTable = ({tableData}) => {
    const {
        qualificationAliasList,
        addNewRow,
        startEditing,
        stopEditing,
        editRowNumber,
        isSearchQualificationAliasLoading,
        searchErrorMessage,
        currentPage,
        maxSize,
        totalItems,
        handlePageChange,
        handleActionButtonClick,
        handleCellActionCompletion,
    } = tableData;

    return <>
        <div className="manage-details">
            <h5 className="title">Qualification Alias Setup</h5>
            <CButton
                id="add-alias"
                name="Add New"
                disabled={startEditing}
                onClickHandler={addNewRow}
            />
            {/*{!isSearchQualificationAliasLoading && !searchErrorMessage && qualificationAliasList.length ?*/}
            {/*    (*/}
            <>
                <CTableTest/>
                {/*<CDataTable*/}
                {/*    classes="ag-theme-balham"*/}
                {/*    id="roles-table"*/}
                {/*    width="100%"*/}
                {/*    height="460px"*/}
                {/*    startEditing={startEditing}*/}
                {/*    stopEditing={stopEditing}*/}
                {/*    rowNumber={editRowNumber}*/}
                {/*    // enableSorting*/}
                {/*    editType="fullRow"*/}
                {/*    columnDefs={[*/}
                {/*        {*/}
                {/*            headerName: 'Name',*/}
                {/*            field: 'name',*/}
                {/*            resizable: true,*/}
                {/*            sizeColumnsToFit: false,*/}
                {/*            editable: true,*/}
                {/*            cellRenderer: 'nameEditor',*/}
                {/*            cellRendererParams: {*/}
                {/*                startEditing: startEditing*/}
                {/*            },*/}
                {/*        },*/}
                {/*        {*/}
                {/*            headerName: 'Status',*/}
                {/*            field: 'status',*/}
                {/*            resizable: true,*/}
                {/*            sizeColumnsToFit: false,*/}
                {/*            cellStyle: {overflow: 'visible', 'z-index': '99'},*/}
                {/*            cellClass: 'actions-button-cell',*/}
                {/*            cellRenderer: 'statusSelectRenderer',*/}
                {/*            cellRendererParams: {*/}
                {/*                options: [*/}
                {/*                    {value: 'Y', label: 'Active'},*/}
                {/*                    {value: 'N', label: 'Inactive'},*/}
                {/*                ],*/}
                {/*                startEditing: startEditing*/}
                {/*            },*/}
                {/*            editable: true,*/}
                {/*        },*/}
                {/*        {*/}
                {/*            headerName: '',*/}
                {/*            action: 'action',*/}
                {/*            resizable: true,*/}
                {/*            sortable: true,*/}
                {/*            sizeColumnsToFit: false,*/}
                {/*            cellRenderer: 'childActionRenderer',*/}
                {/*            cellClass: 'actions-button-cell',*/}
                {/*            editable: false,*/}
                {/*            cellRendererParams: {*/}
                {/*                onClick: function (e, data, type) {*/}
                {/*                    handleActionButtonClick(data, type)*/}
                {/*                },*/}
                {/*                // filteredAction: filteredAction*/}
                {/*            },*/}
                {/*            cellStyle: {overflow: 'visible', 'z-index': '99'}*/}
                {/*        },*/}

                {/*    ]}*/}
                {/*    frameworkComponents={{*/}
                {/*        childActionRenderer: ActionForEditableTable,*/}
                {/*        statusSelectRenderer: StatusSelect,*/}
                {/*        statusRenderer: StatusRenderer,*/}
                {/*        nameEditor: InputFieldForTable*/}
                {/*    }}*/}
                {/*    rowData={qualificationAliasList}*/}
                {/*    suppressClickEdit={true}*/}
                {/*    onCellInputChange={(e) => handleCellActionCompletion(e)}*/}
                {/*/>*/}
                <CPagination
                    totalItems={totalItems}
                    maxSize={maxSize}
                    currentPage={currentPage}
                    onPageChanged={handlePageChange}
                />
            </>
            {/*)*/}
            {/*: !isSearchQualificationAliasLoading && searchErrorMessage ? (*/}
            {/*    <div className="filter-message">*/}
            {/*        <div className="no-data">*/}
            {/*            <i className="fa fa-file-text-o"/>*/}
            {/*        </div>*/}
            {/*        <div className="message"> {searchErrorMessage}</div>*/}
            {/*    </div>*/}
            {/*) : (*/}
            {/*    <CLoading/>*/}
            {/*)}*/}
        </div>
    </>;
};

export default QualificationAliasDataTable;
