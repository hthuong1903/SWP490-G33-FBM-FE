// import axiosClient from './axiosClient'
import axios from 'axios'
const baseURL = 'https://provinces.open-api.vn/api'

const provincesApi = {
    getAllProvince: () => {
        const url = `/p`
        return axios.get(baseURL + url)
    },

    getAllDistrictByProvinceId: (provinceId) => {
        const url = `/p/${provinceId}?depth=2`
        return axios.get(baseURL + url)
    },
    getAllWardsByDistrictId: (districtId) => {
        const url = `/d/${districtId}?depth=2`
        return axios.get(baseURL + url)
    },

    getProvinceById: async (provinceId) => {
        const url = `/p/${provinceId}`
        const response = await axios.get(baseURL + url)
        return response.data.name
    },
    getDistrictById: async (districtId) => {
        const url = `/d/${districtId}`
        const response = await axios.get(baseURL + url)
        return response.data.name
    },
    getWardsById: async (wardId) => {
        const url = `/w/${wardId}`
        const response = await axios.get(baseURL + url)
        return response.data.name
    }
}

export default provincesApi
