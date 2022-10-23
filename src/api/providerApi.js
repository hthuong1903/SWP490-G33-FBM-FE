import axios from 'axios'
import axiosClient from './axiosClient'
import { BASE_URL } from './constraint'

const providerApi = {
    getAllProvider: () => {
        const url = `/providers`
        return axiosClient.get(url)
    },

    createProvider: (params) => {
        const url = `${BASE_URL}/providers`
        return axios.post(url, params)
    },
    updateProvider: (params) => {
        const url = `${BASE_URL}/providers`
        return axios.put(url, params)
    },
    deleteProvider: (providerId) => {
        const url = `/providers/${providerId}`
        return axiosClient.delete(url)
    }
}

export default providerApi
