import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {CountryMiddleware, UniversitySetupMiddleware} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants';
import {EnterKeyPressUtils} from "@frontend-appointment/helpers";
import {CAlert} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';
import {ConfirmDelete, CRemarksModal} from "@frontend-appointment/ui-components";

const {
    clearSuccessErrorMessageFormStore,
    deleteUniversity,
    editUniversity,
    fetchActiveUniversityForDropdown,
    saveUniversity,
    searchUniversity
} = UniversitySetupMiddleware;

const {fetchCountryForDropdown} = CountryMiddleware;

const {
    FETCH_UNIVERSITY_FOR_DROPDOWN,
    DELETE_UNIVERSITY,
    EDIT_UNIVERSITY,
    FETCH_UNIVERSITY_DETAILS_BY_ID,
    SAVE_UNIVERSITY,
    SEARCH_UNIVERSITY
} = AdminModuleAPIConstants.universitySetupApiConstants;

const {FETCH_COUNTRY_FOR_DROPDOWN} = AdminModuleAPIConstants.countryApiConstants;

const UniversitySetupHOC = (ComposedComponent, props) => {
    class UniversitySetupHOC extends PureComponent {

        state = {
            id: '',
            address: "",
            countryName: null,
            name: "",
            status: "Y",
            remarks: "",
            formValid: false,
            searchParameters: {
                country: null,
                university: null,
                status: {value: 'A', label: 'All'},
            },
            queryParams: {
                page: 0,
                size: 10
            },
            totalRecords: 0,
            showAlert: false,
            alertMessageInfo: {
                variant: "",
                message: ""
            },
            showEditRemarksModal: false,
            showDeleteModal: false,
            showPreviewModal: true
        };

        alertTimer = '';

        defaultUniversityData = {
            id: '',
            name: '',
            status: {label: 'Active', value: 'Y'},
            address: '',
            countryName: '',
            remarks: '',
            isNew: true
        };

        actionsOnOperationComplete = () => {
            this.resetUniversityData();
            this.searchUniversities();
        };

        // checkFormValidity = () => {
        //     const {name, address, country, status} = this.state;
        //     let formValid = name && status && address && country && country.value;
        //     this.setState({
        //         formValid: Boolean(formValid)
        //     })
        // };

        clearAlertTimeout = () => {
            this.alertTimer = setTimeout(() => this.closeAlert(), 5000)
        };

        closeAlert = () => {
            this.setState({
                showAlert: false
            });
        };

        closeModal = () => {
            this.setState({
                showEditRemarksModal: false,
                showDeleteModal: false
            });
            this.props.clearSuccessErrorMessageFormStore();
        };

        deleteUniversitySetup = async () => {
            const {id, remarks} = this.state;
            let deleteRequestDTO = {
                id: id,
                remarks,
                status: 'D'
            };
            try {
                const response = await this.props.deleteUniversity(DELETE_UNIVERSITY, deleteRequestDTO);
                this.showAlertMessage("success", this.props.UniversityDeleteReducer.deleteSuccessMessage);
                this.closeModal();
                this.actionsOnOperationComplete();
            } catch (e) {

            }
        };

        editUniversitySetup = async () => {
            const {id, name, address, countryName, status, remarks} = this.state;
            let requestDTO = {
                id,
                name: name,
                address: address,
                countryId: countryName && countryName.value,
                status: status && status.value,
                remarks
            };
            try {
                const response = await this.props.editUniversity(EDIT_UNIVERSITY, requestDTO);
                this.showAlertMessage("success", this.props.UniversityEditReducer.editSuccessMessage);
                this.closeModal();
                this.actionsOnOperationComplete();
                return true;
            } catch (e) {
                this.setDefaultValues(name, address, countryName, status, id);
                return false;
            }
        };

        fetchUniversityListForDropDown = async () => {
            await this.props.fetchActiveUniversityForDropdown(FETCH_UNIVERSITY_FOR_DROPDOWN);
        };

        fetchCountryListForDropDown = async () => {
            await this.props.fetchCountryForDropdown(FETCH_COUNTRY_FOR_DROPDOWN);
        };

        handleEnter = (event) => {
            EnterKeyPressUtils.handleEnter(event);
        };

        handleInputChange = async (event, fType) => {
            let key = event.target.name;
            let value = event.target.value;
            let label = event.target.label;

            if (fType === 'SEARCH') {
                label ? value ?
                    this.setState({
                        searchParameters: {
                            ...this.state.searchParameters,
                            [key]: {value, label}
                        }
                    })
                    : this.setState({
                        searchParameters: {
                            ...this.state.searchParameters,
                            [key]: null
                        }
                    })
                    : this.setState({
                        searchParameters: {
                            ...this.state.searchParameters,
                            [key]: value
                            // , [key + "Valid"]: fieldValid
                        }
                    })
            } else {
                label ? (
                        value ?
                            await this.setState({
                                [key]: {value, label}
                            })
                            : await this.setState({
                                [key]: null
                            })
                    )
                    : await this.setState({
                        [key]: value
                        // , [key + "Valid"]: fieldValid
                    });
            }
        };

        handleResetSearchForm = async () => {
            await this.setState({
                searchParameters: {
                    ...this.state.searchParameters,
                    country: null,
                    university: null,
                    status: {value: 'A', label: 'All'},
                }
            });
            this.searchUniversities(1);
        };

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            });
            await this.searchUniversities();
        };

        handleCancel = () => {
            this.resetUniversityData();
        };

        handleEdit = async (editData) => {
            let country = {
                    value: '',
                    label: editData.countryName
                },
                status = {
                    value: editData.status,
                    label: editData.status === 'Y' ? 'Active' : 'Inactive'
                };
            this.setDefaultValues(editData.name, editData.address, country, status, editData.id)
        };

        handleOpenEditRemarksModal = (updateData) => {
            const {id, name, address, countryName, status} = updateData.data;

            // UPDATE THE DEFAULT VALUES WITH CURRENTLY UPDATED DATA.....
            // WILL BE USED IN CASE REMARKS MODAL IS CLOSED
            this.setDefaultValues(name, address, countryName, status, id);

            if (!name || !status || !address || !countryName) {
                this.validateUniversityData(name, address, countryName, status);
            } else {
                // IF ALL DATA IS VALID, SAVE THEM IN STATE FOR UPDATE AND OTHER PURPOSES
                this.setState({
                    showEditRemarksModal: true,
                    id: id,
                    name: name,
                    address: address,
                    countryName: countryName,
                    status: status
                })
            }
        };

        handleDelete = async (deleteData) => {
            this.setState({
                id: deleteData.id,
                showDeleteModal: true
            })
        };

        handlePreview = (previewData)=>{

        };

        initialApiCalls = async () => {
            await this.fetchUniversityListForDropDown();
            await this.fetchCountryListForDropDown();
            await this.searchUniversities();
        };

        resetUniversityData = () => {
            this.defaultUniversityData.id = '';
            this.defaultUniversityData.name = '';
            this.defaultUniversityData.status = '';
            this.defaultUniversityData.address = '';
            this.defaultUniversityData.countryName = '';
            this.defaultUniversityData.remarks = '';
            this.defaultUniversityData.isNew = true;

            // FOR EDIT
            this.setState({
                address: "",
                countryName: null,
                name: "",
                status: "Y",
                remarks: "",
            })
        };

        saveUniversitySetup = async (saveData) => {
            const {name, address, countryName, status} = saveData.data;

            this.setDefaultValues(name, address, countryName, status, '');

            if (!name || !status || !address || !countryName) {
                this.validateUniversityData(name, address, countryName, status);
            } else {
                let requestDTO = {
                    name: name,
                    address: address,
                    countryId: countryName && countryName.value,
                    status: status && status.value
                };
                try {
                    const response = await this.props.saveUniversity(SAVE_UNIVERSITY, requestDTO);
                    this.showAlertMessage("success", this.props.UniversitySaveReducer.saveSuccessMessage);
                    this.actionsOnOperationComplete();
                    return true;
                } catch (e) {
                    this.showAlertMessage("danger", this.props.UniversitySaveReducer.saveErrorMessage);
                    return false;
                }
            }
        };

        searchUniversities = async (page) => {
            const {searchParameters, queryParams} = this.state;
            const {country, university, status} = searchParameters;
            let requestDTO = {
                countryId: country ? country.value : '',
                universityId: university ? university.value : '',
                status: status && status.value !== 'A' ? status.value : ''
            };

            let updatedPage =
                queryParams.page === 0 ? 1 : (page ? page : queryParams.page);

            try {
                await this.props.searchUniversity(
                    SEARCH_UNIVERSITY,
                    requestDTO,
                    {
                        page: updatedPage,
                        size: queryParams.size
                    });
                await this.setState({
                    totalRecords: this.props.UniversitySearchReducer.universityList.length
                        ? this.props.UniversitySearchReducer.universityList[0].totalItems
                        : 0,
                    queryParams: {
                        ...queryParams,
                        page: updatedPage
                    },
                })
            } catch (e) {

            }

        };

        setDefaultValues = (name, address, countryName, status, id) => {
            this.defaultUniversityData.name = name;
            this.defaultUniversityData.address = address;
            this.defaultUniversityData.countryName = countryName;
            this.defaultUniversityData.status = status;
            this.defaultUniversityData.id = id;
        };

        showAlertMessage = (type, message) => {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: type,
                    message: message
                }
            });
            this.clearAlertTimeout();
        };

        validateUniversityData = (name, address, countryName, status) => {
            if (!name && !address && !countryName && !status)
                this.showAlertMessage("warning", "Name, Address, Country and Status must be not empty.");
            else if (!name && !address && !countryName)
                this.showAlertMessage("warning", "Name, Address and Country should not  be empty.");
            else if (!name)
                this.showAlertMessage("warning", "Name should not  be empty.");
            else if (!address)
                this.showAlertMessage("warning", "Address should not  be empty.");
            else if (!countryName)
                this.showAlertMessage("warning", "Country should not  be empty.");
            else if (!status)
                this.showAlertMessage("warning", "Status should not  be empty.")
        };

        componentDidMount() {
            this.initialApiCalls();
        }

        componentWillUnmount() {
            clearTimeout(this.alertTimer);
        }


        render() {

            const {
                searchParameters, queryParams, totalRecords,
                formValid,
                alertMessageInfo, showAlert,
                showEditRemarksModal, remarks, showDeleteModal,
                showPreviewModal
            } = this.state;

            const {
                isCountryDropdownPending,
                countryList,
                countryDropdownMessage
            } = this.props.CountryDropdownReducer;

            const {isFetchUniversityLoading, activeUniversityForDropdown, dropdownErrorMessage}
                = this.props.UniversityDropdownReducer;

            const {universityList, isSearchUniversityLoading, searchErrorMessage} = this.props.UniversitySearchReducer;

            const {editErrorMessage, editSuccessMessage, isEditUniversityLoading} = this.props.UniversityEditReducer;

            const {deleteErrorMessage, deleteSuccessMessage, isDeleteUniversityLoading} = this.props.UniversityDeleteReducer;

            return <>
                <>
                    <ComposedComponent
                        {...props}
                        searchParams={{
                            countryList,
                            countryDropdownErrorMessage: countryDropdownMessage,
                            searchParameters,
                            universityList: activeUniversityForDropdown,
                            universityDropdownErrorMessage: dropdownErrorMessage,
                            isCountryDropdownPending,
                            isFetchUniversityLoading,
                            onInputChange: this.handleInputChange,
                            resetSearchForm: this.handleResetSearchForm,
                            handleEnter: this.handleEnter,
                            onSearchClick: this.searchUniversities
                        }}
                        tableData={{
                            universityList,
                            isSearchUniversityLoading,
                            searchErrorMessage,
                            currentPage: queryParams.page,
                            maxSize: queryParams.size,
                            totalItems: totalRecords,
                            handlePageChange: this.handlePageChange,
                            universityData: this.defaultUniversityData,
                            formValid: formValid,
                            countryList,
                            handleSave: this.saveUniversitySetup,
                            handleCancel: this.handleCancel,
                            handleEdit: this.handleEdit,
                            handleUpdate: this.handleOpenEditRemarksModal,
                            handleDelete: this.handleDelete,
                            handlePreview:this.handlePreview
                        }}
                    />
                    <CAlert
                        id="profile-manage"
                        variant={alertMessageInfo.variant}
                        show={showAlert}
                        onClose={this.closeAlert}
                        alertType={alertMessageInfo.variant === "success" ? <><Material.MdDone/>
                        </> : <><i className="fa fa-exclamation-triangle" aria-hidden="true"/>
                        </>}
                        message={alertMessageInfo.message}
                    />
                    {showEditRemarksModal ?
                        <CRemarksModal
                            confirmationMessage="Provide remarks for edit."
                            modalHeader="Edit University"
                            showModal={showEditRemarksModal}
                            onCancel={this.closeModal}
                            onRemarksChangeHandler={this.handleInputChange}
                            remarks={remarks}
                            onPrimaryAction={this.editUniversitySetup}
                            primaryActionName={isEditUniversityLoading ? "Confirming" : "Confirm"}
                            actionDisabled={isEditUniversityLoading}
                            errorMessage={editErrorMessage}
                        />
                        : ''
                    }
                    {showDeleteModal ?
                        <ConfirmDelete
                            confirmationMessage="Are you sure you want to delete the University? If yes please provide remarks."
                            modalHeader="Delete University"
                            showModal={showDeleteModal}
                            isLoading={isDeleteUniversityLoading}
                            setShowModal={this.closeModal}
                            onDeleteRemarksChangeHandler={this.handleInputChange}
                            remarks={remarks}
                            onSubmitDelete={this.deleteUniversitySetup}
                            deleteErrorMessage={deleteErrorMessage}
                        />
                        : ''
                    }
                    {showPreviewModal}
                </>
            </>
        }
    }

    return ConnectHoc(UniversitySetupHOC,
        [
            'UniversitySaveReducer',
            'UniversityEditReducer',
            'UniversityDeleteReducer',
            'UniversitySearchReducer',
            'UniversityPreviewReducer',
            'UniversityDropdownReducer',
            'CountryDropdownReducer'
        ],
        {
            clearSuccessErrorMessageFormStore,
            deleteUniversity,
            editUniversity,
            fetchActiveUniversityForDropdown,
            saveUniversity,
            searchUniversity,
            fetchCountryForDropdown
        });
};

export default UniversitySetupHOC;
