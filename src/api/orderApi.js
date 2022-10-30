import axios from 'axios'
import axiosClient from './axiosClient'
import { BASE_URL } from './constraint'

const orderApi = {
    getAllOrder: (status) => {
        const url = `/orders?status=${status}`
        return axiosClient.get(url)
    },
    getAllOrderById: (orderId) => {
        const url = `/orders/detail?orderId=${orderId}`
        return axiosClient.get(url)
    }, 
    createOrder:(data)=>{
        const url = `/orders`
        return axios.post(`${BASE_URL}` + url, data)
    },
    deleteOrder:(orderId)=>{
        const url = `/orders?orderId=${orderId}`
        return axios.delete(`${BASE_URL}` + url)
    },
    createQuote:(orderId, data)=>{
        const url = `/orders/quote?orderId=${orderId}`
        return axios.put(`${BASE_URL}` + url, data)
    },

}

export default orderApi
