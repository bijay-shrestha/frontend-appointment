import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    AppointmentDetailsMiddleware,
    HospitalSetupMiddleware,
    DoctorMiddleware,
    SpecializationSetupMiddleware,
    PatientDetailsMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
    EnterKeyPressUtils,
    FileExportUtils
} from '@frontend-appointment/helpers'
import './appointment-refund.scss'
import {CAlert} from '@frontend-appointment/ui-elements';
import {DateTimeFormatterUtils} from '@frontend-appointment/helpers'

const {
    clearAppointmentRefundPending,
    fetchAppointmentRefundList,
    clearAppointmentRefundRejectMessage,
    clearAppointmentRefundMessage,
    appointmentRefund,
    appointmentRejectRefund
    //downloadExcelForHospitals
} = AppointmentDetailsMiddleware
const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware
const {fetchActiveDoctorsHospitalWiseForDropdown} = DoctorMiddleware
const {
    fetchSpecializationHospitalWiseForDropdown
} = SpecializationSetupMiddleware
const {fetchPatientMetaList} = PatientDetailsMiddleware
const AppointRefundHOC = (ComposedComponent, props, type) => {
    const {
        appointmentSetupApiConstant,
        hospitalSetupApiConstants,
        doctorSetupApiConstants,
        specializationSetupAPIConstants,
        patientSetupApiConstant
    } = AdminModuleAPIConstants

    class AppointmentRefundDetails extends React.PureComponent {
        state = {
            searchParameters: {
                appointmentNumber: '',
                fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
                toDate: new Date(),
                hospitalId: '',
                patientMetaInfoId: '',
                doctorId: '',
                patientType: '',
                specializationId: ''
            },
            queryParams: {
                page: 0,
                size: 10
            },
            totalRecords: 0,
            showModal: false,
            previewData: {},
            refundRejectRequestDTO: {
                "appointmentId": "",
                "remarks": ""
            },
            alertMessageInfo: {
                variant: '',
                message: ''
            },
            rejectModalShow: false,
            showAlert: false
        }

        setShowAlert = () => {
            this.setState(prevState => ({
                showAlert: !prevState.showAlert
            }))
        }
        handleEnterPress = event => {
            EnterKeyPressUtils.handleEnter(event)
        }

        searchHospitalForDropDown = async () => {
            try {
                await this.props.fetchActiveHospitalsForDropdown(
                    hospitalSetupApiConstants.FETCH_HOSPITALS_FOR_DROPDOWN
                )
            } catch (e) {
                console.log(e)
            }
        }

        searchAppointment = async page => {
            const {
                appointmentNumber,
                fromDate,
                toDate,
                hospitalId,
                patientMetaInfoId,
                patientType,
                specializationId,
                doctorId
            } = this.state.searchParameters
            let searchData = {
                appointmentNumber,
                fromDate,
                toDate,
                hospitalId: hospitalId.value || '',
                patientMetaInfoId: patientMetaInfoId.value || '',
                patientType: patientType.value || '',
                specializationId: specializationId.value || '',
                doctorId: doctorId.value || ''
            }

            let updatedPage =
                this.state.queryParams.page === 0
                    ? 1
                    : page
                    ? page
                    : this.state.queryParams.page
            await this.props.fetchAppointmentRefundList(
                appointmentSetupApiConstant.APPOINTMENT_REFUND_LIST,
                {
                    page: updatedPage,
                    size: this.state.queryParams.size
                },
                searchData
            )
            await this.setState({
                totalRecords: this.props.AppointmentRefundListReducer.refundList.length
                    ? this.props.AppointmentRefundListReducer.totalItems
                    : 0,
                queryParams: {
                    ...this.state.queryParams,
                    page: updatedPage
                }
            })
        }

        appendSNToTable = refundList => {
            let newRefundList = []

            newRefundList =
                refundList.length &&
                refundList.map((spec, index) => ({
                    appointmentId: spec.appointmentId || 'N/A',
                    appointmentTime: spec.appointmentTime || 'N/A',
                    appointmentNumber: spec.appointmentNumber || 'N/A',
                    hospitalName: spec.hospitalName || 'N/A',
                    patientName: spec.patientName || 'N/A',
                    registrationNumber: spec.registrationNumber || 'N/A',
                    doctorName: spec.doctorName || 'N/A',
                    specializationName: spec.specializationName || 'N/A',
                    transactionNumber: spec.transactionNumber || 'N/A',
                    cancelledDate: spec.cancelledDate || 'N/A',
                    refundAmount: spec.refundAmount || 'N/A',
                    esewaId: spec.esewaId || 'N/A',
                    remarks: spec.remarks || 'N/A',
                    appointmentDate: spec.appointmentDate || 'N/A',
                    sN: index + 1
                }))

            console.log('New RefundList', newRefundList)
            return newRefundList
        }

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            })
            this.searchAppointment()
        }

        handleSearchFormReset = async () => {
            await this.setState({
                searchParameters: {
                    appointmentNumber: '',
                    fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
                    toDate: new Date(),
                    hospitalId: '',
                    patientMetaInfoId: '',
                    patientType: '',
                    specializationId: '',
                    doctorId: ''
                }
            })
            this.searchAppointment()
        }

        setStateValuesForSearch = searchParams => {
            this.setState({
                searchParameters: searchParams
            })
        }

        previewCall = data => {
            this.setState({
                previewData: data,
                showModal: true
            })
        }

        callApiForHospitalChange = hospitalId => {
            this.props.fetchActiveDoctorsHospitalWiseForDropdown(
                doctorSetupApiConstants.FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN,
                hospitalId
            )
            this.props.fetchSpecializationHospitalWiseForDropdown(
                specializationSetupAPIConstants.SPECIALIZATION_BY_HOSPITAL,
                hospitalId
            )
            this.props.fetchPatientMetaList(
                patientSetupApiConstant.ACTIVE_PATIENT_META_INFO_DETAILS,
                hospitalId
            )
        }

        handleSearchFormChange = async (event, field) => {
            if (event) {
                let fieldName, value, label
                if (field) {
                    fieldName = field
                    value = event
                } else {
                    fieldName = event.target.name
                    value = event.target.value
                    label = event.target.label
                    if (fieldName === 'hospitalId') this.callApiForHospitalChange(value)
                }
                let searchParams = {...this.state.searchParameters}
                searchParams[fieldName] = label ? (value ? {value, label} : '') : value
                await this.setStateValuesForSearch(searchParams)
            }
        }

        setShowModal = () => {
            this.setState(prevState => ({
                showModal: !prevState.showModal
            }))
        }
        refundHandler = (data) => {
            try {

            } catch (e) {

            }

        }
        rejectSubmitHandler = async () => {
            try {
                await this.props.appointmentRejectRefund(appointmentSetupApiConstant.APPOINTMENT_REJECT_REFUND_DETAIL_BY_ID, this.state.refundRejectRequestDTO)
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.AppointmentRefundRejectReducer.refundRejectSuccess,
                    }
                })
            } catch (e) {
                console.log(e);
            }
        }
        refundRejectRemarksHandler = event => {
            const {name, value} = event.target
            let refundReject = {...this.state.refundRejectRequestDTO}
            refundReject[name] = value
            this.setState({
                refundRejectRequestDTO: refundReject
            })
        }

        onRejectHandler = async data => {
            this.props.clearAppointmentRefundRejectMessage()
            let refundReject = {...this.state.refundRejectRequestDTO}
            refundReject['appointmentId'] = data.appointmentId
            await this.setState({
                refundRejectRequestDTO: refundReject,
                rejectModalShow: true
            })
        }

        async componentDidMount() {
            await this.searchAppointment()
            await this.searchHospitalForDropDown()
        }

        render() {
            const {searchParameters, queryParams, totalRecords, showModal, previewData, alertMessageInfo, showAlert} = this.state

            const {
                isRefundListLoading,
                refundList,
                refundErrorMessage
            } = this.props.AppointmentRefundListReducer

            const {
                activeDoctorsByHospitalForDropdown,
                doctorDropdownErrorMessage
            } = this.props.DoctorDropdownReducer

            const {
                activeSpecializationListByHospital,
                dropdownErrorMessage
            } = this.props.SpecializationDropdownReducer

            const {hospitalsForDropdown} = this.props.HospitalDropdownReducer
            const {
                patientList,
                patientDropdownErrorMessage
            } = this.props.PatientDropdownListReducer
            return (
                <>
                    <ComposedComponent
                        {...this.props}
                        {...props}
                        searchHandler={{
                            handleEnter: this.handleEnterPress,
                            handleSearchFormChange: this.handleSearchFormChange,
                            resetSearch: this.handleSearchFormReset,
                            searchAppointment: this.searchAppointment,
                            hospitalsDropdown: hospitalsForDropdown,
                            doctorsDropdown: activeDoctorsByHospitalForDropdown,
                            doctorDropdownErrorMessage: doctorDropdownErrorMessage,
                            activeSpecializationList: activeSpecializationListByHospital,
                            specializationDropdownErrorMessage: dropdownErrorMessage,
                            searchParameters: searchParameters,
                            patientListDropdown: patientList,
                            patientDropdownErrorMessage: patientDropdownErrorMessage
                        }}
                        paginationProps={{
                            queryParams: queryParams,
                            totalRecords: totalRecords,
                            handlePageChange: this.handlePageChange
                        }}
                        tableHandler={{
                            isSearchLoading: isRefundListLoading,
                            appointmentRefundList: this.appendSNToTable(refundList),
                            searchErrorMessage: refundErrorMessage,
                            setShowModal: this.setShowModal,
                            showModal: showModal,
                            previewCall: this.previewCall,
                            previewData: previewData
                        }}
                    />
                    <CAlert
                        id="profile-add"
                        variant={alertMessageInfo.variant}
                        show={showAlert}
                        onClose={this.setShowAlert}
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

    return ConnectHoc(
        AppointmentRefundDetails,
        [
            'AppointmentRefundRejectReducer',
            'AppointmentRefundReducer',
            'AppointmentRefundListReducer',
            'SpecializationDropdownReducer',
            'DoctorDropdownReducer',
            'HospitalDropdownReducer',
            'PatientDropdownListReducer'
        ],
        {
            clearAppointmentRefundPending,
            fetchAppointmentRefundList,
            fetchActiveHospitalsForDropdown,
            fetchActiveDoctorsHospitalWiseForDropdown,
            fetchSpecializationHospitalWiseForDropdown,
            fetchPatientMetaList,
            clearAppointmentRefundRejectMessage,
            clearAppointmentRefundMessage,
            appointmentRefund,
            appointmentRejectRefund
        }
    )
};
export default AppointRefundHOC
