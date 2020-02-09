export const prepareWeekdaysData = (weekdays) => {
    return weekdays.length ? weekdays.map(day => {
        return {
            weekDaysId: day.value,
            weekDaysName: day.label,
            startTime: "",
            endTime: "",
            dayOffStatus: 'N'
        }
    }) : [];
};
