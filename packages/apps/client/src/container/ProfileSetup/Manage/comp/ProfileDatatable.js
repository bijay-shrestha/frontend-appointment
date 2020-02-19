import React, { PureComponent } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import {
    CDataTable,
    CHybridInput,
    CHybridSelect,
    CRadioButton,
    CForm,
    CFLabel,
    CButton

} from "@frontend-appointment/ui-elements";
 import DropDownSelector from './DropdownSelector'
 import CSelect from './CSelect';
//import { AgGridReact } from 'ag-grid-react'

import { AgGridReact } from '@ag-grid-community/react';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-blue.css';


class ProfileDatatable extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      rowChanged: [],
      columnDefs: [
        {
          headerName: 'Name',
          field: 'name',
          cellStyle: { textAlign: 'center' },
          filter: 'agTextColumnFilter',
          editable: true,
          filterParams: {
            defaultOption: 'startsWith'
          }
        },
        {
          headerName: 'Username',
          field: 'username',
          cellStyle: { textAlign: 'center' },
          editable: true,
          filter: 'agTextColumnFilter',
          filterParams: {
            filterOptions: ['contains', 'notContains']
          }
        },
        {
          headerName: 'Address',
          colSpan: '3',
          cellStyle: { textAlign: 'center' },
          children: [
            {
              headerName: 'Country',
              field: 'country',
              filter: 'agTextColumnFilter',
              filterParams: {
                filterOptions: ['contains', 'notContains'],
                textCustomComparator: function(
                  filter,
                  value,
                  filterText
                ) {
                  const val = [
                    { value: 1, label: 'Nepal' },
                    { value: 2, label: 'China' },
                    { value: 3, label: 'India' }
                  ]
                  function contains(target, lookingFor) {
                    if (target === null) return false;
                    return target.indexOf(lookingFor) >= 0;
                  }
                  var literalMatched=[];
                  for(let i =0 ; i<val.length ; i++) {
                  let valueLowerCase = val[i].label.toString().toLowerCase();
                  literalMatched =  contains(valueLowerCase, filterText); 
                  if(literalMatched) 
                    return true; 
                 }
                  return false;
                  
              },
              debounceMs:2000 
                
              },

              cellStyle: { overflow: 'visible', 'z-index': '3' },
              cellRenderer: 'countryCellRenderer',
              cellRendererParams: {
                options: [
                  { value: 1, label: 'Nepal' },
                  { value: 2, label: 'China' },
                  { value: 3, label: 'India' }
                ],
                name: 'mySelect',
                onChange: function (e) {
                  // console.log(self);
                  if (e) {
                    const { value, label } = e
                    this.node.data.country = { value: value, label: label }
                  }
                }
              }
            },
            {
              headerName: 'City',
              field: 'city',
              cellStyle: { textAlign: 'center' },
              filter: 'agTextColumnFilter',
              editable: true,
              filterParams: {
                filterOptions: ['contains', 'notContains']
              }
            },
            {
              headerName: 'Zip',
              editable: true,
              field: 'zip',
              cellStyle: { textAlign: 'center' }
            }
          ]
        },
        {
          headerName: 'Actions',
          cellRenderer: 'childMessageRenderer'
        }
      ]
      
      ,
      rowData: [
        {
          id: '1',
          name: 'Kaushal',
          username: 'kk',
          country: { value: 3, label: 'India' },
          // country:"China",
          city: 'Morang',
          zip: '1111'
        },
        {
          id: '2',
          name: 'Kaushal',
          username: 'sabu',
          country: { value: 1, label: 'Nepal' },
          // country:"Nepal",
          city: 'Morang',
          zip: '1111'
        },
        {
          id: '3',
          name: 'Kaushal',
          username: 'Kaushal123',
          country: {},
          // country:"China",
          city: 'Morang',
          zip: '1111'
        },
        {
          id: '4',
          name: 'Kaushal',
          username: 'Sudin',
          country: { value: 3, label: 'India' },
          // country:"India",
          city: 'Morang',
          zip: '1111'
        }
      ],
      frameworkComponents: {
        childMessageRenderer: CButton,
        countryCellRenderer: DropDownSelector
      },
      rowSelection: 'single',
      gridApi: '',
      defaultColDef: {
        filter: true,
        resizable: true
      }
    }
    this.onGridReady = this.onGridReady.bind(this)
    // this.onCellValueChanged=this.onCellValueChanged.bind(this);
  }

  checkDataAndFilterTheData = event => {
    let datum = [...this.state.rowChanged]
    for (let i=0; i<this.state.rowData.length;i++) {
      if (datum.length > i) {
        if (datum[i].id === event.data.id) {
          datum[i] = { ...event.data }
          break
        }
      } else {
        datum[i] = { ...event.data }
        break
        }
      }
    
    return datum;
  }

  onCellValueChanged (e) {
    let data = this.checkDataAndFilterTheData(e)
    console.log(data);
    this.setState({
      rowChanged: data
    })
  }

  onGridReady (params) {
    //console.log(params)
    this.setState({
      gridApi: params
    })
  }

  onSelectionChanged = (row) => {
   // console.log('rowApi',row.api.getSelectedRows()[0])
  }


  saveChangedRows (rowChanged, obj) {
    console.log(rowChanged)
    console.log('-----', obj)
  }
  render () {
    return (
      <div
        style={{ width: '100%', height: '300px' }}
        className='ag-theme-blue'
      >
        <button
          onClick={(e, obj) =>
            this.saveChangedRows(this.state.rowChanged, { id: 'kaushal' })
          }
        >
          Save
        </button>
        <AgGridReact
          enableSorting
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          defaultColDef={this.state.defaultColDef}
          onGridReady={this.onGridReady}
          rowSelection={this.state.rowSelection}
          frameworkComponents={this.state.frameworkComponents}
          floatingFilter
          editType='fullRow'
          onSelectionChanged={(e)=>this.onSelectionChanged(e)}
          onCellValueChanged={e => this.onCellValueChanged(e)}
          modules={AllCommunityModules}
          enableColResize
          modules={AllCommunityModules}
        />
      </div>
    )
  }
}

export default ProfileDatatable