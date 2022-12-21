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

    createInvoice: (orderId) => {
        const url = `/orders/invoice?orderId=${orderId}`
        return axiosClient.put(url)
    },

    createQuote: (orderId) => {
        const url = '/orders/quote'
        return axiosClient.put(url, null, { params: { orderId } })
    },

    createOrderT: (data) => {
        const url = `/orders`
        return axios.post(`${BASE_URL}` + url, data)
    },

    deleteOrderT: (orderId) => {
        const url = `/orders?orderId=${orderId}`
        return axios.delete(`${BASE_URL}` + url)
    },

    createQuoteT: (orderId, data) => {
        const url = `/orders/quote?orderId=${orderId}`
        return axios.put(`${BASE_URL}` + url, data)
    },

    deleteOrder: (orderId) => {
        const url = `/orders?orderId=${orderId}`
        return axiosClient.delete(url)
    },


    convert: (number) => {
        const url = `http://forum.vdevs.net/nossl/mtw.php?number=${number}`
        return axiosClient.get(url)
    },

    createCancelOrder: (data) => {
        const url = `/orders/cancel`
        return axios.post(`${BASE_URL}` + url, data)
    }

}

export default orderApi
