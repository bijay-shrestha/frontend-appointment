import React from 'react';
import {CFControl, CTable} from "@frontend-appointment/ui-elements";

const CTableTest = props => {
    return <>
        <div className="mt-3">
            <CTable
                id="qualification-alias"
                columnDefinition={[
                    {
                        headerName: 'SN',
                        field: 'sn',
                        editComponent: prop => <CFControl id="SN"/>,
                    },
                    {
                        headerName: 'Name',
                        field: 'name',
                        editComponent: prop => <CFControl id="SN"/>
                    },
                    // {
                    //     headerName: 'Action',
                    //     field: '',
                    //     displayComponent: ActionForEditableTable
                    // }
                ]}
                rowData={[
                    {name: "Sabu", sn: "1", isRowEditable: false, isNew: false},
                    {name: "Sabu", sn: "2"},
                    {name: "Sabu", sn: "3", isRowEditable: false, isNew: false},
                    {name: "Sabu", sn: "4", isRowEditable: false, isNew: false},
                    {name: "Sabu", sn: "5", isRowEditable: false, isNew: false},
                    {name: "Sabu", sn: "6", isRowEditable: false, isNew: false},
                    {name: "Sabu", sn: "7", isRowEditable: false, isNew: false},
                    {name: "Sabu", sn: "8", isRowEditable: false, isNew: false},
                    {name: "Sabu", sn: "9", isRowEditable: false, isNew: false},
                    {name: "Sabu", sn: "10", isRowEditable: false, isNew: false}
                ]}
                footerData={[
                    {
                        col1: {
                            value: "Total",
                            colSpan: "3"
                        },
                        col2:
                            {
                                value: 1000,
                                colSpan: "2"
                            }
                    }
                ]}
                headerBordered={true}
                headerClassName="table-header"
                bodyClassName="table-body"
                footerClassName="table-footer"
            />
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
        </div>

    </>
};

export default CTableTest;
