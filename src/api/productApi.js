import axiosClient from './axiosClient'

const productApi = {
  getAllProduct: () => {
    const url = '/products'
    return axiosClient.get(url)
  },
  getAllCategory: () => {
    const url = '/categorys'
    return axiosClient.get(url)
  },
  getAllProvider: () => {
    const url = '/providers'
    return axiosClient.get(url)
  }
}

export default productApi
