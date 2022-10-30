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
    }
}

export default orderApi
