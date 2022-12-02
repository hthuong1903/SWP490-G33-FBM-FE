import axiosClient from './axiosClient'

const OvertimeApi = {
    updateOvertime: (data) => {
        const url = '/overtime'
        return axiosClient.put(url, data)
    },
    getOvertimeByPeriodCode: (period_code) => {
        const url = `/overtime?period_code=${period_code}`
        return axiosClient.get(url)
    },
    getOvertimeByPeriodCodeAndEmployee: (period_code, employee_id) => {
        const url = '/overtime/period/employee'
        return axiosClient.get(url, { params: { period_code, employee_id } })
    },
    deleteOvertime: (overtime_id) => {
        const url = `/overtime/${overtime_id}`
        return axiosClient.delete(url)
    },
}

export default OvertimeApi
