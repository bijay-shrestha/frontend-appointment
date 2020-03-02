import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {DashboardDetailsMiddleware} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {DateTimeFormatterUtils} from '@frontend-appointment/helpers'
import './admin-dashboard.scss'

const {
    fetchDashboardAppointmentStatisticsList,
    fetchDashboardRegisteredPatientList,
    fetchDashboardRegisteredPatientListForClient,
    fetchDashboardRevenueDayList,
    fetchDashboardRevenueMonthList,
    fetchDashboardRevenueRefundList,
    fetchDashboardRevenueWeekList,
    fetchDashboardRevenueYearList
} = DashboardDetailsMiddleware;
const {
getOnlyDateFromDateAndTime,
subtractDate
}=DateTimeFormatterUtils
const ClientDashboardHoc = (ComposedComponent, props, type) => {
    const {
        DashboardApiConstant
    } = AdminModuleAPIConstants;

    class ClientDashboardHoc extends React.PureComponent {
        state = {
            searchParameterForGenerateRevenue: {
                currentToDate: new Date(),
                currentFromDate:getOnlyDateFromDateAndTime(subtractDate(new Date(), 1)),
                previousToDate: getOnlyDateFromDateAndTime(subtractDate(new Date(), 2)),
                previousFromDate:getOnlyDateFromDateAndTime(subtractDate(new Date(), 3)),
            },
            searchParamsForOverallAppoinment: {
                fromDate:getOnlyDateFromDateAndTime(subtractDate(new Date(), 7)),
                toDate: getOnlyDateFromDateAndTime(new Date()),
            },
            searchParameterForRevenueTrend: {
                revFromDate: getOnlyDateFromDateAndTime(subtractDate(new Date(), 7)),
                revToDate: getOnlyDateFromDateAndTime(new Date()),
            },
            revenueFilter: 'W',
            appointmentFilter: 'W',
        };

        fetchDashboardData = statsType => {
            const {
                fromDate,
                toDate
            } = this.state.searchParamsForOverallAppoinment;

            const {
                revFromDate,
                revToDate
            } = this.state.searchParameterForRevenueTrend;

            const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
            const hospitalId = adminInfo.hospitalId;

            if (!statsType || statsType !== 'refund')
                this.props.fetchDashboardAppointmentStatisticsList(
                    DashboardApiConstant.OVERALL_APPOINTMENTS,
                    {
                        fromDate:getOnlyDateFromDateAndTime(fromDate),
                        toDate:getOnlyDateFromDateAndTime(toDate)
                    }
                );
            if (!statsType || statsType === 'refund')
                this.props.fetchDashboardRevenueRefundList(
                    DashboardApiConstant.REVENUE_STATISTICS,
                    {
                        fromDate: getOnlyDateFromDateAndTime(revFromDate),
                        toDate: getOnlyDateFromDateAndTime(revToDate)
                    }
                );
            if (!statsType) {
                this.props.fetchDashboardRegisteredPatientListForClient(
                    DashboardApiConstant.REGISTERED_PATIENTS
                );

                this.props.fetchDashboardRevenueDayList(
                    DashboardApiConstant.REVENUE_GENERATED,
                    {
                        currentToDate: getOnlyDateFromDateAndTime( new Date()),
                        currentFromDate: getOnlyDateFromDateAndTime(subtractDate(new Date(), 1)),
                        previousToDate:getOnlyDateFromDateAndTime(subtractDate(new Date(), 2)),
                        previousFromDate:getOnlyDateFromDateAndTime(subtractDate(
                            new Date(),
                            3
                        )),
                    }
                );
                this.props.fetchDashboardRevenueWeekList(
                    DashboardApiConstant.REVENUE_GENERATED,
                    {
                        currentToDate: getOnlyDateFromDateAndTime( new Date()),
                        currentFromDate: getOnlyDateFromDateAndTime(subtractDate(new Date(), 7)),
                        previousToDate:getOnlyDateFromDateAndTime(subtractDate(new Date(), 8)),
                        previousFromDate: getOnlyDateFromDateAndTime(subtractDate(
                            new Date(),
                            15
                        )),
                    }
                );
                this.props.fetchDashboardRevenueMonthList(
                    DashboardApiConstant.REVENUE_GENERATED,
                    {
                        currentToDate: getOnlyDateFromDateAndTime(new Date()),
                        currentFromDate: getOnlyDateFromDateAndTime(subtractDate(
                            new Date(),
                            30
                        )),
                        previousToDate: getOnlyDateFromDateAndTime(subtractDate(new Date(), 31).getDate()),
                        previousFromDate:getOnlyDateFromDateAndTime(subtractDate(
                            new Date(),
                            61
                        )),
                    }
                );

                this.props.fetchDashboardRevenueYearList(
                    DashboardApiConstant.REVENUE_GENERATED,
                    {
                        currentToDate: getOnlyDateFromDateAndTime(new Date()),
                        currentFromDate: getOnlyDateFromDateAndTime(subtractDate(
                            new Date(),
                            365
                        )),
                        previousToDate:  getOnlyDateFromDateAndTime(subtractDate(
                            new Date(),
                            366
                        )),
                        previousFromDate: getOnlyDateFromDateAndTime(subtractDate(
                            new Date(),
                            731
                        )),
                    }
                )
            }
        };

        filterDateAccordingToDayFilter = dayFilter => {
            let searchParameterChange = {
                fromDate: '',
                toDate: '',
                hospitalId: this.state.searchParamsForOverallAppoinment.hospitalId
            };
            switch (dayFilter) {
                case 'D':
                    searchParameterChange = {
                        fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 1),
                        toDate: new Date(),
                        hospitalId: searchParameterChange.hospitalId
                    };
                    break;
                case 'W':
                    searchParameterChange = {
                        fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
                        toDate: new Date(),
                        hospitalId: searchParameterChange.hospitalId
                    };
                    break;
                case 'M':
                    searchParameterChange = {
                        fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 30),
                        toDate: new Date(),
                        hospitalId: searchParameterChange.hospitalId
                    };
                    break;
                case 'Y':
                    searchParameterChange = {
                        fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 365),
                        toDate: new Date(),
                        hospitalId: searchParameterChange.hospitalId
                    };
                    break
            }
            return searchParameterChange
        };

        onPillsClickHandler = async (dayFilter, type) => {
            let searchParameter = this.filterDateAccordingToDayFilter(dayFilter);
            if (type === 'refund') {
                if (this.state.revenueFilter !== dayFilter) {
                    await this.setState({
                        searchParameterForRevenueTrend: {
                            revFromDate: searchParameter.fromDate,
                            revToDate: searchParameter.toDate,
                            hospitalId: searchParameter.hospitalId,
                        },
                        revenueFilter: dayFilter
                    });
                    this.fetchDashboardData(type)
                }
            } else {
                if (this.state.appointmentFilter !== dayFilter) {
                    await this.setState({
                        searchParamsForOverallAppoinment: {
                            ...searchParameter,
                        },
                        appointmentFilter: dayFilter
                    });
                    this.fetchDashboardData(type)
                }
            }

        };

        handleHospitalChange = async (event, field) => {
            let searchParams1 = {...this.state.searchParameterForGenerateRevenue};
            let searchParams = {
                ...this.state.searchParamsForOverallAppoinment
            };
            let searchParams3 = {...this.state.searchParameterForRevenueTrend};
            let fieldName, value, label;
            fieldName = event.target.name;
            value = event.target.value;
            label = event.target.label;
            searchParams[fieldName] = label ? (value ? {value, label} : '') : value
            searchParams1[fieldName] = label ? (value ? {value, label} : '') : value
            searchParams3[fieldName] = label ? (value ? {value, label} : '') : value
            await this.setState({
                searchParamsForOverallAppoinment: searchParams,
                searchParameterForGenerateRevenue: searchParams1,
                searchParameterForRevenueTrend: searchParams3
            });
        };

        componentDidMount() {
            this.fetchDashboardData();
        }

        render() {
            const {
                searchParameterForGenerateRevenue,
                searchParamsForOverallAppoinment,
                searchParameterForRevenueTrend,
                hospitalList
            } = this.state;
            const {revFromDate, revToDate} = searchParameterForRevenueTrend;

            const {
                currentToDate,
                previousFromDate,
                hospitalId
            } = searchParameterForGenerateRevenue;
            const {fromDate, toDate} = searchParamsForOverallAppoinment;
            const {
                isAppointmentStatsLoading,
                appointmentStatsData,
                appointmentStatsErrorMessage
            } = this.props.DashboardAppointmentStatisticsReducer;

            const {
                isRevenueStatsLoading,
                revenueStatsData,
                revenueStatsErrorMessage
            } = this.props.DashboardRevenueStatisticsReducer;

            const {
                isRegisteredPatientLoading,
                registeredPatientsData,
                registeredPatientsErrorMessage
            } = this.props.DashboardRegisteredPatientReducer;
            const {
                isRevenueGeneratedDayLoading,
                revenueGeneratedDayData,
                revenueGeneratedDayErrorMessage
            } = this.props.DashboardRevenueGeneratedDayReducer;

            const {
                isRevenueGeneratedMonthLoading,
                revenueGeneratedMonthData,
                revenueGeneratedMonthErrorMessage
            } = this.props.DashboardRevenueGeneratedMonthReducer;

            const {
                isRevenueGeneratedWeekLoading,
                revenueGeneratedWeekData,
                revenueGeneratedWeekErrorMessage
            } = this.props.DashboardRevenueGeneratedWeekReducer;
            const {
                isRevenueGeneratedYearLoading,
                revenueGeneratedYearData,
                revenueGeneratedYearErrorMessage
            } = this.props.DashboardRevenueGeneratedYearReducer;
            return (
                <ComposedComponent
                    {...this.props}
                    {...props}
                    generateRevenue={{
                        previousFromDate: previousFromDate,
                        currentToDate: currentToDate,
                        hospitalId: hospitalId,
                        isRevenueGeneratedDayLoading: isRevenueGeneratedDayLoading,
                        revenueGeneratedDayData: revenueGeneratedDayData,
                        revenueGeneratedDayErrorMessage: revenueGeneratedDayErrorMessage,
                        isRevenueGeneratedMonthLoading: isRevenueGeneratedMonthLoading,
                        revenueGeneratedMonthData: revenueGeneratedMonthData,
                        revenueGeneratedMonthErrorMessage: revenueGeneratedMonthErrorMessage,
                        isRevenueGeneratedWeekLoading: isRevenueGeneratedWeekLoading,
                        revenueGeneratedWeekData: revenueGeneratedWeekData,
                        revenueGeneratedWeekErrorMessage: revenueGeneratedWeekErrorMessage,
                        isRevenueGeneratedYearLoading: isRevenueGeneratedYearLoading,
                        revenueGeneratedYearData: revenueGeneratedYearData,
                        revenueGeneratedYearErrorMessage: revenueGeneratedYearErrorMessage
                    }}
                    appointmentList={{
                        isAppointmentStatsLoading: isAppointmentStatsLoading,
                        appointmentStatsData: appointmentStatsData,
                        appointmentStatsErrorMessage: appointmentStatsErrorMessage,
                        fromDate: {fromDate},
                        toDate: {toDate}
                    }}
                    revenueStatistics={{
                        isRevenueStatsLoading: isRevenueStatsLoading,
                        revenueStatsData: revenueStatsData,
                        revenueStatsErrorMessage: revenueStatsErrorMessage,
                        fromDate: {revFromDate},
                        toDate: {revToDate}
                    }}
                    registeredPatients={{
                        isRegisteredPatientLoading: isRegisteredPatientLoading,
                        registeredPatientsData: registeredPatientsData,
                        registeredPatientsErrorMessage: registeredPatientsErrorMessage
                    }}
                    onPillsClickHandler={this.onPillsClickHandler}
                    handleHospitalChange={this.handleHospitalChange}
                    hospitalDropdown={hospitalList}
                    hospitalId={hospitalId}
                    revenueFilter={this.state.revenueFilter}
                    appointmentFilter={this.state.appointmentFilter}
                />
            )
        }
    }

    return ConnectHoc(
        ClientDashboardHoc,
        [
            'DashboardAppointmentStatisticsReducer',
            'DashboardRegisteredPatientReducer',
            'DashboardRevenueGeneratedDayReducer',
            'DashboardRevenueGeneratedMonthReducer',
            'DashboardRevenueGeneratedWeekReducer',
            'DashboardRevenueGeneratedYearReducer',
            'DashboardRevenueStatisticsReducer'
        ],
        {
            fetchDashboardAppointmentStatisticsList,
            fetchDashboardRegisteredPatientList,
            fetchDashboardRegisteredPatientListForClient,
            fetchDashboardRevenueDayList,
            fetchDashboardRevenueMonthList,
            fetchDashboardRevenueRefundList,
            fetchDashboardRevenueWeekList,
            fetchDashboardRevenueYearList,
        }
    )
};
export default ClientDashboardHoc
