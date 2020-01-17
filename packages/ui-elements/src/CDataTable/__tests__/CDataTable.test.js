import CDataTable from '../CDataTable'
import { AgGridReact } from 'ag-grid-react'
// import { EventService } from 'ag-grid-community';
expect.addSnapshotSerializer(enzymeSerializer)
describe('CDataTable Component Test', () => {
  let sShallow, onSelectionChangedMock, rowData, columnDefs, smount
  columnDefs = [
    { headerName: 'Make', field: 'make' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' }
  ]

  // specify the data
  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ]

  beforeEach(() => {
    onSelectionChangedMock = jest.fn()
    sShallow = shallow(
      <CDataTable
        id='agGridTableWrapper'
        tableId='agGridTable'
        onSelectionChanged={onSelectionChangedMock}
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection='single'
      />
    )
    // console.log(CDataTable.dive())
  })

  it('should be defined', () => {
    expect(sShallow).toBeDefined()
  })
  it('should have only one table wrapper', () => {
    expect(sShallow.find('#agGridTableWrapper')).toHaveLength(1)
  })
  it('should have only one Ag grid react table component', () => {
    expect(sShallow.find('#agGridTable')).toHaveLength(1)
  })
  it('should have wrapper with given props available', () => {
    const prps = ['height', 'width', 'id']
    const prpsReq = Object.keys(sShallow.find('#agGridTableWrapper').props())
    prpsReq.map((prp, i) => {
      expect(prp).toContain(prpsReq[i])
    })
  })
  it('should have table with given props available', () => {
    const prps = [
      'id',
      'enableSorting',
      'columnDefs',
      'rowData',
      'defaultColDef',
      'onGridReady',
      'rowSelection',
      'frameworkComponents',
      'floatingFilter',
      'editType',
      'onSelectionChanged',
      'onCellValueChanged'
    ]
    const keys = Object.keys(sShallow.find('#agGridTable').props())
    prps.map((prp, i) => {
      expect(prps).toContain(keys[i])
    })
  })
  describe('Simulation Change', () => {
    let changeCallback;
    const simulation = (myEventFunction,event,value) => {
      changeCallback = jest.spyOn(sShallow.instance(), myEventFunction)
      sShallow.instance().forceUpdate()
      sShallow.find(AgGridReact).simulate(event, value)        
    }
    it('should simulate the function onSelectionChanged when table value is changed', () => {
      simulation('onSelectionChanged','selectionChanged',{
        api: { getSelectedRows: jest.fn(a => []) }
      });
      expect(onSelectionChangedMock).toHaveBeenCalled();
      expect(changeCallback).toHaveBeenCalled()
    })

    it('should simulate the function onCellValueChanged and change the state rowChanged when table value is changed', () => {
      const value = {
        data: {id:1,make: 'Porsche', model: 'Boxer', price: 72000}
      }
      simulation('onCellValueChanged','cellValueChanged',value)
      
      expect(sShallow.state().rowChanged[0]).toEqual(value.data)
      expect(changeCallback).toHaveBeenCalled()
    });

    it('should change only the value of rowChanged when same id of object is given',() => {
      let value = {
        data: {id:1,make: 'Porsche', model: 'Boxer', price: 72000}
      }
      simulation('onCellValueChanged','cellValueChanged',value)
      value = {
        data: {id:1,make: 'Porsch', model: 'Boxer', price: 72000}
      }
      simulation('onCellValueChanged','cellValueChanged',value)
      expect(sShallow.state().rowChanged[0]).toEqual(value.data);
    })
  })
  describe('Snapshot Testing', () => {
    it('should match snapshot', () => {
      expect(sShallow).toMatchSnapshot()
    })
  })
})
