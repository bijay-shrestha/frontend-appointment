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
} from '@frontend-appointment/helpers'
import './appointment-approval.scss'
import {DateTimeFormatterUtils} from '@frontend-appointment/helpers'

const {
    clearAppointmentRefundPending,
    fetchAppointmentApprovalList
    //downloadExcelForHospitals
} = AppointmentDetailsMiddleware;

const {fetchActiveDoctorsForDropdown} = DoctorMiddleware;
const {
    fetchSpecializationForDropdown
} = SpecializationSetupMiddleware;
const {fetchPatientMetaList} = PatientDetailsMiddleware;
const AppointApprovalHOC = (ComposedComponent, props, type) => {
    const {
        appointmentSetupApiConstant,
        hospitalSetupApiConstants,
        doctorSetupApiConstants,
        specializationSetupAPIConstants,
        patientSetupApiConstant
    } = AdminModuleAPIConstants;

    class AppointmentApprovalDetails extends React.PureComponent {
        state = {
            searchParameters: {
                appointmentNumber: '',
                fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
                toDate: new Date(),
                patientMetaInfoId: '',
                doctorId: '',
                patientType: '',
                specializationId: '',
                patientCategory: ''
            },
            queryParams: {
                page: 0,
                size: 10
            },
            totalRecords: 0,
            showModal: false,
            previewData: {}
        };

        handleEnterPress = event => {
            EnterKeyPressUtils.handleEnter(event)
        };

        // searchHospitalForDropDown = async () => {
        //     try {
        //         await this.props.fetchActiveHospitalsForDropdown(
        //             hospitalSetupApiConstants.FETCH_HOSPITALS_FOR_DROPDOWN
        //         )
        //     } catch (e) {
        //         console.log(e)
        //     }
        // };

        previewCall = data => {
            this.setState({
                previewData: data,
                showModal: true
            })
        };

        setShowModal = () => {
            this.setState(prevState => ({
                showModal: !prevState.showModal
            }))
        };

        searchAppointment = async page => {
            const {
                appointmentNumber,
                fromDate,
                toDate,
                patientMetaInfoId,
                patientType,
                specializationId,
                doctorId,
                patientCategory
            } = this.state.searchParameters;
            let searchData = {
                appointmentNumber,
                fromDate,
                toDate,
                patientMetaInfoId: patientMetaInfoId.value || '',
                patientType: patientType.value || '',
                specializationId: specializationId.value || '',
                doctorId: doctorId.value || '',
                patientCategory: patientCategory.value || ''
            };

            let updatedPage =
                this.state.queryParams.page === 0
                    ? 1
                    : page
                    ? page
                    : this.state.queryParams.page;
            await this.props.fetchAppointmentApprovalList(
                appointmentSetupApiConstant.APPOINTMENT_APPROVAL_LIST,
                {
                    page: updatedPage,
                    size: this.state.queryParams.size
                },
                searchData
            );
            await this.setState({
                totalRecords: this.props.AppointmentApprovalListReducer.approvalList
                    .length
                    ? this.props.AppointmentApprovalListReducer.totalItems
                    : 0,
                queryParams: {
                    ...this.state.queryParams,
                    page: updatedPage
                }
            })
        };

        appendSNToTable = refundList => {
            let newRefundList = [];

            newRefundList =
                refundList.length &&
                refundList.map((spec, index) => ({
                    ...spec,
                    sN: index + 1
                }));
            return newRefundList
        };

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            });
            this.searchAppointment()
        };

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
                    patientCategory: ''
                }
            });
            this.searchAppointment()
        };

        handleHospitalChangeReset = async () => {
            await this.setState({
                searchParameters: {
                    ...this.state.searchParameters,
                    patientMetaInfoId: '',
                    patientType: '',
                    specializationId: '',
                    doctorId: '',
                    patientCategory: ''
                }
            })
        };

        setStateValuesForSearch = searchParams => {
            this.setState({
                searchParameters: searchParams
            })
        };

        callApiForHospitalChange = async () => {
            await this.handleHospitalChangeReset();

            this.props.fetchActiveDoctorsForDropdown(
                doctorSetupApiConstants.FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN
            );

            this.props.fetchSpecializationForDropdown(
                specializationSetupAPIConstants.SPECIALIZATION_BY_HOSPITAL,
                hospitalId
            );

            this.props.fetchPatientMetaList(
                patientSetupApiConstant.ACTIVE_PATIENT_META_INFO_DETAILS,
                0
            )
        };

        handleSearchFormChange = async (event, field) => {
            if (event) {
                let fieldName, value, label;
                if (field) {
                    fieldName = field;
                    value = event
                } else {
                    fieldName = event.target.name;
                    value = event.target.value;
                    label = event.target.label;
                }

                let newSearchParams = {...this.state.searchParameters};

                newSearchParams[fieldName] = label
                    ? value
                        ? {value, label}
                        : ''
                    : value;
                await this.setStateValuesForSearch(newSearchParams)
            }
        };

        async componentDidMount() {
            await this.searchAppointment();
            await this.searchHospitalForDropDown()
        }

        render() {
            const {
                searchParameters,
                queryParams,
                totalRecords,
                showModal,
                previewData
            } = this.state;

            const {
                approvalList,
                isApprovalListLoading,
                approvalErrorMessage
            } = this.props.AppointmentApprovalListReducer;

            const {
                activeDoctorsForDropdown,
                doctorDropdownErrorMessage
            } = this.props.DoctorDropdownReducer;

            const {
                allActiveSpecializationList,
                dropdownErrorMessage
            } = this.props.SpecializationDropdownReducer;

            const {
                patientList,
                patientDropdownErrorMessage
            } = this.props.PatientDropdownListReducer;

            return (
                <div id="appointment-approval">
                    <ComposedComponent
                        {...this.props}
                        {...props}
                        searchHandler={{
                            handleEnter: this.handleEnterPress,
                            handleSearchFormChange: this.handleSearchFormChange,
                            resetSearch: this.handleSearchFormReset,
                            searchAppointment: this.searchAppointment,
                            doctorsDropdown: activeDoctorsForDropdown,
                            doctorDropdownErrorMessage: doctorDropdownErrorMessage,
                            activeSpecializationList: allActiveSpecializationList,
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
                            isSearchLoading: isApprovalListLoading,
                            appointmentApprovalList: this.appendSNToTable(approvalList),
                            searchErrorMessage: approvalErrorMessage,
                            setShowModal: this.setShowModal,
                            showModal: showModal,
                            previewCall: this.previewCall,
                            previewData: previewData
                        }}
                    />
                </div>
            )
        }
    }

    return ConnectHoc(
        AppointmentApprovalDetails,
        [
            'AppointmentApprovalListReducer',
            'SpecializationDropdownReducer',
            'DoctorDropdownReducer',
            'PatientDropdownListReducer'
        ],
        {
            clearAppointmentRefundPending,
            fetchActiveDoctorsForDropdown,
            fetchSpecializationForDropdown,
            fetchPatientMetaList,
            fetchAppointmentApprovalList
        }
    )
};
export default AppointApprovalHOC
