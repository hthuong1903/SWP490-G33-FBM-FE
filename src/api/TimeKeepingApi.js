import axiosClient from "./axiosClient";

const TimeKeepingApi = {
    /**
     * Lấy ra bảng công chi tiết theo kì
     * @param {*} period_code định dạng MMyyyy
     * @returns 
     */
    getTimeSheetDetails: (period_code) => {
        const url = `/timesheetdetails`
        return axiosClient.get(url, { params: { period_code: period_code } })
    },

    /**
     * 
     * @param {*} period_code 
     * @returns 
     */
    createTimeSheetDetails: (period_code) => {
        const url = '/timesheetdetails'
        return axiosClient.post(url, null, { params: { period_code: period_code } })
    },

    /**
     * Update ngày làm việc cho từng nhân viên
     * @param {*} data timesheetDto - thông tin timeSheet của Employee
     * @returns 
     */
    updateTimesheetDetailPerEmployee: (data) => {
        const url = '/timesheetdetails'
        return axiosClient.put(url, null, {
            params: {
                employee_id: data.employee_id,
                date: data.date,
                period_code: data.period_code,
                case_day: data.case_day
            }
        })
    },

    /**
     * Lấy ra kỳ công theo ngày hiện tại
     * @param {*} period_code định dạng MMyyyy
     * @returns 
     */
    getTimeSheetPeriods: (period_code) => {
        const url = `/timesheetperiods/${period_code}`
        return axiosClient.get(url)
    },

    createTimeSheetPeriods: (data) => {
        const url = `/timesheetperiods`
        return axiosClient.post(url, data)
    },

    deleteTimeSheetPeriods: (period_code) => {
        const url = `/timesheetperiods/${period_code}`
        return axiosClient.get(url)
    },

}

export default TimeKeepingApi