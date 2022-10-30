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
    createOrder: (data) => {
        const url = '/orders'
        return axiosClient.post(url, data)
    },
    createInvoiceFromQuote: (orderId) => {
        const url = '/orders/invoce'
        return axiosClient.put(url, null, { params: { orderId } })
    },
    createQuote: (orderId) => {
        const url = '/orders/quote'
        return axiosClient.put(url, null, { params: { orderId } })
    }
}

export default orderApi
