import axiosClient from './axiosClient'

const productApi = {
  getAllProduct: (categoryId,providerId ) => {
    const url = `/products/category/provider?categoryId=${categoryId}&providerId=${providerId}`
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
    return axiosClient.post(url, params)
  },
  deleteProduct: (productId) => {
    const url = `/products/${productId}`
    return axiosClient.delete(url)
  },
  updateProduct: () => {
    const url = `/products/`
    return axiosClient.put(url)
  }
}

export default productApi
