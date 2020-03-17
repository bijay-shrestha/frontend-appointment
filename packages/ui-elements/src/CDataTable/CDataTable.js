import React, {PureComponent} from 'react'
// import { AgGridReact} from 'ag-grid-react'
// import 'ag-grid/dist/styles/ag-grid.css';
// import 'ag-grid/dist/styles/ag-theme-balham-dark.css';
import {AgGridReact} from '@ag-grid-community/react';
import {AllCommunityModules} from '@ag-grid-community/all-modules';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.scss';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham/sass/ag-theme-balham.scss';

class CDataTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            gridApi: '',
            rowChanged: []
        }
    }

    onGridReady = params => {
        // console.log(params);
        this.setState({
            gridApi: params
        });
        params.api.sizeColumnsToFit()
    };

    onBtStopEditing() {
        this.state.gridApi.api.stopEditing();
    }

    onBtStartEditing() {
        this.state.gridApi.api.setFocusedCell(this.props.rowNumber, "name");
        this.state.gridApi.api.startEditingCell({
            rowIndex: this.props.rowNumber,
            colKey: "name"
        });
    }

    checkDataAndFilterTheData = event => {
        let datum = [...this.state.rowChanged];
        for (let i = 0; i < this.props.rowData.length; i++) {
            if (datum.length > i) {
                if (datum[i].id === event.data.id) {
                    datum[i] = {...event.data};
                    break
                }
            } else {
                datum[i] = {...event.data};
                break
            }
        }
        return datum
    };

    onCellValueChanged = e => {
        let data = this.checkDataAndFilterTheData(e);
        this.setState({
            rowChanged: data
        });
        this.props.onCellInputChange && this.props.onCellInputChange(e);
    };

    onSelectionChanged = row => {
        this.props.getSelectedRows && this.props.getSelectedRows(row.api.getSelectedRows()[0].id)
    };

    onCellClicked = e => {
        if (e.value) {
            let dataToPassed = e.data.id ? e.data.id : e.data;
            this.props.getSelectedRows && this.props.getSelectedRows(dataToPassed);
        }
    };

    getRowHeight = params => {
        return params.node.rowHeight;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.startEditing && !this.props.stopEditing) {
            this.onBtStartEditing()
        }
        if (this.props.stopEditing && !this.props.startEditing) {
            this.onBtStopEditing();
        }
    }

    render() {
        const {
            id,
            tableId,
            width,
            height,
            classes,
            enableSorting,
            columnDefs,
            rowData,
            defaultColDef,
            rowSelection,
            frameworkComponents,
            floatingFilter,
            editType,
            cellMouseOver,
            rowHeight,
            suppressClickEdit,
            components
        } = this.props;

        return (
            <>
                <div style={{width: width, height: height}} className={classes} id={id}>
                    <AgGridReact
                        id={tableId}
                        enableSorting={enableSorting}
                        columnDefs={[...columnDefs]}
                        rowData={[...rowData]}
                        defaultColDef={{...defaultColDef}}
                        onGridReady={this.onGridReady}
                        rowSelection={rowSelection}
                        // onSelectionChanged={rows => this.onSelectionChanged(rows)}
                        frameworkComponents={frameworkComponents}
                        components={components}
                        floatingFilter={floatingFilter}
                        editType={editType}
                        enableColResize
                        onCellFocused={this.props.onCellFocused}
                        cellMouseOver={cellMouseOver}
                        modules={AllCommunityModules}
                        onCellClicked={this.onCellClicked}
                        rowHeight={rowHeight}
                        suppressClickEdit={suppressClickEdit}
                        onCellValueChanged={e => this.onCellValueChanged(e)}
                    />
                </div>
            </>
        )
    }
}

export default CDataTable
