import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    DoctorMiddleware,
    QualificationSetupMiddleware,
    HospitalSetupMiddleware,
    SpecializationSetupMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
    EnterKeyPressUtils,
    FileExportUtils,
    AdminInfoUtils
} from '@frontend-appointment/helpers'
import './DoctorHoc.scss'

const {
    clearConsultantCreateMessage,
    createConsultant,
    deleteConsultant,
    editConsultant,
    previewConsultant,
    searchConsultant,
    // fetchActiveDoctorsForDropdown,
    fetchActiveDoctorsHospitalWiseForDropdown,
    downloadExcelForConsultants
} = DoctorMiddleware
const {fetchActiveQualificationsForDropdown} = QualificationSetupMiddleware
const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware
const {
    fetchSpecializationHospitalWiseForDropdown
} = SpecializationSetupMiddleware
const DoctorHOC = (ComposedComponent, props, type) => {
    const {
        doctorSetupApiConstants,
        qualificationSetupApiConstants,
        specializationSetupAPIConstants,
        hospitalSetupApiConstants
    } = AdminModuleAPIConstants

    class DoctorSetup extends React.PureComponent {
        state = {
            consultantData: {
                id: '',
                name: '',
                email: '',
                status: 'Y',
                hospitalId: '',
                editHospitalId: '',
                genderCode: '',
                contactNumber: '',
                specializationIds: [],
                qualificationIds: [],
                appointmentCharge: '',
                nmcNumber: '',
                remarks: '',
                selectedSpecializations: [],
                newSpecializationList: [],
                newQualificationList: [],
                doctorAvatar: null,
                doctorAvatarUrl: ''
            },
            formValid: false,
            nameValid: false,
            contactValid: false,
            appointmentChargeValid: false,
            errorMessageForAppointmentCharge:
                'Appointment Charge Should only be number and upto 2 decimal',
            emailValid: false,
            logoValid: false,
            showConfirmModal: false,
            errorMessageForDoctorName:
                'Doctor Name should not contain special characters',
            errorMessageForDoctorPhoneNumber:
                'Phone Number should only be 10 digit numbers',
            showAlert: false,
            alertMessageInfo: {
                variant: '',
                message: ''
            },
            showDoctorModal: false,
            showEditModal: false,
            deleteModalShow: false,
            searchParameters: {
                code: '',
                mobileNumber: '',
                name: '',
                specializationId: '',
                hospitalId: '',
                status: {value: '', label: 'All'}
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
            doctorImage: '',
            doctorImageCroppedUrl: '',
            doctorFileCropped: '',
            showImageUploadModal: false
        }

        handleEnterPress = event => {
            EnterKeyPressUtils.handleEnter(event)
        }

        setShowModal = () => {
            this.setState({
                showDoctorModal: false,
                deleteModalShow: false,
                showEditModal: false
            })
        }

        resetConsultantStateValues = () => {
            this.setState({
                consultantData: {
                    id: '',
                    name: '',
                    email: '',
                    status: 'Y',
                    hospitalId: '',
                    genderCode: '',
                    contactNumber: '',
                    specializationIds: [],
                    qualificationIds: [],
                    editHospitalId: '',
                    selectedSpecializations: [],
                    newSpecializationList: [],
                    newQualificationList: [],
                    appointmentCharge: '',
                    nmcNumber: '',
                    remarks: '',
                    doctorAvatar: null,
                    doctorAvatarUrl: ''
                },
                doctorImage: '',
                doctorImageCroppedUrl: '',
                doctorFileCropped: '',
                formValid: false,
                nameValid: false,
                contactValid: false,
                emailValid: false,
                appointmentChargeValid: false,
                logoValid: false,
                showEditModal: false
            })
        }

        checkInputValidity = (fieldName, valueToChange, valid, eventName) => {
            let stateObj = {[fieldName]: valueToChange}
            if (eventName) {
                if (eventName === 'name') stateObj = {...stateObj, nameValid: valid}
                if (eventName === 'contactNumber')
                    stateObj = {...stateObj, contactValid: valid}
                if (eventName === 'appointmentCharge')
                    stateObj = {...stateObj, appointmentChargeValid: valid}
                if (eventName === 'email') stateObj = {...stateObj, emailValid: valid}
            }
            return {...stateObj}
        }

        setTheState = async (fieldName, valueToChange, valid, eventName) => {
            await this.setState(
                this.checkInputValidity(fieldName, valueToChange, valid, eventName)
            )
        }

        closeAlert = () => {
            this.props.clearConsultantCreateMessage()
            this.setState({
                showAlert: !this.state.showAlert,
                alertMessageInfo: ''
            })
        }

        checkFormValidity = eventType => {
            const {
                consultantData,
                nameValid,
                contactValid,
                emailValid,
                appointmentChargeValid
            } = this.state
            let formValidity =
                nameValid &&
                contactValid &&
                appointmentChargeValid &&
                consultantData.appointmentCharge &&
                consultantData.status &&
                consultantData.contactNumber &&
                // consultantData.doctorAvatar &&
                consultantData.hospitalId &&
                consultantData.specializationIds.length &&
                consultantData.qualificationIds.length &&
                consultantData.genderCode &&
                consultantData.email &&
                consultantData.nmcNumber
                // consultantData.doctorAvatar

            if (eventType === 'E')
                formValidity = formValidity && consultantData.remarks
            //else formValidity = formValidity && hospitalData.contactNumber.length
            this.setState({
                formValid: formValidity ? true : false
            })
        }

        callSpecialization = async id => {
            try {
                await this.props.fetchSpecializationHospitalWiseForDropdown(
                    specializationSetupAPIConstants.SPECIFIC_DROPDOWN_SPECIALIZATION_BY_HOSPITAL,
                    id
                )
            } catch (e) {
                console.log(e)
            }
        }

        callSpecializationApi = (name, id, value) => {
            let consultantData = {...this.state.consultantData}
            let dataToSend
            let searchParams = {...this.state.searchParameters}
            if (name === 'hospitalId') {
                this.callSpecialization(value ? value : id)
                consultantData.specializationIds = []
                searchParams.name = ''
                searchParams.specializationId = ''
            }
            if (id) dataToSend = searchParams
            else dataToSend = consultantData
            return dataToSend
        }

        handleOnChange = (event, fieldValid, eventType) => {
            let name, value, label, select, values
            values = event.target.values
            name = event.target.name
            value = event.target.value
            label = event.target.label
            let consultant = this.callSpecializationApi(name, null, value)
            if (values) {
                value = values
                label = values
                select = values
            } else {
                select = {value: value, label: label}
            }
            value = name === 'nmcNumber' ? value.toUpperCase() : value
            consultant[name] = !label ? value : value ? select : {value: null}
            this.setTheState('consultantData', consultant, fieldValid, name)
            this.checkFormValidity(eventType)
        }

        setShowConfirmModal = () => {
            this.setState({showConfirmModal: !this.state.showConfirmModal})
        }

        getOnlyValueFromMultipleSelectList = data => data.map(datum => datum.value)

        handleConfirmClick = async () => {
            const {
                name,
                status,
                contactNumber,
                doctorAvatar,
                specializationIds,
                nmcNumber,
                appointmentCharge,
                hospitalId,
                email,
                genderCode,
                qualificationIds
            } = this.state.consultantData
            let formData = new FormData()
            formData.append(
                'avatar',
                new File([doctorAvatar], name.concat('-picture.jpeg'))
            )
            try {
                await this.props.createConsultant(
                    doctorSetupApiConstants.CREATE_DOCTOR,
                    {
                        name,
                        status,
                        mobileNumber: contactNumber,
                        specializationIds: this.getOnlyValueFromMultipleSelectList(
                            specializationIds
                        ),
                        nmcNumber,
                        appointmentCharge,
                        hospitalId: hospitalId.value,
                        email,
                        genderCode,
                        qualificationIds: this.getOnlyValueFromMultipleSelectList(
                            qualificationIds
                        )
                    },
                    formData
                )

                await this.setShowConfirmModal()
                this.resetConsultantStateValues()
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.DoctorSaveReducer.createConsultantsuccessMessage
                    }
                })
            } catch (e) {
                await this.setShowConfirmModal()
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: e.errorMessage ? e.errorMessage : e.message
                    }
                })
            }
        }

        previewApiCall = async id => {
            await this.props.previewConsultant(
                doctorSetupApiConstants.FETCH_DOCTOR,
                id
            )
        }

        onPreviewHandler = async id => {
            try {
                await this.previewApiCall(id)
                this.setState({
                    showDoctorModal: true
                })
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: this.props.DoctorPreviewReducer
                            .consultantPreviewErrorMessage
                    }
                })
            }
        }

        editPreviewApiCall = async id => {
            await this.props.previewConsultant(
                doctorSetupApiConstants.FETCH_DOCTOR_DETAILS_FOR_UPDATE,
                id
            )
        }

        makeValueForMultipleSelect = (key, datas) => {
            let doctorKey = 'doctor' + key + 'Id'
            let lowerCaseKey = key[0].toLowerCase() + key.slice(1)
            return datas.map((datum, index) => {
                return {
                    [doctorKey]: datum['doctor' + key + 'Id'].toString(),
                    value: datum[lowerCaseKey + 'Id'].toString(),
                    label: datum[lowerCaseKey + 'Name'].toString(),
                    status: 'Y'
                }
            })
        }

        onEditHandler = async id => {
            this.props.clearConsultantCreateMessage()
            try {
                await this.editPreviewApiCall(id)
                const {
                    doctorId,
                    doctorName,
                    mobileNumber,
                    email,
                    gender,
                    nmcNumber,
                    status,
                    hospitalId,
                    hospitalName,
                    remarks,
                    appointmentCharge,
                    fileUri,
                    doctorSpecializationResponseDTOS,
                    doctorQualificationResponseDTOS
                } = this.props.DoctorPreviewReducer.consultantPreviewData
                let formValid = this.state.formValid
                if (remarks) formValid = true
                await this.setState({
                    showEditModal: true,
                    consultantData: {
                        id: doctorId,
                        name: doctorName,
                        status: status,
                        nmcNumber: nmcNumber,
                        contactNumber: mobileNumber,
                        hospitalId: {value: hospitalId, label: hospitalName},
                        remarks: remarks || '',
                        email: email,
                        editHospitalId: {value: hospitalId, label: hospitalName},
                        genderCode: gender.charAt(0),
                        specializationIds: [
                            ...this.makeValueForMultipleSelect(
                                'Specialization',
                                doctorSpecializationResponseDTOS
                            )
                        ],
                        selectedSpecializations: [
                            ...this.makeValueForMultipleSelect(
                                'Specialization',
                                doctorSpecializationResponseDTOS
                            )
                        ],
                        newSpecializationList: [...doctorSpecializationResponseDTOS],
                        newQualificationList: [...doctorQualificationResponseDTOS],
                        qualificationIds: [
                            ...this.makeValueForMultipleSelect(
                                'Qualification',
                                doctorQualificationResponseDTOS
                            )
                        ],
                        doctorAvatarUrl: fileUri,
                        doctorAvatar: new File([5120], fileUri),
                        appointmentCharge: appointmentCharge
                    },
                    doctorImage: new File([5120], fileUri),
                    doctorImageCroppedUrl: fileUri,
                    formValid: formValid,
                    nameValid: true,
                    appointmentChargeValid: true,
                    contactValid: true
                })
                this.callSpecialization(hospitalId)
            } catch (e) {
                console.log(e)
            }
        }

        searchDoctorForDropDown = async (name, value) => {
            let searchParams = {...this.state.searchParameters}
            if (name === 'hospitalId') {
                try {
                    await this.props.fetchActiveDoctorsHospitalWiseForDropdown(
                        doctorSetupApiConstants.FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN,
                        value
                    )
                    searchParams = await this.callSpecializationApi(name, value)
                } catch (e) {
                    console.log(e)
                }
            }
            return searchParams
        }

        searchDoctor = async page => {
            const {
                name,
                status,
                code,
                mobileNumber,
                specializationId,
                hospitalId
            } = this.state.searchParameters
            let searchData = {
                name: name.value || 0,
                code: code,
                status: status.value || '',
                mobileNumber: mobileNumber,
                hospitalId: hospitalId.value || '',
                specializationId: specializationId.value || ''
            }

            let updatedPage =
                this.state.queryParams.page === 0
                    ? 1
                    : page
                    ? page
                    : this.state.queryParams.page
            await this.props.searchConsultant(
                doctorSetupApiConstants.SEARCH_DOCTOR,
                {
                    page: updatedPage,
                    size: this.state.queryParams.size
                },
                searchData
            )

            await this.setState({
                totalRecords: this.props.DoctorSearchReducer.consultantList.length
                    ? this.props.DoctorSearchReducer.consultantList[0].totalItems
                    : 0,
                queryParams: {
                    ...this.state.queryParams,
                    page: updatedPage
                }
            })
        }

        handleImageSelect = imageUrl => {
            imageUrl && this.setState({doctorImage: imageUrl})
        }

        handleCropImage = croppedImageUrl => {
            croppedImageUrl &&
            this.setState({
                doctorImageCroppedUrl: croppedImageUrl
            })
        }

        handleImageUpload = async (croppedImageFile, eventType) => {
            let croppedImage = this.state.doctorImageCroppedUrl
            let doctorImage = {...this.state.consultantData}
            doctorImage.doctorAvatar = new File(
                [croppedImageFile],
                'doctorAvatar.jpeg'
            )
            doctorImage.doctorAvatarUrl = croppedImage
            await this.setState({
                consultantData: {...doctorImage},
                showImageUploadModal: false
            })
            this.checkFormValidity(eventType)
        }

        appendSNToTable = consultantList => {
            const newConsultantList =
                consultantList.length &&
                consultantList.map((spec, index) => ({
                    ...spec,
                    sN: index + 1,
                    name: spec.doctorName.toUpperCase()
                }))
            return newConsultantList
        }

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            })
            this.searchDoctor()
        }

        findAndMixDatas = (key, newEditData, oldData, lower) => {
            let mixedEditData = [...newEditData]
            oldData.map(old => {
                let dataId = old[lower + 'Id']
                let flag = false
                newEditData.map(newEditDatum => {
                    if (newEditDatum[key].toString() === old[key].toString())
                        flag = true
                })
                !flag && mixedEditData.push({[key]: old[key], [lower + 'Id']: dataId, status: 'N'})
            })
            return mixedEditData
        }

        makeMultipleSelectForEditResponse = (key, newData, oldData) => {
            let doctorKey = 'doctor' + key + 'Id'
            let lowerCaseKey = key[0].toLowerCase() + key.slice(1)
            let newEditData = [];
            newData.map(newDat => {
                let newDatum = {...newDat}
                newDatum = {[doctorKey]: newDatum[doctorKey] || '', [lowerCaseKey + 'Id']: newDatum.value, status: 'Y'};
                newEditData.push(newDatum);
            });
            const mixedData = this.findAndMixDatas(doctorKey, newEditData, oldData, lowerCaseKey);
            console.log(mixedData)
            return mixedData;

        }
        editDoctor = async () => {
            const {
                id,
                name,
                status,
                nmcNumber,
                contactNumber,
                hospitalId,
                remarks,
                email,
                genderCode,
                specializationIds,
                newSpecializationList,
                newQualificationList,
                qualificationIds,
                doctorAvatar,
                appointmentCharge
            } = this.state.consultantData
            let formData = new FormData()
            formData.append(
                'avatar',
                new File([doctorAvatar], name.concat('-picture.jpeg'))
            )
            try {
                await this.props.editConsultant(
                    doctorSetupApiConstants.EDIT_DOCTOR,
                    {
                        doctorInfo: {
                            name,
                            status,
                            nmcNumber,
                            hospitalId: hospitalId.value,
                            mobileNumber: contactNumber,
                            genderCode,
                            appointmentCharge,
                            remarks,
                            email,
                            id
                        },
                        doctorQualificationInfo: this.makeMultipleSelectForEditResponse('Qualification', qualificationIds, newQualificationList),
                        doctorSpecializationInfo: this.makeMultipleSelectForEditResponse('Specialization', specializationIds, newSpecializationList),

                    },
                    formData
                )
                this.resetConsultantStateValues()
                this.setShowModal();
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.DoctorEditReducer.consultantEditSuccessMessage
                    }
                })
                await this.searchDoctor()
            } catch (e) {
            }
        }

        onDeleteHandler = async id => {
            this.props.clearConsultantCreateMessage()
            let deleteRequestDTO = {...this.state.deleteRequestDTO}
            deleteRequestDTO['id'] = id
            await this.setState({
                deleteRequestDTO: deleteRequestDTO,
                deleteModalShow: true
            })
        }

        deleteRemarksHandler = event => {
            const {name, value} = event.target
            let deleteRequest = {...this.state.deleteRequestDTO}
            deleteRequest[name] = value
            this.setState({
                deleteRequestDTO: deleteRequest
            })
        }

        onSubmitDeleteHandler = async () => {
            try {
                await this.props.deleteConsultant(
                    doctorSetupApiConstants.DELETE_DOCTOR,
                    this.state.deleteRequestDTO
                )
                await this.setState({
                    deleteModalShow: false,
                    deleteRequestDTO: {id: 0, remarks: '', status: 'D'},
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.DoctorDeleteReducer.deleteSuccessMessage
                    },
                    showAlert: true
                })
                await this.searchDoctor()
            } catch (e) {
                this.setState({
                    deleteModalShow: true
                })
            }
        }

        handleSearchFormReset = async () => {
            await this.setState({
                searchParameters: {
                    name: '',
                    status: {value: '', label: 'All'},
                    code: '',
                    mobileNumber: '',
                    specializationId: '',
                    hospitalId: ''
                }
            })
            this.searchDoctor()
        }

        setStateValuesForSearch = searchParams => {
            this.setState({
                searchParameters: searchParams
            })
        }

        handleSearchFormChange = async event => {
            const {name, value, label} = event.target
            let searchParams = await this.searchDoctorForDropDown(name, value)
            if (name) {
                let fieldName = name
                let val = value
                let lbl = label
                searchParams[fieldName] = label
                    ? value
                        ? {value: val, label: lbl}
                        : ''
                    : value
                await this.setStateValuesForSearch(searchParams)
            }
        }
        setFormValidManage = () => {
            this.setState({
                formValid: true
            })
        }

        async componentDidMount() {
            try {
                if (type === 'M') {
                    await this.searchDoctor()
                }

                this.props.fetchActiveQualificationsForDropdown(
                    qualificationSetupApiConstants.SPECIFIC_DROPDOWN_QUALIFICATION_ACTIVE
                )
                this.props.fetchActiveHospitalsForDropdown(
                    hospitalSetupApiConstants.FETCH_HOSPITALS_FOR_DROPDOWN
                )
            } catch (e) {
                console.log(e)
            }
        }

        setImageShowModal = () =>
            this.setState({showImageUploadModal: !this.state.showImageUploadModal})

        render() {
            const {
                consultantData,
                showAlert,
                showConfirmModal,
                formValid,
                contactValid,
                nameValid,
                errorMessageForDoctorPhoneNumber,
                errorMessageForDoctorName,
                alertMessageInfo,
                showDoctorModal,
                showEditModal,
                deleteModalShow,
                searchParameters,
                queryParams,
                deleteRequestDTO,
                totalRecords,
                doctorImage,
                doctorImageCroppedUrl,
                doctorFileCropped,
                showImageUploadModal,
                appointmentChargeValid,
                errorMessageForAppointmentCharge,
                emailValid
            } = this.state

            const {
                isSearchLoading,
                consultantList,
                searchErrorMessage
            } = this.props.DoctorSearchReducer

            const {
                consultantPreviewData,
                isPreviewLoading,
                consultantPreviewErrorMessage
            } = this.props.DoctorPreviewReducer

            const {consultantEditErrorMessage} = this.props.DoctorEditReducer

            const {deleteErrorMessage} = this.props.DoctorDeleteReducer

            const {activeDoctorsByHospitalForDropdown} = this.props.DoctorDropdownReducer

            const {
                activeSpecializationListByHospital
            } = this.props.SpecializationDropdownReducer;

            const {hospitalsForDropdown} = this.props.HospitalDropdownReducer
            const {
                qualificationsForDropdown
            } = this.props.QualificationDropdownReducer

            return (
                <ComposedComponent
                    {...this.props}
                    {...props}
                    handleEnter={this.handleEnterPress}
                    doctorData={consultantData}
                    resetStateAddValues={this.resetConsultantStateValues}
                    closeAlert={this.closeAlert}
                    showConfirmModal={showConfirmModal}
                    formValid={formValid}
                    showAlert={showAlert}
                    contactValid={contactValid}
                    nameValid={nameValid}
                    errorMessageForDoctorContact={errorMessageForDoctorPhoneNumber}
                    errorMessageForDoctorName={errorMessageForDoctorName}
                    alertMessageInfo={alertMessageInfo}
                    handleInputChange={this.handleOnChange}
                    submitAddChanges={this.handleConfirmClick}
                    setShowConfirmModal={this.setShowConfirmModal}
                    handleSearchFormChange={this.handleSearchFormChange}
                    deleteRemarksHandler={this.deleteRemarksHandler}
                    resetSearch={this.handleSearchFormReset}
                    searchDoctor={this.searchDoctor}
                    handlePageChange={this.handlePageChange}
                    onSubmitDeleteHandler={this.onSubmitDeleteHandler}
                    editDoctor={this.editDoctor}
                    onEditHandler={this.onEditHandler}
                    onDeleteHandler={this.onDeleteHandler}
                    onPreviewHandler={this.onPreviewHandler}
                    // appendSNToTable={this.appendSNToTable}
                    setShowModal={this.setShowModal}
                    showDoctorModal={showDoctorModal}
                    showEditModal={showEditModal}
                    deleteModalShow={deleteModalShow}
                    searchParameters={searchParameters}
                    queryParams={queryParams}
                    deleteRequestDTO={deleteRequestDTO}
                    totalRecords={totalRecords}
                    isSearchLoading={isSearchLoading}
                    doctorList={this.appendSNToTable(consultantList)}
                    searchErrorMessage={searchErrorMessage}
                    doctorPreviewErrorMessage={consultantPreviewErrorMessage}
                    deleteErrorMessage={deleteErrorMessage}
                    doctorEditErrorMessage={consultantEditErrorMessage}
                    isPreviewLoading={isPreviewLoading}
                    doctorPreviewData={consultantPreviewData}
                    addContactNumber={this.addContactNumber}
                    removeContactNumber={this.removeContactNumber}
                    editContactNumber={this.editContactNumber}
                    doctorImage={doctorImage}
                    onImageSelect={this.handleImageSelect}
                    doctorImageCroppedUrl={doctorImageCroppedUrl}
                    doctorFileCropped={doctorFileCropped}
                    showImageUploadModal={showImageUploadModal}
                    handleCropImage={this.handleCropImage}
                    handleImageUpload={this.handleImageUpload}
                    setImageShow={this.setImageShowModal}
                    doctorsForDropdown={activeDoctorsByHospitalForDropdown}
                    qualificationDropdown={qualificationsForDropdown}
                    hospitalsForDropdown={hospitalsForDropdown}
                    activeSpecializationList={activeSpecializationListByHospital}
                    appointmentChargeValid={appointmentChargeValid}
                    errorMessageForAppointmentCharge={errorMessageForAppointmentCharge}
                    emailValid={emailValid}
                />
            )
        }
    }

    return ConnectHoc(
        DoctorSetup,
        [
            'DoctorSaveReducer',
            'DoctorDeleteReducer',
            'DoctorEditReducer',
            'DoctorPreviewReducer',
            'DoctorSearchReducer',
            'DoctorDropdownReducer',
            'QualificationDropdownReducer',
            'SpecializationDropdownReducer',
            'HospitalDropdownReducer'
        ],
        {
            clearConsultantCreateMessage,
            createConsultant,
            deleteConsultant,
            editConsultant,
            previewConsultant,
            searchConsultant,
            //fetchActiveDoctorsForDropdown,
            fetchActiveDoctorsHospitalWiseForDropdown,
            downloadExcelForConsultants,
            fetchActiveQualificationsForDropdown,
            fetchActiveHospitalsForDropdown,
            fetchSpecializationHospitalWiseForDropdown
        }
    )
}
export default DoctorHOC
