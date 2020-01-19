import React, {PureComponent} from 'react'
import SubDepartmentSetupSearchFilter from './SubDepartmentSetupSearchFilter'
import {AdminModuleAPIConstants} from '@cogent/web-resource-key-constants'
import SubDepartmentDetailsDataTable from './SubDepartmentDetailsDataTable'
import SubDepartmentEditForm from './SubDepartmentEditModal'
import {CAlert, CButton} from '@cogent/ui-elements'
class SubDepartmentManage extends PureComponent {
 

  setShowModal = () => {
    this.setState({
      showSubDepartmentModal: false,
      deleteModalShow: false,
      showEditModal: false
    })
  }

 
  // resetDepartmentUpdateDataFromState = () => {
  //   this.setState({
  //     subDepartmentUpdateData: {
  //       ...this.state.subDepartmentUpdateData,
  //       id: '',
  //       name: '',
  //       code: '',
  //       status: '',
  //       remarks: '',
  //       departmentId: '',
  //       formValid: true,
  //       nameValid: true,
  //       codeValid: true
  //     },
  //     showEditModal: false
  //   })
  // }

  setStateValuesForSearch = searchParams => {
    this.setState({
      searchParameters: searchParams
    })
  }

  handleSearchFormChange = async event => {
    if (event) {
      let fieldName = event.target.name
      let value = event.target.value
      let label = event.target.label
      let searchParams = {...this.state.searchParameters}
      searchParams[fieldName] = label ? (value ? {value, label} : '') : value
      await this.setStateValuesForSearch(searchParams)
    }
  }

  handleSearchFormReset = async () => {
    await this.setState({
      searchParameters: {
        departmentId: '',
        code: '',
        status: {value: null, label: 'All'},
        name: '',
        id: null
      }
    })
    this.searchDepartments()
  }

  searchDepartments = async page => {
    const {code, departmentId, name, status, id} = this.state.searchParameters
    let searchData = {
      name: name,
      code: code,
      status: status.value,
      departmentId: departmentId ? departmentId.value : departmentId,
      id: id
    }

    let updatedPage =
      this.state.queryParams.page === 0
        ? 1
        : page
        ? page
        : this.state.queryParams.page
    await this.props.searchSubDepartment(
      SEARCH_SUB_DEPARTMENT,
      {
        page: updatedPage,
        size: this.state.queryParams.size
      },
      searchData
    )

    await this.setState({
      totalRecords: this.props.SubDepartmentSearchReducer.subDepartmentList
        .length
        ? this.props.SubDepartmentSearchReducer.subDepartmentList[0].totalItems
        : 0,
      queryParams: {
        ...this.state.queryParams,
        page: updatedPage
      }
    })
  }

  appendSNToTable = subDepartmentList =>
    subDepartmentList.length &&
    subDepartmentList.map((prof, index) => ({
      ...prof,
      sN: index + 1,
      name: prof.name.toUpperCase()
    }))

  handlePageChange = async newPage => {
    await this.setState({
      queryParams: {
        ...this.state.queryParams,
        page: newPage
      }
    })
    this.searchDepartments()
  }
  

  onDeleteHandler = async id => {
    this.props.clearSubDepartMentCreateMessage()
    let deleteRequestDTO = {...this.state.deleteRequestDTO}
    deleteRequestDTO['id'] = id
    await this.setState({
      deleteRequestDTO: deleteRequestDTO,
      deleteModalShow: true
    })
  }

  onSubmitDeleteHandler = async () => {
    try {
      await this.props.deleteSubDepartment(
        DELETE_SUB_DEPARTMENT,
        this.state.deleteRequestDTO
      )
      await this.setState({
        deleteModalShow: false,
        deleteRequestDTO: {id: 0, remarks: '', status: 'D'}
      })
      await this.searchDepartments()
    } catch (e) {
      this.setState({
        deleteModalShow: true
      })
    }
  }

  deleteRemarksHandler = event => {
    const {name, value} = event.target
    let deleteRequest = {...this.state.deleteRequestDTO}
    deleteRequest[name] = value
    this.setState({
      deleteRequestDTO: deleteRequest
    })
  }

  logoutUser = async () => {
    try {
      let logoutResponse = await this.props.logoutUser('/cogent/logout')
      if (logoutResponse) {
        this.props.history.push('/')
      }
    } catch (e) {}
  }

  automaticLogoutUser = () => {
    setTimeout(() => this.logoutUser(), 10000)
  }

  checkIfEditedOwnDepartmentAndShowMessage = editedDepartmentId => {
    let variantType = '',
      message = ''
    let loggedInAdminInfo = JSON.parse(localStorage.getItem('adminInfo'))
    if (editedDepartmentId === loggedInAdminInfo.subDepartmentId) {
      variantType = 'warning'
      message =
        'You seem to have edited your own subdepartment. Please Logout and Login to see the changes or ' +
        "you'll be automatically logged out in 10s"
      this.automaticLogoutUser()
    } else {
      variantType = 'success'
      message = this.props.SubDepartmentEditReducer
        .subDepartmentEditSuccessMessage
    }
    this.setState({
      showAlert: true,
      alertMessageInfo: {
        variant: variantType,
        message: message
      }
    })
  }

  

  

  

 
  componentDidMount () {
    this.searchDepartments()
    this.getDepartmentForDropDown()
  }

  render () {
    const {
      subDepartmentUpdateData,
      showSubDepartmentModal,
      alertMessageInfo,
      deleteModalShow,
      deleteRequestDTO,
      queryParams,
      totalRecords,
      searchParameters,
      showAlert,
      showEditModal,
      departmentDrop
    } = this.state
    console.log('All Props', this.props)
    const {
      isSearchLoading,
      subDepartmentList,
      searchErrorMessage
    } = this.props.SubDepartmentSearchReducer

    const {
      subDepartmentPreviewData,
      isPreviewLoading,
      subDepartmentPreviewErrorMessage
    } = this.props.SubDepartmentPreviewReducer

    const {subDepartmentEditErrorMessage} = this.props.SubDepartmentEditReducer

    const {deleteErrorMessage} = this.props.SubDepartmentEditReducer
    return (
      <>
        <div className="">
          <SubDepartmentSetupSearchFilter
            searchParameters={searchParameters}
            onInputChange={this.handleSearchFormChange}
            onSearchClick={() => this.searchDepartments(1)}
            resetSearchForm={this.handleSearchFormReset}
            departmentList={departmentDrop}
          />
        </div>
        <div className=" mb-2">
          <SubDepartmentDetailsDataTable
            filteredActions={this.props.filteredAction}
            showDepartmentModal={showSubDepartmentModal}
            isSearchLoading={isSearchLoading}
            searchData={this.appendSNToTable(subDepartmentList)}
            searchErrorMessage={searchErrorMessage}
            setShowModal={this.setShowModal}
            onDeleteHandler={this.onDeleteHandler}
            onEditHandler={this.onEditHandler}
            isPreviewLoading={isPreviewLoading}
            onPreviewHandler={this.onPreviewHandler}
            subDepartmentPreviewData={subDepartmentPreviewData}
            subDepartmentPreviewErrorMessage={subDepartmentPreviewErrorMessage}
            totalItems={totalRecords}
            maxSize={queryParams.size}
            currentPage={queryParams.page}
            handlePageChange={this.handlePageChange}
            deleteModalShow={deleteModalShow}
            onSubmitDelete={this.onSubmitDeleteHandler}
            remarksHandler={this.deleteRemarksHandler}
            departmentList={departmentDrop}
            remarks={deleteRequestDTO.remarks}
            deleteErrorMsg={deleteErrorMessage}
            exportExcel={this.downloadEXCEL}
          />
        </div>
        {showEditModal && (
          <SubDepartmentEditForm
            showModal={showEditModal}
            setShowModal={this.setShowModal}
            onEnterKeyPress={this.handleEnter}
            departmentData={subDepartmentUpdateData}
            onInputChange={this.handleUpdateFormChange}
            editApiCall={this.editDepartment}
            formValid={subDepartmentUpdateData}
            errorMessageForDepartmentName={
              subDepartmentUpdateData.errorMessageForSubDepartmentName
            }
            errorMessageForDepartmentCode={
              subDepartmentUpdateData.errorMessageForSubDepartmentCode
            }
            errorMessage={subDepartmentEditErrorMessage}
            departmentList={departmentDrop}
          />
        )}
        <CAlert
          id="profile-add"
          variant={alertMessageInfo.variant}
          show={showAlert}
          onClose={this.closeAlert}
          alertType={
            alertMessageInfo.variant === 'success' ? (
              <>
                <i className="fa fa-check-circle" aria-hidden="true">
                  {' '}
                </i>
              </>
            ) : (
              <>
                <i className="fa fa-exclamation-triangle" aria-hidden="true">
                  {' '}
                </i>
              </>
            )
          }
          message={alertMessageInfo.message}
        />
      </>
    )
  }
}

export default ConnectHoc(
  SubDepartmentManage,
  [
    'SubDepartmentSearchReducer',
    'SubDepartmentPreviewReducer',
    'SubDepartmentDeleteReducer',
    'SubDepartmentEditReducer'
  ],
  {
    clearSubDepartMentCreateMessage,
    createSubDepartMent,
    deleteSubDepartment,
    editSubDepartment,
    previewSubDepartment,
    searchSubDepartment,
    downloadExcelForSubDepartments
  }
)
