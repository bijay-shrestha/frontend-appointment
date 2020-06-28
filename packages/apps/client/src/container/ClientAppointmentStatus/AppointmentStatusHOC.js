import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    AppointmentDetailsMiddleware,
    DoctorMiddleware,
    HospitalSetupMiddleware,
    PatientDetailsMiddleware,
    SpecializationSetupMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants, IntegrationConstants} from '@frontend-appointment/web-resource-key-constants'
import {
    DateTimeFormatterUtils,
    EnterKeyPressUtils
} from '@frontend-appointment/helpers'
import './appointment-status.scss'
import {CAlert} from '@frontend-appointment/ui-elements'
import * as Material from 'react-icons/md'

const {
    fetchAppointmentStatusList,
    clearAppointmentStatusMessage,
    appointmentApprove,
    thirdPartyApiCallCheckIn,
    appointmentApproveIntegration
} = AppointmentDetailsMiddleware
const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware
const {fetchActiveDoctorsForDropdown} = DoctorMiddleware
const {fetchSpecializationForDropdown} = SpecializationSetupMiddleware

const {fetchPatientDetailByAppointmentId} = PatientDetailsMiddleware

const {
    appointmentSetupApiConstant,
    doctorSetupApiConstants,
    specializationSetupAPIConstants,
    patientSetupApiConstant
} = AdminModuleAPIConstants

const {FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN} = doctorSetupApiConstants
const {ACTIVE_DROPDOWN_SPECIALIZATION} = specializationSetupAPIConstants
const {
    APPOINTMENT_STATUS_LIST,
    //APPOINTMENT_APPROVE
} = appointmentSetupApiConstant

const {FETCH_PATIENT_DETAIL_BY_APPOINTMENT_ID} = patientSetupApiConstant

const {
    isFirstDateGreaterThanSecondDate,
    getDateWithTimeSetToGivenTime,
    getNoOfDaysBetweenGivenDatesInclusive
} = DateTimeFormatterUtils

const SELECT_HOSPITAL_MESSAGE = 'Select Client.'
const SELECT_DOCTOR_MESSAGE = 'Select Doctor.'
// const SELECT_HOSPITAL_AND_DOCTOR_MESSAGE = 'Select Hospital and Doctor.';
const DATE_RANGE_ERROR_MESSAGE =
    'From date and to date must be within 7 days or less.'

const AppointmentStatusHOC = (ComposedComponent, props, type) => {
    class AppointmentStatusHOC extends React.PureComponent {
        state = {
            searchParameters: {
                fromDate: new Date(),
                toDate: new Date(),
                doctorId: '',
                specializationId: '',
                status: '',
                appointmentNumber: '',
                hasAppointmentNumber: ''
            },
            showModal: false,
            appointmentStatusDetails: [],
            appointmentStatusDetailsCopy: [],
            errorMessageForStatusDetails: SELECT_DOCTOR_MESSAGE,
            showAlert: false,
            alertMessageInfo: {
                variant: '',
                message: ''
            },
            activeStatus: 'ALL',
            previousSelectedTimeSlotIds: '', // used for changing class of time slots, remove /add active class
            previousSelectedTimeSlotRowIndex: '',
            appointmentDetails: '',
            showCheckInModal: false,
            isConfirming: false,
            showAppointmentDetailModal: false,
            appointmentStatusCount: ""
        }

        fetchDoctorsByHospital = async () => {
            await this.props.fetchActiveDoctorsForDropdown(
                FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN
            )
        }

        fetchSpecializationByHospital = async () => {
            await this.props.fetchSpecializationForDropdown(
                ACTIVE_DROPDOWN_SPECIALIZATION
            )
        }

        handleEnterPress = event => {
            EnterKeyPressUtils.handleEnter(event)
        }

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            })
            this.searchAppointmentStatus()
        }

        handleSearchFormReset = async () => {
            await this.setState({
                searchParameters: {
                    fromDate: new Date(),
                    toDate: new Date(),
                    hospitalId: '',
                    doctorId: '',
                    specializationId: '',
                    status: '',
                    appointmentNumber: '',
                    hasAppointmentNumber: ''
                },
                statusDetails: [],
                errorMessageForStatusDetails: SELECT_HOSPITAL_MESSAGE,
                appointmentStatusDetails: [],
                appointmentStatusDetailsCopy: [],
                appointmentStatusCount: "",
                previousSelectedTimeSlotRowIndex: '',
                previousSelectedTimeSlotIds: ''
            })
            this.searchAppointmentStatus()
            this.props.clearAppointmentStatusMessage()
        }

        handleSearchFormChange = async (event, field) => {
            if (event) {
                let fieldName, value, label, fileUri
                fieldName = field ? field : event.target.name
                value = field ? event : event.target.value
                label = field ? '' : event.target.label
                fileUri = field ? '' : event.target.fileUri

                let searchParams = {...this.state.searchParameters}
                searchParams[fieldName] = label
                    ? value
                        ? fileUri
                            ? {value, label, fileUri}
                            : {
                                value,
                                label
                            }
                        : ''
                    : value
                await this.setStateValuesForSearch(searchParams)

                let errorMsg = ''
                if (['fromDate', 'toDate'].indexOf(fieldName) >= 0) {
                    if (
                        isFirstDateGreaterThanSecondDate(
                            getDateWithTimeSetToGivenTime(searchParams.fromDate, 0, 0, 0),
                            getDateWithTimeSetToGivenTime(searchParams.toDate, 0, 0, 0)
                        )
                    ) {
                        errorMsg = 'From date cannot be greater than To date!'
                        this.showWarningAlert(errorMsg)
                        this.clearAlertTimeout()
                    } else if (
                        getNoOfDaysBetweenGivenDatesInclusive(
                            searchParams.fromDate,
                            searchParams.toDate
                        ) > 7
                    ) {
                        errorMsg = DATE_RANGE_ERROR_MESSAGE
                        this.showWarningAlert(errorMsg)
                        this.clearAlertTimeout()
                    }
                }
            }
        }

        handleCheckIn = async appointmentStatusDetail => {
            sessionStorage.setItem('actionType', 14)
            let appointmentData = {
                hospitalName: appointmentStatusDetail.patientDetails.hospitalName || '',
                doctorName: appointmentStatusDetail.doctorName,
                specializationName: appointmentStatusDetail.specializationName,
                appointmentId: appointmentStatusDetail.patientDetails.appointmentId,
                appointmentDate: appointmentStatusDetail.date,
                appointmentTime:
                    appointmentStatusDetail.patientDetails.appointmentTime || 'N/A',
                appointmentNumber:
                appointmentStatusDetail.patientDetails.appointmentNumber,
                appointmentAmount:
                appointmentStatusDetail.patientDetails.appointmentAmount,
                patientName:
                    appointmentStatusDetail.patientDetails.name +
                    ' (' +
                    appointmentStatusDetail.patientDetails.age +
                    ' / ' +
                    appointmentStatusDetail.patientDetails.gender +
                    ')',
                mobileNumber: appointmentStatusDetail.patientDetails.mobileNumber,
                patientType:
                    appointmentStatusDetail.patientDetails.patientType || 'N/A',
                registrationNumber:
                    appointmentStatusDetail.patientDetails.registrationNumber || 'N/A',
                esewaId: appointmentStatusDetail.patientDetails.esewaId || 'N/A',
                transactionNumber:
                    appointmentStatusDetail.patientDetails.transactionNumber || 'N/A',
                appointmentMode:
                    appointmentStatusDetail.patientDetails.appointmentMode || 'N/A'
            }
            this.setState({
                showCheckInModal: true,
                appointmentDetails: {...appointmentData}
            })
        }

        handleViewAppointmentDetails = async appointmentStatusDetail => {
            let appointmentData = {
                hospitalName: appointmentStatusDetail.patientDetails.hospitalName || '',
                doctorName: appointmentStatusDetail.doctorName,
                specializationName: appointmentStatusDetail.specializationName,
                appointmentId: appointmentStatusDetail.patientDetails.appointmentId,
                appointmentDate: appointmentStatusDetail.date,
                appointmentTime:
                    appointmentStatusDetail.patientDetails.appointmentTime || 'N/A',
                appointmentNumber:
                appointmentStatusDetail.patientDetails.appointmentNumber,
                appointmentAmount:
                appointmentStatusDetail.patientDetails.appointmentAmount,
                patientName:
                    appointmentStatusDetail.patientDetails.name +
                    ' (' +
                    appointmentStatusDetail.patientDetails.age +
                    ' / ' +
                    appointmentStatusDetail.patientDetails.gender +
                    ')',
                mobileNumber: appointmentStatusDetail.patientDetails.mobileNumber,
                patientType:
                    appointmentStatusDetail.patientDetails.patientType || 'N/A',
                registrationNumber:
                    appointmentStatusDetail.patientDetails.registrationNumber || 'N/A',
                esewaId: appointmentStatusDetail.patientDetails.esewaId || 'N/A',
                transactionNumber:
                    appointmentStatusDetail.patientDetails.transactionNumber || 'N/A',
                appointmentMode:
                    appointmentStatusDetail.patientDetails.appointmentMode || 'N/A'
            }
            this.setState({
                showAppointmentDetailModal: true,
                appointmentDetails: {...appointmentData}
            })
        }

        setStateValuesForSearch = searchParams => {
            this.setState({
                searchParameters: searchParams
            })
        }

        setShowModal = () => {
            this.setState(prevState => ({
                showCheckInModal: !prevState.showCheckInModal
            }))
        }

        showWarningAlert = message => {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: 'warning',
                    message: message
                }
            })
        }

        showErrorAlert = message => {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: 'danger',
                    message: message
                }
            })
        }

        approveApiCall = async (requestDTO) => {
            try {
                await this.props.appointmentApprove(
                    appointmentSetupApiConstant.APPOINTMENT_APPROVE,
                    requestDTO
                )
                this.setState({
                    isConfirming: false,
                    showCheckInModal: false,
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.AppointmentApproveReducer
                            .approveSuccessMessage
                    }
                })
            } catch (e) {
                this.setState({
                    isConfirming: false,
                    showCheckInModal: false,
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message:
                            this.props.AppointmentApproveReducer.approveErrorMessage ||
                            e.message
                    }
                })
            } finally {
                await this.searchAppointmentStatus()
                // this.setShowModal()
            }
        }

        checkInAppointment = async () => {
            this.setState({
                isConfirming: true
            })
            const {hospitalNumber, appointmentId} = this.state.appointmentDetails;
            let requestDTO;

            try {
                const {successResponse, apiRequestBody} = await thirdPartyApiCallCheckIn(this.state.appointmentDetails,
                    IntegrationConstants.apiIntegrationFeatureTypeCodes.APPOINTMENT_CHECK_IN_CODE,
                    IntegrationConstants.apiIntegrationKey.CLIENT_FEATURE_INTEGRATION);
                requestDTO = {
                    appointmentId: appointmentId,
                    hospitalNumber: '',
                    isPatientNew: hospitalNumber ? false : true,
                    ...apiRequestBody
                }
                if (!successResponse) {
                    requestDTO.hospitalNumber = null
                    this.approveApiCall(requestDTO)
                } else if (successResponse.responseData && !successResponse.responseMessage) {
                    requestDTO.hospitalNumber = successResponse.responseData
                    this.approveApiCall(requestDTO)
                } else {
                    const thirdPartyErrorMessage = "Third Party Integration error: ".concat(successResponse.responseMessage)
                    this.setState({
                        thirdPartyApiErrorMessage: thirdPartyErrorMessage,
                        isConfirming: false,
                        // THE ALERT TO BE REMOVED AFTER FIXING HOW TO SHOW THIRD PARTY ERROR
                        showAlert: true,
                        alertMessageInfo: {
                            variant: 'danger',
                            message: thirdPartyErrorMessage
                                || "Could not access third party api."
                        }
                    })
                }
            } catch (e) {
                this.setState({
                    isConfirming: false,
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message:
                            this.props.AppointmentApproveReducer.approveErrorMessage ||
                            e.message || e.errorMessage || "Could not access third party api."
                    }
                })
            }
        }

        clearAlertTimeout = () => {
            setTimeout(() => this.closeAlert(), 5000)
        }

        closeAlert = () => {
            this.setState({
                showAlert: false
            })
        }

        closeAppointmentDetailModal = () => {
            this.setState({
                showAppointmentDetailModal: false,
                appointmentDetails: {}
            })
        }

        callApiForHospitalChange = () => {
            this.fetchDoctorsByHospital()
            this.fetchSpecializationByHospital()
        }

        initialApiCalls = async () => {
            await this.fetchDoctorsByHospital()
            await this.searchAppointmentStatus()
            await this.fetchSpecializationByHospital()
        }

        searchAppointmentStatus = async () => {
            const {
                fromDate,
                toDate,
                doctorId,
                specializationId,
                status,
                appointmentNumber
            } = this.state.searchParameters

            if (this.isSearchParametersValid()) {
                let searchData = {
                    fromDate,
                    toDate,
                    specializationId: specializationId.value || '',
                    doctorId: doctorId.value || '',
                    status: (status.value === 'ALL' ? '' : status.value) || '',
                    hasAppointmentNumber: appointmentNumber ? 'Y' : 'N',
                    appointmentNumber
                }

                try {
                    await this.props.fetchAppointmentStatusList(
                        APPOINTMENT_STATUS_LIST,
                        searchData
                    )
                    let statusList = [],
                        doctorInfo,
                        appStatusCount;
                    if (this.props.AppointmentStatusListReducer.statusList)
                        if (
                            this.props.AppointmentStatusListReducer.statusList
                                .doctorDutyRosterInfo.length
                        )
                            statusList = [
                                ...this.props.AppointmentStatusListReducer.statusList
                                    .doctorDutyRosterInfo
                            ]
                    doctorInfo = this.props.AppointmentStatusListReducer.statusList && [
                        ...this.props.AppointmentStatusListReducer.statusList.doctorInfo
                    ]
                    appStatusCount = (this.props.AppointmentStatusListReducer.statusList &&
                        this.props.AppointmentStatusListReducer.statusList.appointmentStatusCount) ? {
                        ...this.props.AppointmentStatusListReducer.statusList.appointmentStatusCount,
                        "ALL": this.props.AppointmentStatusListReducer.statusList.appointmentStatusCount[""]
                    } : ''
                    await this.setState({
                        appointmentStatusDetails: [...statusList],
                        doctorInfoList: [...doctorInfo],
                        appointmentStatusDetailsCopy: [...statusList],
                        previousSelectedTimeSlotIds: '',
                        appointmentStatusCount: appStatusCount
                    })
                } catch (e) {
                }
            }
        }

        filterAppointmentDetailsByStatus = async (status, event) => {
            event.preventDefault()
            let appointmentStatus = [...this.state.appointmentStatusDetailsCopy],
                filteredStatus

            if (status !== 'ALL') {
                filteredStatus = appointmentStatus.map(appointment => {
                    let appointmentCopy = {...appointment}
                    if (appointment.doctorTimeSlots) {
                        let filteredTimeSlots = appointment.doctorTimeSlots.filter(time =>
                            status === 'F' ? time.isFollowUp === 'Y' : time.status === status
                        )
                        appointmentCopy.doctorTimeSlots = [...filteredTimeSlots]
                    }
                    return appointmentCopy
                })
            } else {
                filteredStatus = [...this.state.appointmentStatusDetailsCopy]
            }

            await this.setState({
                appointmentStatusDetails: [...filteredStatus],
                activeStatus: status
            })
        }

        getPatientDataByAppointmentId = async appointmentId => {
            await this.props.fetchPatientDetailByAppointmentId(
                FETCH_PATIENT_DETAIL_BY_APPOINTMENT_ID,
                appointmentId
            )
        }

        getPatientDetails = async (
            timeSlot,
            appointmentDate,
            rowIndex,
            timeSlotIndex
        ) => {
            let elementId = timeSlot.appointmentTime + '-' + rowIndex + timeSlotIndex
            let statusDetails = [...this.state.appointmentStatusDetails]

            let selectedElementsArray = this.addRemoveActiveClassFromTimeSlots(
                elementId,
                rowIndex
            )

            if (timeSlot.appointmentId) {
                try {
                    await this.getPatientDataByAppointmentId(timeSlot.appointmentId)

                    let patientDetail = this.setPatientDataProps(
                        appointmentDate,
                        timeSlot
                    )
                    statusDetails[rowIndex].patientDetails = {...patientDetail}
                    this.setState({
                        appointmentStatusDetails: [...statusDetails],
                        previousSelectedTimeSlotIds: selectedElementsArray
                    })
                } catch (e) {
                    this.showErrorAlert(
                        this.props.PatientDetailReducer.patientDetailErrorMessage
                    )
                    this.clearAlertTimeout()
                }
            } else {
                statusDetails[rowIndex].patientDetails = null
                await this.setState({
                    appointmentStatusDetails: [...statusDetails],
                    previousSelectedTimeSlotIds: selectedElementsArray
                })
            }
        }

        addRemoveActiveClassFromTimeSlots = (elementId, rowIndex) => {
            let selectedElement = document.getElementById(elementId)
            selectedElement && selectedElement.classList.add('active')

            let previousElement = this.state.previousSelectedTimeSlotIds
                ? {...this.state.previousSelectedTimeSlotIds}
                : ''
            let selectedElementsArray
            if (previousElement !== '') {
                selectedElementsArray = {
                    ...previousElement,
                    [rowIndex]: elementId
                }
            } else {
                selectedElementsArray = {
                    [rowIndex]: elementId
                }
            }

            if (
                this.state.previousSelectedTimeSlotIds &&
                Object.keys(this.state.previousSelectedTimeSlotIds).includes(
                    rowIndex.toString()
                ) &&
                this.state.previousSelectedTimeSlotIds[rowIndex] !== elementId
            ) {
                let previousElement = document.getElementById(
                    this.state.previousSelectedTimeSlotIds[rowIndex]
                )
                previousElement && previousElement.classList.remove('active')
            }

            return selectedElementsArray
        }

        setPatientDataProps = (appointmentDate, timeSlot) => {
            let patientData = this.props.PatientDetailReducer.patientDetails

            let isFutureDate = DateTimeFormatterUtils.isFirstDateGreaterThanSecondDate(
                new Date(appointmentDate),
                new Date()
            )
            return {
                ...patientData,
                appointmentTime: timeSlot.appointmentTime,
                appointmentId: timeSlot.appointmentId,
                canCheckIn: !isFutureDate,
                showCheckInButton:
                    ['A', 'C'].indexOf(timeSlot.status) >= 0 ? false : true
            }
        }

        isSearchParametersValid = () => {
            const {
                fromDate,
                toDate,
                doctorId,
                appointmentNumber
            } = this.state.searchParameters

            let errorMessageForStatus = '',
                appointmentStatusDetails = [...this.state.appointmentStatusDetails]

            if (!appointmentNumber) {
                if (
                    fromDate &&
                    toDate &&
                    getNoOfDaysBetweenGivenDatesInclusive(fromDate, toDate) === 1
                ) {
                    // errorMessageForStatus = hospitalId ? '' : SELECT_HOSPITAL_MESSAGE
                } else if (
                    fromDate &&
                    toDate &&
                    getNoOfDaysBetweenGivenDatesInclusive(fromDate, toDate) <= 7
                ) {
                    errorMessageForStatus = doctorId ? '' : SELECT_DOCTOR_MESSAGE
                } else if (
                    fromDate &&
                    toDate &&
                    getNoOfDaysBetweenGivenDatesInclusive(fromDate, toDate) > 7
                ) {
                    errorMessageForStatus = DATE_RANGE_ERROR_MESSAGE
                }

                this.setState({
                    errorMessageForStatusDetails: errorMessageForStatus,
                    appointmentStatusDetails: errorMessageForStatus
                        ? []
                        : appointmentStatusDetails
                })
            }

            return errorMessageForStatus ? false : true
        }

        componentDidMount() {
            this.initialApiCalls()
        }

        componentWillUnmount() {
            clearTimeout(this.clearAlertTimeout)
        }

        render() {
            const {
                searchParameters,
                appointmentStatusDetails,
                doctorInfoList,
                errorMessageForStatusDetails,
                showAlert,
                alertMessageInfo,
                activeStatus,
                showCheckInModal,
                appointmentDetails,
                isConfirming,
                showAppointmentDetailModal,
                appointmentStatusCount
            } = this.state

            // const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;

            const {
                activeDoctorsForDropdown,
                doctorDropdownErrorMessage
            } = this.props.DoctorDropdownReducer

            const {
                allActiveSpecializationList,
                dropdownErrorMessage
            } = this.props.SpecializationDropdownReducer

            const {
                statusErrorMessage,
                isStatusListLoading
            } = this.props.AppointmentStatusListReducer

            return (
                <>
                    <div id="appointment-status">
                        <ComposedComponent
                            {...this.props}
                            {...props}
                            searchHandler={{
                                handleSearchFormChange: this.handleSearchFormChange,
                                resetSearchForm: this.handleSearchFormReset,
                                searchAppointmentStatus: this.searchAppointmentStatus,
                                doctorList: activeDoctorsForDropdown,
                                doctorDropdownErrorMessage: doctorDropdownErrorMessage,
                                specializationList: allActiveSpecializationList,
                                specializationDropdownErrorMessage: dropdownErrorMessage,
                                searchParameters: searchParameters
                            }}
                            statusDetailsData={{
                                appointmentStatusDetails,
                                doctorInfoList,
                                errorMessageForStatusDetails,
                                searchErrorMessage: statusErrorMessage,
                                isStatusListLoading,
                                searchAppointmentStatus: this.searchAppointmentStatus,
                                getPatientDetails: this.getPatientDetails,
                                handleCheckIn: this.handleCheckIn,
                                activeStatus: activeStatus,
                                filterAppointmentDetailsByStatus: this
                                    .filterAppointmentDetailsByStatus,
                                showCheckInModal: showCheckInModal,
                                handleViewAppointmentDetails: this.handleViewAppointmentDetails,
                                appointmentStatusCount: appointmentStatusCount
                            }}
                            checkInModalData={{
                                showCheckInModal: showCheckInModal,
                                showAppointmentDetailModal: showAppointmentDetailModal,
                                setShowModal: this.setShowModal,
                                checkInAppointment: this.checkInAppointment,
                                appointmentDetails: {...appointmentDetails},
                                isConfirming: isConfirming,
                                closeAppointmentDetailModal: this.closeAppointmentDetailModal
                            }}
                        />
                        <CAlert
                            id="profile-manage"
                            variant={alertMessageInfo.variant}
                            show={showAlert}
                            onClose={this.closeAlert}
                            alertType={
                                alertMessageInfo.variant === 'success' ? (
                                    <>
                                        <Material.MdDone/>
                                    </>
                                ) : (
                                    <>
                                        <i
                                            className="fa fa-exclamation-triangle"
                                            aria-hidden="true"
                                        />
                                    </>
                                )
                            }
                            message={alertMessageInfo.message}
                        />
                    </div>
                </>
            )
        }
    }

    return ConnectHoc(
        AppointmentStatusHOC,
        [
            'AppointmentStatusListReducer',
            'AppointmentApproveReducer',
            'SpecializationDropdownReducer',
            'DoctorDropdownReducer',
            'HospitalDropdownReducer',
            'PatientDetailReducer'
        ],
        {
            fetchActiveHospitalsForDropdown,
            fetchActiveDoctorsForDropdown,
            fetchSpecializationForDropdown,
            fetchAppointmentStatusList,
            clearAppointmentStatusMessage,
            fetchPatientDetailByAppointmentId,
            appointmentApprove,
            appointmentApproveIntegration,
            thirdPartyApiCallCheckIn
        }
    )
}

export default AppointmentStatusHOC
