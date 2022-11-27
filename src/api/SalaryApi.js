import axiosClient from './axiosClient'

const SalaryApi = {
    getSalary: (period_code) => {
        const url = `/salaries`
        return axiosClient.get(url, { params: { period_code } })
    },
    sendEmailSalary: (period_code) => {
        const url = '/send_email/salary'
        return axiosClient.get(url, { params: { period_code } })
    }
}

export default SalaryApi
