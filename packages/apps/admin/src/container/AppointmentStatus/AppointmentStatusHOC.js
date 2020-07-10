import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    AppointmentDetailsMiddleware, AppointmentTransferMiddleware,
    DoctorMiddleware,
    HospitalSetupMiddleware,
    PatientDetailsMiddleware,
    SpecializationSetupMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants, IntegrationConstants} from '@frontend-appointment/web-resource-key-constants'
import {DateTimeFormatterUtils, EnterKeyPressUtils} from '@frontend-appointment/helpers'
import './appointment-status.scss'
import {CAlert} from '@frontend-appointment/ui-elements'
import * as Material from 'react-icons/md'
import {CConfirmationModal, TransferModalContent} from '@frontend-appointment/ui-components'


const {
    fetchAppointmentStatusList,
    clearAppointmentStatusMessage,
    appointmentApprove,
    thirdPartyApiCallCheckIn,
    appointmentApproveIntegration,
    fetchAppointmentApprovalDetailByAppointmentId,
    clearAppointmentApproveMessage
} = AppointmentDetailsMiddleware

const {
    appointmentTransfer,
    fetchAppointmentTransferCharge,
    fetchAppointmentTransferDate,
    fetchAppointmentTransferTime
} = AppointmentTransferMiddleware

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware
const {fetchActiveDoctorsHospitalWiseForDropdown, fetchDoctorsBySpecializationIdForDropdown} = DoctorMiddleware
const {
    fetchSpecializationHospitalWiseForDropdown
} = SpecializationSetupMiddleware

const {fetchPatientDetailByAppointmentId} = PatientDetailsMiddleware

const {
    appointmentSetupApiConstant,
    hospitalSetupApiConstants,
    doctorSetupApiConstants,
    specializationSetupAPIConstants,
    patientSetupApiConstant,
    appointmentTransferApiConstants
} = AdminModuleAPIConstants

const {FETCH_HOSPITALS_FOR_DROPDOWN} = hospitalSetupApiConstants
const {
    FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN
} = doctorSetupApiConstants
const {
    SPECIFIC_DROPDOWN_SPECIALIZATION_BY_HOSPITAL
} = specializationSetupAPIConstants
const {
    APPOINTMENT_STATUS_LIST,
} = appointmentSetupApiConstant

const {FETCH_PATIENT_DETAIL_BY_APPOINTMENT_ID} = patientSetupApiConstant

const {
    isFirstDateGreaterThanSecondDate,
    getDateWithTimeSetToGivenTime,
    getNoOfDaysBetweenGivenDatesInclusive
} = DateTimeFormatterUtils

const SELECT_HOSPITAL_MESSAGE = 'Select Client.'
const SELECT_DOCTOR_MESSAGE = 'Select Doctor.'
const SELECT_HOSPITAL_AND_DOCTOR_MESSAGE = 'Select Client and Doctor.'
const DATE_RANGE_ERROR_MESSAGE =
    'From date and to date must be within 7 days or less.'

const AppointmentStatusHOC = (ComposedComponent, props, type) => {
    class AppointmentStatusHOC extends React.PureComponent {
        state = {
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
            showModal: false,
            appointmentStatusDetails: [],
            doctorInfoList: [],
            appointmentStatusDetailsCopy: [],
            selectedPatientData: {},
            errorMessageForStatusDetails: SELECT_HOSPITAL_MESSAGE,
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
            appointmentStatusCount: "",
            appointmentTransferData: {
                transferData: {},
                transferDate: [],
                transferTime: [],
                transferCharge: 0
            },
            showTransferModal: false,
            transferValid: false,
        }

        fetchHospitalForDropDown = async () => {
            try {
                await this.props.fetchActiveHospitalsForDropdown(
                    FETCH_HOSPITALS_FOR_DROPDOWN
                )
            } catch (e) {
                console.log(e)
            }
        }

        fetchDoctorsByHospital = async hospitalId => {
            await this.props.fetchActiveDoctorsHospitalWiseForDropdown(
                FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN,
                hospitalId
            )
        }

        fetchSpecializationByHospital = async hospitalId => {
            await this.props.fetchSpecializationHospitalWiseForDropdown(
                SPECIFIC_DROPDOWN_SPECIALIZATION_BY_HOSPITAL,
                hospitalId
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

                if (fieldName === 'hospitalId') {
                    value
                        ? this.callApiForHospitalChange(value)
                        : this.setState({
                            searchParameters: {
                                ...this.state.searchParameters,
                                doctorId: '',
                                specializationId: ''
                            }
                        })
                }
                let errorMsg = ''
                if (['fromDate', 'toDate'].indexOf(fieldName) >= 0) {
                    if (
                        isFirstDateGreaterThanSecondDate(
                            getDateWithTimeSetToGivenTime(searchParams.fromDate, 0, 0, 0),
                            getDateWithTimeSetToGivenTime(searchParams.toDate, 0, 0, 0)
                        )
                    ) {
                        errorMsg = 'From date cannot be greater than To date!'
                        this.showAlertMessage('warning', errorMsg)
                    } else if (
                        getNoOfDaysBetweenGivenDatesInclusive(
                            searchParams.fromDate,
                            searchParams.toDate
                        ) > 7
                    ) {
                        errorMsg = DATE_RANGE_ERROR_MESSAGE
                        this.showAlertMessage('warning', errorMsg)
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

        showAlertMessage = (variant, message) => {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: variant,
                    message: message
                }
            })
            this.clearAlertTimeout()
        }

        checkInAppointment = async () => {
            this.setState({
                isConfirming: true
            })
            const {hospitalId, hospitalNumber, appointmentId} = this.state.appointmentDetails;

            let requestDTO;
            try {
                const {successResponse, apiRequestBody} = await thirdPartyApiCallCheckIn(
                    this.state.appointmentDetails,
                    IntegrationConstants.apiIntegrationFeatureTypeCodes.APPOINTMENT_CHECK_IN_CODE,
                    IntegrationConstants.apiIntegrationKey.ALL_CLIENT_FEATURE_INTEGRATION,
                    this.state.appointmentDetails.hospitalId
                );
                requestDTO = {
                    hospitalId: hospitalId,
                    appointmentId: appointmentId,
                    hospitalNumber: '',
                    isPatientNew: !hospitalNumber,
                    ...apiRequestBody
                }
                if (!successResponse) {
                    requestDTO.hospitalNumber = null
                    this.approveApiCall(requestDTO)
                } else if (successResponse.responseData && !successResponse.responseMessage) {
                    requestDTO.hospitalNumber = successResponse.responseData
                    this.approveApiCall(requestDTO)
                } else {
                    this.setState({
                        thirdPartyApiErrorMessage: successResponse.responseMessage,
                        // THE ALERT TO BE REMOVED AFTER FIXING HOW TO SHOW THIRD PARTY ERROR
                        showAlert: true,
                        alertMessageInfo: {
                            variant: 'danger',
                            message: successResponse.responseMessage
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

        callApiForHospitalChange = hospitalId => {
            this.fetchDoctorsByHospital(hospitalId)
            this.fetchSpecializationByHospital(hospitalId)
            this.setState({
                searchParameters: {
                    ...this.state.searchParameters,
                    doctorId: '',
                    specializationId: ''
                }
            })
        }

        initialApiCalls = async () => {
            await this.fetchHospitalForDropDown()
        }

        searchAppointmentStatus = async () => {
            const {
                fromDate,
                toDate,
                hospitalId,
                doctorId,
                specializationId,
                status,
                appointmentNumber
            } = this.state.searchParameters

            if (this.isSearchParametersValid()) {
                let searchData = {
                    fromDate,
                    toDate,
                    hospitalId: hospitalId.value || '',
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
                    let statusList = []
                    let doctorInfo = [],
                        appStatusCount;
                    if (this.props.AppointmentStatusListReducer.statusList) {
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
                    }
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
                activeStatus: status,
                previousSelectedTimeSlotIds: ''
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
                    this.showAlertMessage(
                        'danger',
                        this.props.PatientDetailReducer.patientDetailErrorMessage
                    )
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
                hospitalId,
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
                    errorMessageForStatus = hospitalId ? '' : SELECT_HOSPITAL_MESSAGE
                } else if (
                    fromDate &&
                    toDate &&
                    getNoOfDaysBetweenGivenDatesInclusive(fromDate, toDate) <= 7
                ) {
                    errorMessageForStatus = hospitalId
                        ? doctorId
                            ? ''
                            : SELECT_DOCTOR_MESSAGE
                        : SELECT_HOSPITAL_AND_DOCTOR_MESSAGE
                } else if (
                    fromDate &&
                    toDate &&
                    getNoOfDaysBetweenGivenDatesInclusive(fromDate, toDate) > 7
                ) {
                    errorMessageForStatus = DATE_RANGE_ERROR_MESSAGE
                }
            }
            this.setState({
                errorMessageForStatusDetails: errorMessageForStatus,
                appointmentStatusDetails: errorMessageForStatus
                    ? []
                    : appointmentStatusDetails
            })

            return errorMessageForStatus ? false : true
        }

        /********************************TRANSFER CODE**********************************************/

        previewApiCall = async appointmentId => {
            await this.props.fetchAppointmentApprovalDetailByAppointmentId(
                appointmentSetupApiConstant.APPOINTMENT_APPROVAL_DETAIL,
                appointmentId
            )
        }

        callApiAfterSpecializationChange = async specializationId => {
            await this.props.fetchDoctorsBySpecializationIdForDropdown(
                doctorSetupApiConstants.FETCH_DOCTOR_BY_SPECIALIZATION_ID,
                specializationId
            )
        }

        callApiAfterSpecializationAndDoctorChange = async appointmentDetail => {
            await this.props.fetchAppointmentTransferCharge(
                appointmentTransferApiConstants.APPOINTMENT_TRANSFER_CHARGE,
                {
                    hospitalId: appointmentDetail.hospitalId,
                    doctorId: appointmentDetail.transferredDoctor.value,
                    specializationId: appointmentDetail.transferredSpecialization.value,
                    followUp: appointmentDetail.followUp
                }
            )

            await this.props.fetchAppointmentTransferDate(
                appointmentTransferApiConstants.APPOINTMENT_TRANSFER_DATE,
                {
                    hospitalId: appointmentDetail.hospitalId,
                    doctorId: appointmentDetail.transferredDoctor.value,
                    specializationId: appointmentDetail.transferredSpecialization.value,
                    followUp: appointmentDetail.followUp
                }
            )
        }

        onDoctorOrDateChangeHandler = async (appointmentDetail, transferedDate) => {
            await this.props.fetchAppointmentTransferTime(
                appointmentTransferApiConstants.APPOINTMENT_TRANSFER_TIME,
                {
                    hospitalId: appointmentDetail.hospitalId,
                    doctorId: appointmentDetail.transferredDoctor.value,
                    specializationId: appointmentDetail.transferredSpecialization.value,
                    date: transferedDate.value
                        ? new Date(transferedDate.value)
                        : new Date()
                }
            )
        }

        checkValidityOfTransfer = () => {
            const {transferData} = this.state.appointmentTransferData
            const {
                transferredDate,
                transferredTime,
                transferredSpecialization,
                transferredDoctor,
                remarks
            } = transferData
            const transferValid =
                transferredDate.value &&
                transferredTime.value &&
                transferredSpecialization.value &&
                transferredDoctor.value &&
                remarks
            this.setState({
                transferValid: Boolean(transferValid)
            })
        }

        resetTransferData = () => {
            this.setState({
                appointmentTransferData: {
                    transferData: {},
                    transferDate: [],
                    transferTime: [],
                    transferCharge: 0
                },
                transferConfirmationModal: false,
                transferValid: false
            })
        }

        transferHandler = async data => {
            try {
                await this.previewApiCall(data.patientDetails.appointmentId)
                const {appointmentDetail} = this.props.AppointmentDetailReducer
                await this.props.clearAppointmentApproveMessage()

                await this.callApiAfterSpecializationChange(appointmentDetail.specializationId)

                let appointmentDetailData = {
                    ...appointmentDetail,
                    transferredDoctor: {
                        value: appointmentDetail.doctorId,
                        label: appointmentDetail.doctorName
                    },
                    transferredSpecialization: {
                        value: appointmentDetail.specializationId,
                        label: appointmentDetail.specializationName
                    }
                }
                await this.callApiAfterSpecializationAndDoctorChange(appointmentDetailData)
                await this.onDoctorOrDateChangeHandler(appointmentDetailData, {
                    value: appointmentDetail.date,
                    label: appointmentDetail.date
                })
                const {appointmentTransferCharge} = this.props.appointmentTransferChargeReducer

                const {
                    appointmentTransferTime,
                    appointmentTransferTimeError,
                    isAppointmentTransferTimeLoading
                } = this.props.appointmentTransferTimeReducer

                const {
                    appointmentTransferDate,
                    appointmentTransferDateError,
                    isAppointmentTransferDateLoading
                } = this.props.appointmentTransferDateReducer

                this.setState({
                    appointmentTransferData: {
                        transferData: {
                            ...this.props.AppointmentDetailReducer.appointmentDetail,
                            transferredDoctor: {
                                value: appointmentDetail.doctorId,
                                label: appointmentDetail.doctorName,
                                fileUri: appointmentDetail.fileUri
                            },
                            transferredSpecialization: {
                                value: appointmentDetail.specializationId,
                                label: appointmentDetail.specializationName
                            },
                            transferredDate: '',
                            transferredTime: '',
                            transferredCharge: appointmentTransferCharge,
                            remarks: ''
                        },
                        transferDate: {
                            appointmentTransferDate,
                            appointmentTransferDateError,
                            isAppointmentTransferDateLoading
                        },
                        transferTime: {
                            appointmentTransferTime,
                            appointmentTransferTimeError,
                            isAppointmentTransferTimeLoading
                        },
                        transferCharge: appointmentTransferCharge
                    },
                    showTransferModal: true
                })
            } catch (e) {
                this.showAlertMessage('danger', e.errorMessage ? e.errorMessage
                    : 'Sorry,Internal Server Error occurred.')
            }
        }

        handleTransferChange = async e => {
            const {value, label, name, fileUri} = e.target

            let transferAppointment = {
                ...this.state.appointmentTransferData
            }
            transferAppointment['transferData'][name] = label
                ? value
                    ? fileUri
                        ? {value, label, fileUri}
                        : {value, label, fileUri: ''}
                    : ''
                : value
                    ? value
                    : ''

            if (
                name === 'transferredSpecialization' ||
                name === 'transferredDoctor' ||
                name === 'transferredDate'
            ) {
                await this.onDoctorOrDateChangeHandler(
                    transferAppointment.transferData,
                    transferAppointment.transferData.transferredDate
                )
                const {
                    appointmentTransferTime,
                    appointmentTransferTimeError,
                    isAppointmentTransferTimeLoading
                } = this.props.appointmentTransferTimeReducer
                transferAppointment.transferTime = {
                    appointmentTransferTime,
                    appointmentTransferTimeError,
                    isAppointmentTransferTimeLoading
                }
                transferAppointment['transferData']['transferredTime'] = ''
            }
            if (
                name === 'transferredSpecialization' ||
                name === 'transferredDoctor'
            ) {
                if (value) {
                    transferAppointment['transferData']['transferredDate'] = ''
                    transferAppointment['transferData']['transferredTime'] = ''

                    await this.callApiAfterSpecializationAndDoctorChange(
                        transferAppointment.transferData
                    )
                    const {
                        appointmentTransferCharge
                    } = this.props.appointmentTransferChargeReducer
                    const {
                        appointmentTransferDate,
                        appointmentTransferDateError,
                        isAppointmentTransferDateLoading
                    } = this.props.appointmentTransferDateReducer
                    transferAppointment.transferDate = {
                        appointmentTransferDate,
                        appointmentTransferDateError,
                        isAppointmentTransferDateLoading
                    }
                    transferAppointment.transferCharge = {
                        appointmentTransferCharge
                    }

                    transferAppointment['transferData'][
                        'transferredCharge'
                        ] = appointmentTransferCharge
                }
            }
            await this.setState({
                appointmentTransferData: {...transferAppointment}
            })

            this.checkValidityOfTransfer()
        }

        transferApiCall = async () => {
            const {transferData} = this.state.appointmentTransferData
            const {
                transferredDoctor,
                transferredSpecialization,
                followUp,
                transferredTime,
                transferredDate,
                appointmentId,
                transferredCharge,
                remarks
            } = transferData
            try {
                await this.props.appointmentTransfer(
                    appointmentTransferApiConstants.APPOINTMENT_TRANSFER,
                    {
                        appointmentCharge: transferredCharge,
                        appointmentDate: new Date(transferredDate.value),
                        appointmentId: appointmentId,
                        appointmentTime: transferredTime.value,
                        doctorId: transferredDoctor.value,
                        isFollowUp: followUp,
                        remarks: remarks,
                        specializationId: transferredSpecialization.value
                    }
                )
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.appointmentTransferReducer
                            .appointmentTransferSucessMessage
                    }
                })
            } catch (e) {
                this.showAlertMessage('danger', this.props.appointmentTransferReducer
                    .appointmentTransferErrorMessage)
            } finally {
                this.showTransferModal()
                this.resetTransferData()
                await this.searchAppointmentStatus()
            }
        }

        showTransferModal = async () => {
            this.setState({
                showTransferModal: !this.state.showTransferModal
            })
        }

        /****************TRANSFER END ************************************************************/

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
                appointmentStatusCount,
                showTransferModal,
                appointmentTransferData,
                transferValid
            } = this.state

            const {hospitalsForDropdown} = this.props.HospitalDropdownReducer

            const {
                activeDoctorsByHospitalForDropdown,
                doctorsBySpecializationForDropdown,
                doctorDropdownErrorMessage
            } = this.props.DoctorDropdownReducer

            const {
                activeSpecializationListByHospital,
                dropdownErrorMessage
            } = this.props.SpecializationDropdownReducer

            const {
                statusErrorMessage,
                isStatusListLoading
            } = this.props.AppointmentStatusListReducer

            const {isAppointmentTransferLoading} = this.props.appointmentTransferReducer

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
                                hospitalList: hospitalsForDropdown,
                                doctorList: activeDoctorsByHospitalForDropdown,
                                doctorDropdownErrorMessage: doctorDropdownErrorMessage,
                                specializationList: activeSpecializationListByHospital,
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
                                appointmentStatusCount: appointmentStatusCount,
                                transferHandler: this.transferHandler,
                                showTransferModal: showTransferModal,
                            }}
                            checkInModalData={{
                                showCheckInModal: showCheckInModal,
                                showAppointmentDetailModal: showAppointmentDetailModal,
                                setShowModal: this.setShowModal,
                                checkInAppointment: this.checkInAppointment,
                                appointmentDetails: {...appointmentDetails},
                                isConfirming: isConfirming,
                                closeAppointmentDetailModal: this.closeAppointmentDetailModal,
                            }}
                        />
                        {showTransferModal ? (
                            <CConfirmationModal
                                modalHeader="Confirm Transfer?"
                                modalBody={
                                    <TransferModalContent
                                        {...appointmentTransferData}
                                        doctorList={doctorsBySpecializationForDropdown}
                                        specializationList={activeSpecializationListByHospital}
                                        //transferValid={transferValid}
                                        onChangeHandler={this.handleTransferChange}
                                    />
                                }
                                onConfirm={this.transferApiCall}
                                onCancel={this.showTransferModal}
                                isConfirming={isAppointmentTransferLoading}
                                isDisabled={!transferValid}
                                setShowModal={this.showTransferModal}
                                showModal={showTransferModal}
                            />
                        ) : (
                            ''
                        )}
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
            'PatientDetailReducer',
            'AppointmentDetailReducer',
            'appointmentTransferReducer',
            'appointmentTransferDateReducer',
            'appointmentTransferTimeReducer',
            'appointmentTransferChargeReducer'
        ],
        {
            fetchActiveHospitalsForDropdown,
            fetchActiveDoctorsHospitalWiseForDropdown,
            fetchSpecializationHospitalWiseForDropdown,
            fetchAppointmentStatusList,
            clearAppointmentStatusMessage,
            fetchPatientDetailByAppointmentId,
            appointmentApprove,
            thirdPartyApiCallCheckIn,
            fetchAppointmentApprovalDetailByAppointmentId,
            clearAppointmentApproveMessage,
            fetchDoctorsBySpecializationIdForDropdown,
            appointmentTransfer,
            fetchAppointmentTransferCharge,
            fetchAppointmentTransferDate,
            fetchAppointmentTransferTime
        }
    )
}

export default AppointmentStatusHOC
