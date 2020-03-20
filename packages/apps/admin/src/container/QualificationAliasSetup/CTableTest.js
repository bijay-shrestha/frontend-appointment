import React from 'react';
import {CFControl, CTable} from "@frontend-appointment/ui-elements";
import ActionForEditableTable from "../CommonComponents/table-components/ActionForEditableTable";

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
                    {
                        headerName: 'Action',
                        field: '',
                        displayComponent: ActionForEditableTable
                    }]}
                rowData={[
                    {name: "Sabu", sn: "1", isRowEditable: true},
                    {name: "Sabu", sn: "2"},
                    {name: "Sabu", sn: "3", isRowEditable: false},
                    {name: "Sabu", sn: "4", isRowEditable: false},
                    {name: "Sabu", sn: "5", isRowEditable: false},
                    {name: "Sabu", sn: "6", isRowEditable: false},
                    {name: "Sabu", sn: "7", isRowEditable: false},
                    {name: "Sabu", sn: "8", isRowEditable: false},
                    {name: "Sabu", sn: "9", isRowEditable: false},
                    {name: "Sabu", sn: "10", isRowEditable: false}
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
        </div>

    </>
};

export default CTableTest;
