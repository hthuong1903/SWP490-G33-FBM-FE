// import axiosClient from './axiosClient'
import axios from 'axios'
const baseURL = 'https://provinces.open-api.vn/api'

export const axiosIgnoreDefaultSetting = axios.create()


const provincesApi = {
    getAllProvince: () => {
        const url = `/p`
        // return axios.get(baseURL + url)
         return axiosIgnoreDefaultSetting.get(baseURL + url)
    },

    getAllDistrictByProvinceId: (provinceId) => {
        const url = `/p/${provinceId}?depth=2`
        return axiosIgnoreDefaultSetting.get(baseURL + url)
    },
    getAllWardsByDistrictId: (districtId) => {
        const url = `/d/${districtId}?depth=2`
        return axiosIgnoreDefaultSetting.get(baseURL + url)
    },

    getProvinceById: async (provinceId) => {
        const url = `/p/${provinceId}`
        const response = await axiosIgnoreDefaultSetting.get(baseURL + url)
        return response.data.name
    },

    getDistrictById: async (districtId) => {
        const url = `/d/${districtId}`
        const response = await axiosIgnoreDefaultSetting.get(baseURL + url)
        return response.data.name
    },

    getWardsById: async (wardId) => {
        const url = `/w/${wardId}`
        const response = await axiosIgnoreDefaultSetting.get(baseURL + url)
        return response.data.name
    }
}

export default provincesApi
