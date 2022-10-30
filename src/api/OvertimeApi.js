import axiosClient from './axiosClient'

const OvertimeApi = {
    createOvertime: (period_code) => {
        const url = `/overtime`
        return axiosClient.post(url, null, { params: { period_code } })
    },
    updateOvertime: (data) => {
        const url = '/overtime'
        return axiosClient.put(url, data)
    },
    getOvertimeByPeriodCode: (period_code) => {
        const url = '/overtime/period'
        return axiosClient.post(url, { params: { period_code } })
    },
    getOvertimeByPeriodCodeAndEmployee: (period_code, employee_id) => {
        const url = '/overtime/period/employee'
        return axiosClient.get(url, { params: { period_code, employee_id } })
    },
    deleteOvertime: (id) => {
        const url = `/overtime/${id}`
        return axiosClient.delete(url)
    },
}

export default OvertimeApi
