import React from 'react';
import {
    CCheckbox,
    CFControl,
    CHybridTimePicker,
    CRadioButton,
    CSelect,
    CTable,
    CToggle
} from "@frontend-appointment/ui-elements";
import {StatusLabel} from "@frontend-appointment/ui-components";

const CTableTest = props => {
    return <>
        <div className="mt-3">
            <CTable
                id="qualification-alias"
                columnDefinition={[
                    {
                        headerName: 'Name',
                        field: 'name',
                        editComponent: prop => <CFControl
                            id="name"
                            name='name'
                            type="text"
                            reference={prop.reff}
                            // defaultValue={aliasData.name}
                            defaultValue={""}
                        />,
                    },
                    {
                        headerName: 'Status',
                        field: 'status',
                        editComponent: prop => <CSelect
                            {...prop}
                            id="status"
                            name='status'
                            innerRef={prop.reff}
                            options={[
                                {
                                    label: 'Active', value: 'Y'
                                },
                                {
                                    label: 'Inactive', value: 'N'
                                },
                            ]}
                            defaultValue={{
                                label: 'Active', value: 'Y'
                            }}
                        />,
                        displayComponent: prop => <StatusLabel {...prop}/>
                    },
                    {
                        headerName: 'Checkbox',
                        field: 'id',
                        editComponent: prop => <CCheckbox
                            id="id"
                            name='id'
                            label="All"
                            reference={prop.reff}
                            defaultChecked={true}
                        />,
                    },
                    {
                        headerName: 'Radio',
                        field: 'id',
                        editComponent: prop =>
                            <>
                                <CRadioButton
                                    id="radio"
                                    name='id'
                                    label="All"
                                    value='A'
                                    reference={prop.reff}
                                    defaultChecked={false}
                                />
                            </>,
                    },
                    {
                        headerName: 'Toggle',
                        field: 'id',
                        editComponent: prop =>
                            <>
                                <CToggle
                                    id="toggle"
                                    name='id'
                                    onLabel="ON"
                                    offLabel="OFF"
                                    reference={prop.reff}
                                    checked={true}
                                />
                            </>,
                    },
                    {
                        headerName: 'Timepicker',
                        field: 'id',
                        editComponent: prop =>
                            <>
                                <CHybridTimePicker
                                    innerRef={prop.reff}
                                    id={"startTime-override"}
                                    name={"startTime"}
                                    label="Start Time"
                                    placeholder="00:00"
                                    defaultValue={new Date()}
                                    value={new Date()}
                                    isClearable={true}
                                    duration={15}
                                />
                            </>,
                    }
                    // {
                    //     headerName: 'Date',
                    //     field: 'date',
                    //     editComponent: prop => <CEnglishDatePicker
                    //         id="date"
                    //         name='date'
                    //         type="text"
                    //         customInputRef={prop.reff}
                    //         defaultValue={aliasData.name}
                    //         label=""
                    //         dateFormat="yyyy-MM-dd"
                    //         minDate={0}
                    //         showDisabledMonthNavigation={true}
                    //         selected={""}
                    //         peekNextMonth={true}
                    //         showMonthDropdown={true}
                    //         showYearDropdown={true}
                    //         dropdownMode="select"
                    //         onChange={() => {
                    //         }}/>,
                    // },
                ]}
                rowData={[
                    {name: "Sabu", sn: "1"},
                    {name: "Sabu", sn: "2"},
                    {name: "Sabu", sn: "3"},
                    {name: "Sabu", sn: "4"},
                    {name: "Sabu", sn: "5"},
                    {name: "Sabu", sn: "6"},
                    {name: "Sabu", sn: "7"},
                    {name: "Sabu", sn: "8"},
                    {name: "Sabu", sn: "9"},
                    {name: "Sabu", sn: "10"}
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
