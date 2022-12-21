import axios from 'axios'
import axiosClient from './axiosClient'
import { BASE_URL } from './constraint'

const SalaryApi = {
    getSalary: (period_code) => {
        const url = `/salaries`
        return axiosClient.get(url, { params: { period_code } })
    },
    sendEmailSalary: (period_code) => {
        const url = '/send_email/salary'
        return axiosClient.get(url, { params: { period_code } })
    },
    sendEmailSalaryEmployee: (data) => {
        const url = '/send_email/salary/employee'
        // return axiosClient.post(url, data)
        return axios.post(`${BASE_URL}` + url, data)
    }
}

export default SalaryApi
