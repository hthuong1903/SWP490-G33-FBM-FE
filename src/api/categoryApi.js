import axios from 'axios'
import axiosClient from './axiosClient'
import { BASE_URL } from './constraint'

const categoryApi = {
    getAllCategory: () => {
        const url = `/categorys`
        return axiosClient.get(url)
    },

    deleteCategory: (categoryId) => {
        const url = `/categorys/${categoryId}`
        return axiosClient.delete(url)
    },

    createCategory: (params) => {
        const url = `/categorys`
        return axios.post(`${BASE_URL}` + url, params)
    },

    updateCategory: (params) => {
        const url = `/categorys`
        return axios.put(`${BASE_URL}` + url, params)
    },

    uploadImage: (formdata) => {
        const url = `/storage_server/upload/product_image`
        return axios.post(`${BASE_URL}` + url, formdata)
    },

    updateImage: (formdata) => {
        const url = `/storage_server/upload/product_image_by_update`
        return axios.post(`${BASE_URL}` + url, formdata)
    },
    
}

export default categoryApi
