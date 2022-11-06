import axios from 'axios'
import axiosClient from './axiosClient'
import { BASE_URL } from './constraint'
const baseURL = 'https://provinces.open-api.vn/api'
const AccountApi = {
    getAllAccount: () => {
        const url = `/user_internal`
        return axiosClient.get(url)
    },
    getAllAccountCustomer: () => {
        const url = `/user`
        return axiosClient.get(url)
    },

    createAccount: (params) => {
        const url = `${BASE_URL}/signup_internal`
        return axios.post(url, params)
    },
    // updateManagerAccount: (params) => {
    //     const url = `${BASE_URL}/staff`
    //     return axios.put(url, params)
    // },
    deleteAccount: (userId) => {
        const url = `/delete?userId=${userId}`
        return axiosClient.put(url)
    },
    resetPassword: (userId) => {
        const url =  `reset_password?userId=${userId}`
        return axiosClient.post(url)
    }
}

export default AccountApi