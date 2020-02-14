import React, {PureComponent} from 'react';
import DepartmentSetupSearchFilter from "./DepartmentSetupSearchFilter";
import {ConnectHoc} from "@frontend-appointment/commons";
import {
    DepartmentSetupMiddleware,
    logoutUser,
    HospitalSetupMiddleware
} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants';
import DepartmentDetailsDataTable from "./DepartmentDetailsDataTable";
import DepartmentEditForm from "./DepartmentEditModal";
import {CAlert} from "@frontend-appointment/ui-elements";
import {EnterKeyPressUtils, FileExportUtils} from "@frontend-appointment/helpers";
import "./../department-setup.scss";

const {
    fetchDepartmentList,
    previewDepartment,
    editDepartment,
    deleteDepartment,
    downloadExcelForDepartments,
    clearDepartmentSuccessErrorMessagesFromStore
} = DepartmentSetupMiddleware;

const {
    SEARCH_DEPARTMENT,
    FETCH_DEPARTMENT_DETAILS,
    EDIT_DEPARTMENT,
    DELETE_DEPARTMENT,
    EXPORT_DEPARTMENT_EXCEL
} = AdminModuleAPIConstants.departmentSetupAPIConstants;

const {FETCH_HOSPITALS_FOR_DROPDOWN} = AdminModuleAPIConstants.hospitalSetupApiConstants;

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;

class DepartmentManage extends PureComponent {
    state = {
        showDepartmentModal: false,
        showEditModal: false,
        deleteModalShow: false,
        searchParameters: {
            departmentName: '',
            departmentCode: '',
            hospital: '',
            status: {value: 'A', label: 'All'}
        },
        queryParams: {
            page: 0,
            size: 10
        },
        deleteRequestDTO: {
            id: 0,
            remarks: '',
            status: 'D'
        },
        totalRecords: 0,
        alertMessageInfo: {
            variant: '',
            message: ''
        },
        showAlert: false,
        departmentUpdateData: {
            id: '',
            name: '',
            code: '',
            status: 'Y',
            hospital: '',
            remarks: '',
            formValid: false,
            nameValid: false,
            codeValid: false,
            errorMessageForDepartmentName: "Department Name should not contain special characters",
            errorMessageForDepartmentCode: '',
        }
    };

    setShowModal = () => {
        this.setState({
            showDepartmentModal: false,
            deleteModalShow: false,
            showEditModal: false
        })
    };

    closeAlert = () => {
        this.props.clearDepartmentSuccessErrorMessagesFromStore();
        this.setState({
            showAlert: !this.state.showAlert
        });
    };

    resetDepartmentUpdateDataFromState = () => {
        this.setState({
            departmentUpdateData: {
                ...this.state.departmentUpdateData,
                id: '',
                name: '',
                code: '',
                status: '',
                remarks: '',
                formValid: true,
                nameValid: true,
                codeValid: true,
            },
            showEditModal: false
        })
    };

    setStateValuesForSearch = (key, value, label) => {
        label ? (value ? this.setState({
                    searchParameters: {
                        ...this.state.searchParameters,
                        [key]: {value, label}
                    }
                }) : this.setState({
                    searchParameters: {...this.state.searchParameters, [key]: null}
                })
            )
            : this.setState({
                searchParameters: {...this.state.searchParameters, [key]: value}
            });
    };

    handleSearchFormChange = async (event) => {
        if (event) {
            let fieldName = event.target.name;
            let value = event.target.value;
            let label = event.target.label;
            await this.setStateValuesForSearch(fieldName, value, label);
        }
    };

    handleSearchFormReset = async () => {
        await this.setState({
            searchParameters: {
                ...this.state.searchParameters,
                departmentName: '',
                departmentCode: '',
                hospital: '',
                status: {value: 'A', label: 'All'}
            },
        });
        this.searchDepartments();
    };

    searchDepartments = async (page) => {
        const {departmentName, departmentCode, status, hospital} = this.state.searchParameters;
        let searchData = {
            name: departmentName,
            departmentCode: departmentCode,
            hospitalId: hospital ? hospital.value : '',
            status: status && status.value !== 'A'
                ? status.value
                : ''
        };

        let updatedPage =
            this.state.queryParams.page === 0 ? 1 : (page ? page : this.state.queryParams.page);
        await this.props.fetchDepartmentList(
            SEARCH_DEPARTMENT,
            {
                page: updatedPage,
                size: this.state.queryParams.size
            },
            searchData
        );

        await this.setState({
            totalRecords: this.props.DepartmentListReducer.departmentList.length
                ? this.props.DepartmentListReducer.departmentList[0].totalItems
                : 0,
            queryParams: {
                ...this.state.queryParams,
                page: updatedPage
            }
        })
    };

    appendSNToTable = departmentList =>
        departmentList.map((prof, index) => ({
            ...prof, sN: index + 1, name: prof.name.toUpperCase()
        }));

    handlePageChange = async newPage => {
        await this.setState({
            queryParams: {
                ...this.state.queryParams,
                page: newPage
            }
        });
        this.searchDepartments();
    };

    previewApiCall = async id => {
        await this.props.previewDepartment(FETCH_DEPARTMENT_DETAILS, id);
    };

    onPreviewHandler = async id => {
        try {
            await this.previewApiCall(id);
            this.setState({
                showDepartmentModal: true
            });
        } catch (e) {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "danger",
                    message: this.props.DepartmentPreviewReducer.departmentPreviewErrorMessage
                    // e.errorMessage ? e.errorMessage: e.message
                }
            })
        }
    };

    onEditHandler = async id => {
        try {
            await this.previewApiCall(id);
            const {name, departmentCode, status, hospitalId, hospitalName} = this.props.DepartmentPreviewReducer.departmentPreviewData;
            this.setState({
                showEditModal: true,
                departmentUpdateData: {
                    ...this.state.departmentUpdateData,
                    name: name,
                    code: departmentCode,
                    status: status,
                    hospital: {label: hospitalName, value: hospitalId},
                    id: id,
                    formValid: true,
                    nameValid: true,
                    codeValid: true,
                }
            });
        } catch (e) {
            console.log(e)
        }
    };

    editDepartment = async () => {
        const {id, name, code, status, hospital, remarks} = this.state.departmentUpdateData;

        let departmentUpdateRequestDTO = {
            id: id,
            name: name,
            departmentCode: code,
            hospitalId: Number(hospital.value),
            remarks: remarks,
            status: status,
        };
        try {
            await this.props.editDepartment(EDIT_DEPARTMENT, departmentUpdateRequestDTO);
            this.resetDepartmentUpdateDataFromState();
            this.checkIfEditedOwnDepartmentAndShowMessage(departmentUpdateRequestDTO.id);
            await this.searchDepartments();
        } catch (e) {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "danger",
                    message: this.props.DepartmentEditReducer.departmentErrorMessage
                    // e.errorMessage ? e.errorMessage: e.message
                }
            });
        }
    };

    onDeleteHandler = async id => {
        this.props.clearDepartmentSuccessErrorMessagesFromStore();
        let deleteRequestDTO = {...this.state.deleteRequestDTO};
        deleteRequestDTO['id'] = id;
        await this.setState({
            deleteRequestDTO: deleteRequestDTO,
            deleteModalShow: true
        })
    };

    onSubmitDeleteHandler = async () => {
        try {
            await this.props.deleteDepartment(
                DELETE_DEPARTMENT,
                this.state.deleteRequestDTO
            );
            await this.setState({
                deleteModalShow: false,
                deleteRequestDTO: {id: 0, remarks: '', status: 'D'},
                showAlert: true,
                alertMessageInfo: {
                    variant: "success",
                    message: this.props.DepartmentDeleteReducer.deleteSuccessMessage ? this.props.DepartmentDeleteReducer.deleteSuccessMessage
                        : 'Deleted department successfully.'

                }
            });
            await this.searchDepartments();

        } catch (e) {
            this.setState({
                deleteModalShow: true,
            });
        }
    };

    deleteRemarksHandler = event => {
        const {name, value} = event.target;
        let deleteRequest = {...this.state.deleteRequestDTO};
        deleteRequest[name] = value;
        this.setState({
            deleteRequestDTO: deleteRequest
        })
    };


    logoutUser = async () => {
        try {
            let logoutResponse = await this.props.logoutUser('/cogent/logout');
            if (logoutResponse) {
                this.props.history.push('/');
            }
        } catch (e) {
        }
    };

    automaticLogoutUser = () => {
        setTimeout(() => this.logoutUser(), 10000)
    };

    checkIfEditedOwnDepartmentAndShowMessage = editedDepartmentId => {
        let variantType = '', message = '';
        let loggedInAdminInfo = JSON.parse(localStorage.getItem("adminInfo"));
        if (loggedInAdminInfo && editedDepartmentId === loggedInAdminInfo.departmentId) {
            variantType = "warning";
            message = "You seem to have edited your own department. Please Logout and Login to see the changes or " +
                "you'll be automatically logged out in 10s";
            this.automaticLogoutUser();
        } else {
            variantType = "success";
            message = this.props.DepartmentEditReducer.departmentSuccessMessage;
        }
        this.setState({
            showAlert: true,
            alertMessageInfo: {
                variant: variantType,
                message: message
            }
        });
    };

    handleEnter = (event) => {
        EnterKeyPressUtils.handleEnter(event);
    };

    setUpdatedValuesInState = (key, value, label, fieldValid) =>
        label ? value ?
            this.setState({
                departmentUpdateData: {
                    ...this.state.departmentUpdateData,
                    [key]: {value, label}
                }
            })
            : this.setState({
                departmentUpdateData: {
                    ...this.state.departmentUpdateData,
                    [key]: null
                }
            })
            : this.setState({
                departmentUpdateData: {
                    ...this.state.departmentUpdateData,
                    [key]: value, [key + "Valid"]: fieldValid
                }
            });

    checkFormValidity = () => {
        const {
            name,
            code,
            nameValid,
            codeValid
        } = this.state.departmentUpdateData;
        let formValidity = nameValid && name && code;

        this.setState({
            departmentUpdateData: {
                ...this.state.departmentUpdateData,
                formValid: formValidity
            }
        })
    };

    handleUpdateFormChange = async (event, fieldValid) => {
        if (event) {
            let fieldName = event.target.name;
            let value = event.target.value;
            let label = event.target.label;
            value = fieldName === 'code' ? value.toUpperCase() : value;
            await this.setUpdatedValuesInState(fieldName, value, label, fieldValid);
            this.checkFormValidity();
        }
    };

    downloadEXCEL = async () => {
        try {
            let response = await this.props.downloadExcelForDepartments(EXPORT_DEPARTMENT_EXCEL);
            FileExportUtils.exportEXCEL(response.data, "departments");
        } catch (e) {

        }
    };

    fetchHospitals = async () => {
        await this.props.fetchActiveHospitalsForDropdown(FETCH_HOSPITALS_FOR_DROPDOWN);
    };

    componentDidMount() {
        this.searchDepartments();
        this.fetchHospitals();
    }

    render() {

        const {departmentUpdateData} = this.state;
        const {
            isSearchLoading,
            departmentList,
            searchErrorMessage
        } = this.props.DepartmentListReducer;

        const {departmentPreviewData, departmentPreviewErrorMessage} = this.props.DepartmentPreviewReducer;

        const {departmentErrorMessage} = this.props.DepartmentEditReducer;

        const {deleteErrorMessage} = this.props.DepartmentDeleteReducer;

        const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;

        return <>
        <div className="department-setup">
            <div className="">
                <DepartmentSetupSearchFilter
                    searchParameters={this.state.searchParameters}
                    hospitalList={hospitalsForDropdown}
                    onInputChange={this.handleSearchFormChange}
                    onSearchClick={() => this.searchDepartments(1)}
                    resetSearchForm={this.handleSearchFormReset}
                />
            </div>
            <div className=" mb-2">
                <DepartmentDetailsDataTable
                    filteredActions={this.props.filteredAction}
                    showDepartmentModal={this.state.showDepartmentModal}
                    isSearchLoading={isSearchLoading}
                    searchData={this.appendSNToTable(departmentList)}
                    searchErrorMessage={searchErrorMessage}
                    setShowModal={this.setShowModal}
                    onDeleteHandler={this.onDeleteHandler}
                    onEditHandler={this.onEditHandler}
                    onPreviewHandler={this.onPreviewHandler}
                    departmentPreviewData={departmentPreviewData}
                    departmentPreviewErrorMessage={departmentPreviewErrorMessage}
                    totalItems={this.state.totalRecords}
                    maxSize={this.state.queryParams.size}
                    currentPage={this.state.queryParams.page}
                    handlePageChange={this.handlePageChange}
                    deleteModalShow={this.state.deleteModalShow}
                    onSubmitDelete={this.onSubmitDeleteHandler}
                    remarksHandler={this.deleteRemarksHandler}
                    remarks={this.state.deleteRequestDTO.remarks}
                    deleteErrorMsg={deleteErrorMessage}
                    exportExcel={this.downloadEXCEL}
                />
            </div>
            {this.state.showEditModal && (
                <DepartmentEditForm
                    showModal={this.state.showEditModal}
                    setShowModal={this.setShowModal}
                    onEnterKeyPress={this.handleEnter}
                    departmentData={this.state.departmentUpdateData}
                    hospitalList={hospitalsForDropdown}
                    onInputChange={this.handleUpdateFormChange}
                    editApiCall={this.editDepartment}
                    formValid={departmentUpdateData.formValid}
                    errorMessageForDepartmentName={departmentUpdateData.errorMessageForDepartmentName}
                    errorMessageForDepartmentCode={departmentUpdateData.errorMessageForDepartmentCode}
                    errorMessage={departmentErrorMessage}
                />
            )}
            <CAlert id="profile-add"
                    variant={this.state.alertMessageInfo.variant}
                    show={this.state.showAlert}
                    onClose={this.closeAlert}
                    alertType={this.state.alertMessageInfo.variant === "success" ?
                        <><i className="fa fa-check-circle" aria-hidden="true"> </i></>
                        : <><i className="fa fa-exclamation-triangle" aria-hidden="true"> </i>
                        </>}
                    message={this.state.alertMessageInfo.message}
            />
            </div>
        </>;
    }
}

export default ConnectHoc(
    DepartmentManage,
    [
        'DepartmentListReducer',
        'DepartmentPreviewReducer',
        'DepartmentSetupReducer',
        'DepartmentDeleteReducer',
        'DepartmentEditReducer',
        'HospitalDropdownReducer'
    ],
    {
        fetchDepartmentList,
        previewDepartment,
        editDepartment,
        deleteDepartment,
        downloadExcelForDepartments,
        clearDepartmentSuccessErrorMessagesFromStore,
        logoutUser,
        fetchActiveHospitalsForDropdown

    });
