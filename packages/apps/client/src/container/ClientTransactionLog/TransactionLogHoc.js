import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    AppointmentDetailsMiddleware,
    DoctorMiddleware,
    HospitalSetupMiddleware,
    PatientDetailsMiddleware,
    SpecializationSetupMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {DateTimeFormatterUtils, EnterKeyPressUtils} from '@frontend-appointment/helpers'
import './transaction-log.scss'

const {
    clearAppointmentRefundPending,
    fetchAppointmentLogList
} = AppointmentDetailsMiddleware;

const {fetchActiveDoctorsForDropdown} = DoctorMiddleware;
const {fetchSpecializationForDropdown} = SpecializationSetupMiddleware;
const {fetchPatientMetaDropdownForClient} = PatientDetailsMiddleware;

const TransactionLogHoc = (ComposedComponent, props, type) => {
    const {
        appointmentSetupApiConstant,
        doctorSetupApiConstants,
        specializationSetupAPIConstants,
        patientSetupApiConstant
    } = AdminModuleAPIConstants;

    class TransactionLogDetails extends React.PureComponent {
        state = {
            searchParameters: {
                transactionNumber: '',
                fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
                toDate: new Date(),
                patientMetaInfoId: '',
                doctorId: '',
                patientType: '',
                specializationId: '',
                appointmentCategory: '',
                status: {value: 'All', label: "All"}
            },
            queryParams: {
                page: 0,
                size: 10
            },
            totalRecords: 0,
            showModal: false,
            previewData: {}
        }

        handleEnterPress = event => {
            EnterKeyPressUtils.handleEnter(event)
        }

        searchAppointment = async page => {
            const {
                transactionNumber,
                fromDate,
                toDate,
                patientMetaInfoId,
                patientType,
                specializationId,
                doctorId,
                appointmentCategory,
                status,

            } = this.state.searchParameters
            let searchData = {
                transactionNumber,
                fromDate,
                toDate,
                patientMetaInfoId: patientMetaInfoId.value || '',
                patientType: patientType.value || '',
                specializationId: specializationId.value || '',
                doctorId: doctorId.value || '',
                appointmentCategory: appointmentCategory.value || '',
                status: status.value === "All" ? "" : status.value
            }

            let updatedPage =
                this.state.queryParams.page === 0
                    ? 1
                    : page
                    ? page
                    : this.state.queryParams.page
            await this.props.fetchAppointmentLogList(
                appointmentSetupApiConstant.TRANSACTION_LOG_LIST,
                {
                    page: updatedPage,
                    size: this.state.queryParams.size
                },
                searchData
            )
            await this.setState({
                totalRecords: this.props.AppointmentLogListReducer.logList.length
                    ? this.props.AppointmentLogListReducer.totalItems
                    : 0,
                queryParams: {
                    ...this.state.queryParams,
                    page: updatedPage
                }
            })
        }

        appendSNToTable = logList => {
            let newLogList = []
            newLogList =
                logList.length &&
                logList.map((spec, index) => ({
                    ...spec,
                    sN: index + 1,
                    status: spec.status || 'N/A',
                    appointmentDate: spec.appointmentDate || 'N/A',
                    appointmentNumber: spec.appointmentNumber || 'N/A',
                    appointmentTime: spec.appointmentTime || 'N/A',
                    esewaId: spec.esewaId || 'N/A',
                    registrationNumber: spec.registrationNumber || 'N/A',
                    patientName: spec.patientName || 'N/A',
                    patientAddress: spec.patientAddress || 'N/A',
                    gender: spec.patientGender.split('')[0] || 'N/A',
                    patientGender: spec.patientGender,
                    age: spec.patientAge.slice(0, 4) || 'N/A',
                    patientAge: spec.patientAge.slice(0, 4),
                    patientDob: spec.patientDob || 'N/A',
                    isSelf: spec.isSelf || 'N/A',
                    isRegistered: spec.isRegistered || 'N/A',
                    mobileNumber: spec.mobileNumber || 'N/A',
                    doctorName: spec.doctorName || 'N/A',
                    specializationName: spec.specializationName || 'N/A',
                    transactionNumber: spec.transactionNumber || 'N/A',
                    appointmentAmount: spec.appointmentAmount || '0',
                    refundAmount: spec.refundAmount || '0',
                    transactionDate: spec.transactionDate || 'N/A'
                }));

            return newLogList;
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
                    patientMetaInfoId: '',
                    patientType: '',
                    specializationId: '',
                    doctorId: '',
                    appointmentCategory: '',
                    status: {value: 'All', label: "All"}
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

        handleHospitalChangeReset = async () => {
            await this.setState({
                searchParameters: {
                    ...this.state.searchParameters,
                    patientMetaInfoId: '',
                    patientType: '',
                    specializationId: '',
                    doctorId: '',
                    appointmentCategory: ''
                }
            })
        }

        callApiForHospitalChange = async () => {
            this.props.fetchActiveDoctorsForDropdown(
                doctorSetupApiConstants.FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN
            );
            this.props.fetchSpecializationForDropdown(
                specializationSetupAPIConstants.ACTIVE_DROPDOWN_SPECIALIZATION
            );
            this.props.fetchPatientMetaDropdownForClient(
                patientSetupApiConstant.ACTIVE_PATIENT_META_INFO_DETAILS
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
                }
                let searchParams = {...this.state.searchParameters}

                let newSearchParams = {...this.state.searchParameters}

                newSearchParams[fieldName] = label
                    ? value
                        ? {value, label}
                        : ''
                    : value
                await this.setStateValuesForSearch(newSearchParams)
            }
        }

        setShowModal = () => {
            this.setState(prevState => ({
                showModal: !prevState.showModal
            }))
        }

        componentDidMount() {
            this.searchAppointment()
            this.callApiForHospitalChange()
        }

        render() {
            const {
                searchParameters,
                queryParams,
                totalRecords,
                showModal,
                previewData
            } = this.state

            const {
                isLogListLoading,
                logList,
                logErrorMessage,
                appointmentStatistics
            } = this.props.AppointmentLogListReducer

            const {
                activeDoctorsByHospitalForDropdown,
                doctorDropdownErrorMessage
            } = this.props.DoctorDropdownReducer

            const {
                activeSpecializationListByHospital,
                dropdownErrorMessage
            } = this.props.SpecializationDropdownReducer

            const {
                patientList,
                patientDropdownErrorMessage
            } = this.props.PatientDropdownListReducer
            return (
                <div id="appointment-log">
                    <ComposedComponent
                        {...this.props}
                        {...props}
                        searchHandler={{
                            handleEnter: this.handleEnterPress,
                            handleSearchFormChange: this.handleSearchFormChange,
                            resetSearch: this.handleSearchFormReset,
                            searchAppointment: this.searchAppointment,
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
                            isSearchLoading: isLogListLoading,
                            appointmentLogList: this.appendSNToTable(logList),
                            searchErrorMessage: logErrorMessage,
                            setShowModal: this.setShowModal,
                            showModal: showModal,
                            previewCall: this.previewCall,
                            previewData: previewData,
                        }}
                        appointmentStatistics={appointmentStatistics}
                    />
                </div>
            )
        }
    }

    return ConnectHoc(
        TransactionLogDetails,
        [
            'AppointmentLogListReducer',
            'SpecializationDropdownReducer',
            'DoctorDropdownReducer',
            'PatientDropdownListReducer'
        ],
        {
            clearAppointmentRefundPending,
            fetchAppointmentLogList,
            fetchActiveDoctorsForDropdown,
            fetchSpecializationForDropdown,
            fetchPatientMetaDropdownForClient
        }
    )
}
export default TransactionLogHoc
