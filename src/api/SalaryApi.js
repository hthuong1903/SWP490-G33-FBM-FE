import axiosClient from './axiosClient'

const SalaryApi = {
    getSalary: (period_code) => {
        const url = `/salaries`
        return axiosClient.get(url, { params: { period_code } })
    }
}

export default SalaryApi
