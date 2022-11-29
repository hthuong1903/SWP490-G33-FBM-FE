import axios from 'axios'
import axiosClient from './axiosClient'
import { BASE_URL } from './constraint'

const DataCustomerApi = {
    getAllDataCustomer: () => {
        const url = `customer_at_shop`
        return axiosClient.get(url)
    },
    createDataCustomer: (params) => {
        const url = `${BASE_URL}/signup_customer_at_shop`
        return axios.post(url, params)
    },
    updateDataCustomer: (params) => {
        const url = `${BASE_URL}/update_customer_at_shop`
        return axios.put(url, params)
    },
    deleteAccount: (userId) => {
        const url = `/delete?userId=${userId}`
        return axiosClient.put(url)
    }
}
export default DataCustomerApi