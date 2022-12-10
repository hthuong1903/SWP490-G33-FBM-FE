import axios from 'axios'
import axiosClient from './axiosClient'
import { BASE_URL } from './constraint'

const productApi = {
    getAllProduct: (categoryId, providerId, isExist) => {
        const url = `/products/category/provider?categoryId=${categoryId}&providerId=${providerId}&isExist=${isExist}`
        return axiosClient.get(url)
    },
    getAllCategory: () => {
        const url = '/categorys'
        return axiosClient.get(url)
    },
    getAllProvider: () => {
        const url = '/providers'
        return axiosClient.get(url)
    },
    createProduct: (params) => {
        const url = '/products'
        return axios.post(`${BASE_URL}` + url, params)
    },
    deleteProduct: (productId) => {
        const url = `/products/${productId}`
        return axiosClient.delete(url)
    },
    updateProduct: (params) => {
        const url = `/products/`
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
    getAllMaterial: () => {
        const url = `/materials`
        return axiosClient.get(url)
    }
}

export default productApi
