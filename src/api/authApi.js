import axios from 'axios'
import axiosClient from './axiosClient'
import { BASE_URL } from './constraint'

const authApi = {
    getAllUser: () => {
        const url = `/user`
        return axiosClient.get(url)
    },
    signUpCustomer: (data) => {
        const url = `${BASE_URL}/signup_customer`
        return axios.post(url, data)
    },
   
}

export default authApi
