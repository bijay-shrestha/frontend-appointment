import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {HospitalSetupMiddleware, logoutUser, UnitSetupMiddleware} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants';
import UnitDetailsDataTable from "./UnitDetailsDataTable";
import UnitEditForm from "./UnitEditModal";
import {CAlert} from "@frontend-appointment/ui-elements";
import {
    EnterKeyPressUtils,
    FileExportUtils,
    LocalStorageSecurity,
    TryCatchHandler
} from "@frontend-appointment/helpers";
import "../unit-setup.scss";
import UnitSetupSearchFilter from "./UnitSetupSearchFilter";

const {
    fetchDepartmentList,
    previewDepartment,
    editDepartment,
    deleteDepartment,
    downloadExcelForDepartments,
    clearDepartmentSuccessErrorMessagesFromStore,
    fetchActiveDepartmentsForDropdown,
    fetchActiveDepartmentsByHospitalId
} = UnitSetupMiddleware;

const {
    SEARCH_UNIT,
    FETCH_UNIT_DETAILS,
    EDIT_UNIT,
    DELETE_UNIT,
    EXPORT_UNIT_EXCEL,
    //FETCH_UNIT_FOR_DROPDOWN,
    FETCH_UNITS_FOR_DROPDOWN_BY_HOSPITAL
} = AdminModuleAPIConstants.departmentSetupAPIConstants;

const {FETCH_HOSPITALS_FOR_DROPDOWN} = AdminModuleAPIConstants.hospitalSetupApiConstants;

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;

class UnitManage extends PureComponent {
    state = {
        showDepartmentModal: false,
        showEditModal: false,
        deleteModalShow: false,
        searchParameters: {
            departmentId: '',
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
            errorMessageForDepartmentName: "Unit Name should not contain special characters",
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
            if (fieldName === "hospital") {
                this.fetchDepartments(value);
            }
        }
    };

    handleSearchFormReset = async () => {
        await this.setState({
            searchParameters: {
                ...this.state.searchParameters,
                departmentId: '',
                departmentCode: '',
                hospital: '',
                status: {value: 'A', label: 'All'}
            },
        });
        this.searchDepartments();
    };

    searchDepartments = async (page) => {
        const {departmentId, departmentCode, status, hospital} = this.state.searchParameters;
        let searchData = {
            id: departmentId ? departmentId.value : '',
            departmentCode: departmentCode,
            hospitalId: hospital ? hospital.value : '',
            status: status && status.value !== 'A'
                ? status.value
                : ''
        };

        let updatedPage =
            this.state.queryParams.page === 0 ? 1 : (page ? page : this.state.queryParams.page);
        await this.props.fetchDepartmentList(
            SEARCH_UNIT,
            {
                page: updatedPage,
                size: this.state.queryParams.size
            },
            searchData
        );

        await this.setState({
            totalRecords: this.props.UnitListReducer.departmentList.length
                ? this.props.UnitListReducer.departmentList[0].totalItems
                : 0,
            queryParams: {
                ...this.state.queryParams,
                page: updatedPage
            }
        })
    };

    appendSNToTable = departmentList =>
        departmentList.map((prof, index) => ({
            ...prof, sN: index + 1
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
        await this.props.previewDepartment(FETCH_UNIT_DETAILS, id);
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
                    message: this.props.UnitPreviewReducer.departmentPreviewErrorMessage
                    // e.errorMessage ? e.errorMessage: e.message
                }
            })
        }
    };

    onEditHandler = async id => {
        try {
            await this.previewApiCall(id);
            const {name, departmentCode, status, hospitalId, hospitalName} = this.props.UnitPreviewReducer.departmentPreviewData;
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
            await this.props.editDepartment(EDIT_UNIT, departmentUpdateRequestDTO);
            this.resetDepartmentUpdateDataFromState();
            this.checkIfEditedOwnDepartmentAndShowMessage(departmentUpdateRequestDTO.id);
            await this.searchDepartments();
        } catch (e) {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "danger",
                    message: this.props.UnitEditReducer.departmentErrorMessage
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
                DELETE_UNIT,
                this.state.deleteRequestDTO
            );
            await this.setState({
                deleteModalShow: false,
                deleteRequestDTO: {id: 0, remarks: '', status: 'D'},
                showAlert: true,
                alertMessageInfo: {
                    variant: "success",
                    message: this.props.UnitDeleteReducer.deleteSuccessMessage ? this.props.UnitDeleteReducer.deleteSuccessMessage
                        : 'Deleted Unit successfully.'

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
        let loggedInAdminInfo = LocalStorageSecurity.localStorageDecoder("adminInfo");
        if (loggedInAdminInfo && editedDepartmentId === loggedInAdminInfo.departmentId) {
            variantType = "warning";
            message = "You seem to have edited your own Unit. Please Logout and Login to see the changes or " +
                "you'll be automatically logged out in 10s";
            this.automaticLogoutUser();
        } else {
            variantType = "success";
            message = this.props.UnitEditReducer.departmentSuccessMessage;
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
            nameValid
            //  codeValid
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
            let response = await this.props.downloadExcelForDepartments(EXPORT_UNIT_EXCEL);
            FileExportUtils.exportEXCEL(response.data, "units");
        } catch (e) {

        }
    };

    fetchHospitals = async () => {
        await this.props.fetchActiveHospitalsForDropdown(FETCH_HOSPITALS_FOR_DROPDOWN);
    };


    fetchDepartments = async (id) => {
        await TryCatchHandler.genericTryCatch(this.props.fetchActiveDepartmentsByHospitalId(FETCH_UNITS_FOR_DROPDOWN_BY_HOSPITAL, id));
    };

    componentDidMount() {
        // this.fetchDepartments();
        this.searchDepartments();
        this.fetchHospitals();
    }

    render() {

        const {departmentUpdateData} = this.state;
        const {
            isSearchLoading,
            departmentList,
            searchErrorMessage
        } = this.props.UnitListReducer;

        const {departmentPreviewData, departmentPreviewErrorMessage} = this.props.UnitPreviewReducer;

        const {departmentErrorMessage, isDepartmentEditLoading} = this.props.UnitEditReducer;

        const {deleteErrorMessage, isDeleteLoading} = this.props.UnitDeleteReducer;

        const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;

        const {departmentsByHospital} = this.props.UnitSetupReducer;

        return <>
            <div className="department-setup">
                <div className="">
                    <UnitSetupSearchFilter
                        searchParameters={this.state.searchParameters}
                        hospitalList={hospitalsForDropdown}
                        departments={departmentsByHospital}
                        onInputChange={this.handleSearchFormChange}
                        onSearchClick={() => this.searchDepartments(1)}
                        resetSearchForm={this.handleSearchFormReset}
                    />
                </div>
                <div className=" mb-2">
                    <UnitDetailsDataTable
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
                        isDeleteLoading={isDeleteLoading}
                    />
                </div>
                {this.state.showEditModal && (
                    <UnitEditForm
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
                        isDepartmentEditLoading={isDepartmentEditLoading}
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
    UnitManage,
    [
        'UnitListReducer',
        'UnitPreviewReducer',
        'UnitSetupReducer',
        'UnitDeleteReducer',
        'UnitEditReducer',
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
        fetchActiveHospitalsForDropdown,
        fetchActiveDepartmentsForDropdown,
        fetchActiveDepartmentsByHospitalId
    });
