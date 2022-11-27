import axios from 'axios'
import axiosClient from './axiosClient'
import { BASE_URL } from './constraint'

const authApi = {
    getAllUser: () => {
        const url = `/user`
        return axiosClient.get(url)
    },
    getUserInternal:()=>{
        const url = `/user_internal`
        return axiosClient.get(url)
    },
    signUpCustomer: (data) => {
        const url = `${BASE_URL}/signup_customer`
        return axios.post(url, data)
    },
    verifyEmail: (verifyCode, email) => {
        const url = `/verify?verifyCode=${verifyCode}&email=${email}`
        return axiosClient.get(url)
    },
    signIn: (data) => {
        const url = `${BASE_URL}/signin`
        return axios.post(url, data)
    }
}

export default authApi
