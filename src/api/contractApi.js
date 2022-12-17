import axios from 'axios'
import axiosClient from './axiosClient'
import { BASE_URL } from './constraint'

const contractApi = {
    getAllContracts: (expired) => {
        const url = `/contracts?expired=${expired}`
        return axiosClient.get(url)
    },
    deleteContract: (contractId) => {
        const url = `/contracts/${contractId}`
        return axiosClient.delete(url)
    },
    createContract: (params) => {
        const url = `/contracts`
        return axios.post(`${BASE_URL}` + url, params)
    },
    updateContract: (params) => {
        const url = `/contracts`
        return axios.put(`${BASE_URL}` + url, params)
    }
}

export default contractApi
