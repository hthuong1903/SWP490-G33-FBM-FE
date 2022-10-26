import axiosClient from './axiosClient'

const AllowanceApi = {
    createAllowance: (period_code) => {
        const url = `/allowance_detail`
        return axiosClient.post(url, null, { params: { period_code } })
    },
    updateAllowance: (data) => {
        const url = '/allowance_detail'
        return axiosClient.put(url, data)
    },
    geAllowancePeriodCode: (period_code) => {
        const url = '/allowance_detail/period'
        return axiosClient.get(url, { params: { period_code } })
    },

    getAllowance: () => {
        const url = '/allowance'
        return axiosClient.get(url)
    },

    updateAllowanceDetail: (data) => {
        const url = '/allowance'
        return axiosClient.put(url, data)
    },

    createAllowanceDetail: (data) => {
        const url = '/allowance'
        return axiosClient.post(url, data)
    },

    deleteAllowance: (id) => {
        const url = `/allowance/${id}`
        return axiosClient.delete(url)
    },


    getAllowanceDetailByPeriodCodeAndEmployee: (period_code, employee_id) => {
        const url = `/allowance_detail/period/employee`
        return axiosClient.get(url, { params: { period_code, employee_id } })
    },

    deleteAllowanceDetail: (id) => {
        const url = `/allowance_detail/${id}`
        return axiosClient.delete(url)
    }
}

export default AllowanceApi
