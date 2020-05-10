import React, {PureComponent} from 'react'
import {Image, Table} from 'react-bootstrap'
import {Scrollbars} from 'react-custom-scrollbars'
import PropTypes from 'prop-types'
import {CButton} from '../../index'
import ActionForEditableTable from './ActionForEditableTable'

class CTable extends PureComponent {
  state = {
    tableData: [],
    rowObject: {},
    isEditing: false,
    rowNumber: '',
    rowDataUnderAction: {},
    noDataErrorMessage: ''
  }

  refs = this.props.columnDefinition.map(column => {
    this[`component${column.field}`] = React.createRef()
    return column
  })

  prepareData = () => {
    let dataToSave = {...this.state.rowDataUnderAction}
    this.props.columnDefinition.map(column => {
      let currentElement = this[`component${column.field}`].current
      let currentElementProps = Object.keys(currentElement)
      if (currentElementProps.includes('value')) {
        dataToSave[column.field] = currentElement.value
      } else if (currentElementProps.includes('checked')) {
        dataToSave[column.field] = currentElement.checked
      } else if (currentElementProps.includes('state')) {
        dataToSave[column.field] = currentElement.state.value
          ? currentElement.state.value
          : currentElement.state.checked
      }
      return column
    })
    return dataToSave
  }

  handleAddNewRow = () => {
    const rowData = JSON.parse(JSON.stringify({...this.state.rowObject}))
    let tableDataList = [...this.state.tableData]
    tableDataList.unshift(rowData)
    this.setState({
      tableData: [...tableDataList],
      isEditing: true,
      rowNumber: 0,
      rowDataUnderAction: {...rowData}
    })
  }

  handleEditRow = (e, data) => {
    let tableDataList = [...this.state.tableData]

    let currentRowUnderAction = {...this.state.rowDataUnderAction}
    let dataToEdit = tableDataList[data.rowIndex]

    Object.keys(dataToEdit).map(
      dataKey => (currentRowUnderAction[dataKey] = dataToEdit[dataKey])
    )
    currentRowUnderAction.onRowEdit = true
    currentRowUnderAction.isNewRow = false
    tableDataList[data.rowIndex] = currentRowUnderAction
    if (this.state.isEditing) {
      tableDataList.shift()
    }
    this.setState({
      tableData: [...tableDataList],
      isEditing: true,
      rowDataUnderAction: {...currentRowUnderAction},
      rowNumber: data.rowIndex
    })
    this.props.onEdit(currentRowUnderAction)
  }

  handleClick = (e, data, type) => {
    const dataClicked = {...data}
    let saveAction
    switch (type) {
      case 'ADD':
        let addType = dataClicked.data.isNewRow ? 'SAVE' : 'UPDATE'
        if (addType === 'SAVE') {
          saveAction = this.props.saveAction
          this.handleSaveRowData(e, data)
        } else {
          saveAction = this.props.updateAction
          this.handleUpdateRowData(e, data)
        }
        break
      case 'CANCEL':
        saveAction = ''
        let cancelType = dataClicked.data.isNewRow ? 'ADD' : 'EDIT'
        this.handleCancel(data, cancelType)
        break
      case 'EDIT':
        saveAction = ''
        this.handleEditRow(e, data)
        break
      case 'DELETE':
        saveAction = this.props.deleteAction
        this.handleDelete(data)
        break
      case 'PREVIEW':
        saveAction = this.props.previewAction
        this.handlePreview(data)
        break
      default:
        break
    }
    if (saveAction) sessionStorage.setItem('actionType', saveAction)
  }

  handleSaveRowData = async (e, data) => {
    const {isEditing, rowNumber} = this.state
    let isEditingRow = isEditing,
      rowNumberSaved = rowNumber
    let dataToSave = this.prepareData()

    const isSaved = await this.props.onSave({
      data: dataToSave,
      rowIndex: data.rowIndex
    })
    if (isSaved) {
      isEditingRow = false
      rowNumberSaved = ''
    } else {
      isEditingRow = true
    }
    this.setState({
      isEditing: isEditingRow,
      rowNumber: rowNumberSaved
    })
  }

  handleUpdateRowData = async (e, data) => {
    //const {isEditing, rowNumber} = this.state
    // let isEditingRow = isEditing,
    //     rowNumberSaved = rowNumber
    let editData = this.prepareData()

    await this.props.onUpdate({
      data: editData,
      rowIndex: data.rowIndex
    })
    // if (isUpdated) {
    //     isEditingRow = false;
    //     rowNumberSaved = ''
    // } else {
    //     isEditingRow = true;
    // }
    // this.setState({
    //     isEditing: isEditingRow,
    //     rowNumber: rowNumberSaved
    // })
  }

  handleDelete = deleteRow => {
    this.props.onDelete(deleteRow.data)
  }

  handlePreview = previewData => {
    this.props.onPreview && this.props.onPreview(previewData.data)
  }

  handleCancel = (data, type) => {
    let tableDataList = [...this.state.tableData]
    let errorMessage = ''
    if (type === 'ADD') {
      tableDataList.shift()
      errorMessage = tableDataList.length ? '' : this.props.errorMessage
    } else {
      tableDataList[data.rowIndex].onRowEdit = false
    }
    this.setState({
      tableData: [...tableDataList],
      isEditing: false,
      rowNumber: '',
      rowDataUnderAction: {},
      noDataErrorMessage: errorMessage
    })
    this.props.onCancel()
  }

  createRowObject = () => {
    let tableDataList = [...this.state.tableData]
    let row = {}
    if (tableDataList.length) {
      row = {...tableDataList[0]}
      Object.keys(row).map(rowKey => (row[rowKey] = ''))
    } else {
      const {columnDefinition} = this.props
      columnDefinition.map(column => (row[column.field] = ''))
    }

    this.setState({
      rowObject: {
        ...row,
        onRowEdit: true,
        isNewRow: true
      },
      noDataErrorMessage: tableDataList.length ? '' : this.props.errorMessage
    })
  }

  getFooterContent = footerData => {
    let columnData = []
    for (let i = 0; i < Object.keys(footerData).length; i++) {
      let colData = footerData['col' + (i + 1)]
      columnData.push(
        <td colSpan={colData.colSpan && colData.colSpan}>{colData.value}</td>
      )
    }
    return columnData
  }

  setTableDataAndCreateRowObject = async tableData => {
    await this.setState({
      tableData: [...tableData]
    })
    this.createRowObject()
  }

  checkObjectEquality = (object1, object2) => {
    let areObjectsEqual = true
    let object1Props = Object.getOwnPropertyNames(object1)
    let object2Props = Object.getOwnPropertyNames(object2)

    if (object1Props.length !== object2Props.length) {
      areObjectsEqual = false
    }

    object1Props.map(object1Prop => {
      let value1 = object1[object1Prop]
      let value2 = object2[object1Prop]

      if (typeof value1 !== 'function' || typeof value2 !== 'function') {
        if (value1 !== value2) {
          areObjectsEqual = false
        }
      }
      return object1Prop
    })

    return areObjectsEqual
  }

  areArrayOfObjectsEqual = (array1, array2) => {
    let isEqual = true

    if (array1.length !== array2.length) {
      return !isEqual
    } else {
      array1.map((array1Obj, index) => {
        isEqual = this.checkObjectEquality(array1Obj, array2[index])
        return array1Obj
      })
      return isEqual
    }
  }

  componentDidMount () {
    this.setTableDataAndCreateRowObject(this.props.rowData)
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const {tableData, isEditing} = this.state
    const {rowData, isActionComplete} = this.props
    // IS ACTION COMPLETE AND CHANGE ACTION COMPLETE IS USED TO REMOVE THE EDIT/ADD STATE AFTER OPERATION IS COMPLETE
    // NOT ON THE TABLE'S BUTTON CLICK BUT AFTER CERTAIN OTHER ACTIONS OUTSIDE TABLE
    if (isActionComplete) {
      this.setState({
        isEditing: false,
        rowNumber: ''
      })
      this.props.changeActionComplete && this.props.changeActionComplete()
    }
    if (
      !this.areArrayOfObjectsEqual(tableData, rowData) ||
      prevProps.errorMessage !== this.props.errorMessage ||
      prevProps.isLoading !== this.props.isLoading
    ) {
      if (!isEditing) {
        this.setTableDataAndCreateRowObject(rowData)
      } else if (isEditing && !rowData.length) {
        this.setState({
          noDataErrorMessage: ''
        })
      }
    }
  }

  render () {
    const {
      id,
      columnDefinition,
      rowData,
      footerData,
      headerBordered,
      headerBorderless,
      headerHover,
      headerResponsive,
      headerStriped,
      headerVariant,
      headerBsPrefix,
      bordered,
      borderless,
      hover,
      responsive,
      size,
      striped,
      variant,
      bsPrefix,
      footerClassName,
      rowValid,
      onSave,
      isLoading,
      onPreview
    } = this.props
    const {tableData, isEditing, rowNumber, noDataErrorMessage} = this.state
    return (
      <>
        {onSave ? (
          <CButton
            id="add-new"
            name=""
            disabled={isEditing}
            onClickHandler={this.handleAddNewRow}
            className="add-new"
            size="lg"
          >
           <><i className="fa fa-plus-circle"/> &nbsp;New</>
          </CButton>
        ) : (
          ''
        )}

        {!isLoading && !noDataErrorMessage && tableData.length ? (
          <>
            <div id={id} className="editable-table">
              <Table
                className="table-header"
                id={id}
                bordered={headerBordered}
                borderless={headerBorderless}
                hover={headerHover}
                responsive={headerResponsive}
                size={size}
                striped={headerStriped}
                variant={headerVariant}
                bsPrefix={headerBsPrefix}
              >
                <thead>
                  <tr>
                    {columnDefinition.map((column, index) => (
                      <td key={column + index}>{column.headerName}</td>
                    ))}
                    <td>Actions</td>
                  </tr>
                </thead>
              </Table>
              <Scrollbars id="table-body" autoHide={true} style={{height: 400}}>
                <Table
                  className="table-body"
                  id={id}
                  bordered={bordered}
                  borderless={borderless}
                  hover={hover}
                  responsive={responsive}
                  size={size}
                  striped={striped}
                  variant={variant}
                  bsPrefix={bsPrefix}
                >
                  <tbody>
                    {tableData.map((row, rowIndex) => (
                      <tr
                        key={'row' + rowIndex}
                        className={row.onRowEdit ? 'activeRow' : ''}
                      >
                        {columnDefinition.map((column, colIndex) => (
                          <td
                            key={column.field + '-' + colIndex}
                            onClick={
                              !row.onRowEdit
                                ? Object.keys(row).includes('isRowEditable')
                                  ? row.isRowEditable && onPreview
                                    ? e =>
                                        this.handleClick(
                                          e,
                                          {
                                            data: row,
                                            rowIndex: rowIndex,
                                            columnIndex: colIndex
                                          },
                                          'PREVIEW'
                                        )
                                    : ()=>{}
                                  : onPreview
                                  ? e =>
                                      this.handleClick(
                                        e,
                                        {
                                          data: row,
                                          rowIndex: rowIndex,
                                          columnIndex: colIndex
                                        },
                                        'PREVIEW'
                                      )
                                  : ()=>{}
                                : () => {}
                            }
                          >
                            {row.onRowEdit &&
                            Object.keys(column).includes('editComponent') ? (
                              <column.editComponent
                                node={{
                                  data: row,
                                  rowIndex: rowIndex,
                                  columnIndex: colIndex
                                }}
                                reff={this[`component${column.field}`]}
                              />
                            ) : Object.keys(column).includes(
                                'displayComponent'
                              ) ? (
                              <column.displayComponent
                                node={{
                                  data: row,
                                  rowIndex: rowIndex,
                                  columnIndex: colIndex
                                }}
                                reff={this[`component${column.field}`]}
                              />
                            ) : (
                              row[column.field]
                            )}
                          </td>
                        ))}
                        <td>
                          <ActionForEditableTable
                            {...this.props}
                            node={{
                              data: row,
                              rowIndex: rowIndex
                            }}
                            rowNumber={rowNumber}
                            isEditing={isEditing}
                            rowValid={rowValid}
                            onClick={this.handleClick}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Scrollbars>
              {footerData ? (
                <Table
                  className={footerClassName}
                  id={id}
                  bordered={true}
                  borderless={borderless}
                  hover={hover}
                  responsive={responsive}
                  size={size}
                  striped={striped}
                  variant={variant}
                  bsPrefix={bsPrefix}
                >
                  <tbody>
                    {rowData.map((row, rowIndex) => (
                      <td key={rowIndex}></td>
                    ))}
                  </tbody>
                  <tfoot>
                    {footerData.map(footer => (
                      <tr>{this.getFooterContent(footer)}</tr>
                    ))}
                  </tfoot>
                </Table>
              ) : (
                ''
              )}
            </div>
          </>
        ) : !isLoading && noDataErrorMessage ? (
          <div className="filter-message">
            <div className="no-data">
              <i className="fa fa-file-text-o" />
            </div>
            <div className="message"> {noDataErrorMessage}</div>
          </div>
        ) : (
          <div className="filter-message c-loading">
            <div className="message-content">
              <Image
                src={require('./dot-loader-gray.svg')}
                alt={'dot-loader'}
                className="loader"
              />
              <span>Loading....</span>
            </div>
          </div>
        )}
        {/* </div> */}
      </>
    )
  }
}

CTable.propTypes = {
  columnDefinition: PropTypes.arrayOf(
    PropTypes.shape({
      headerName: PropTypes.string.isRequired,
      field: PropTypes.string,
      displayComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func
      ]),
      editComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
  rowData: PropTypes.arrayOf(PropTypes.object),
  footerData: PropTypes.arrayOf(
    PropTypes.shape({
      footerRowData: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.any.isRequired,
          colSpan: PropTypes.string
        })
      )
    })
  ),
  rowValid: PropTypes.bool,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onEdit: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onPreview: PropTypes.func,
  bordered: PropTypes.bool,
  borderless: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  size: PropTypes.string,
  striped: PropTypes.bool,
  variant: PropTypes.string,
  bsPrefix: PropTypes.string
}

export default CTable
