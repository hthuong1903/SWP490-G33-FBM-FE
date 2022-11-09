import axiosClient from './axiosClient'

const StatisticAPI = {
    /// Product

    getTopSellingProduct: (typeSaleProduct, month, year) => {
        const url = '/orders/top_product_sell'
        return axiosClient.get(url, { params: { typeSaleProduct, month, year } })
    },


    /// Income

    getInformationGraphNumberProductByEmployee: (year) => {
        const url = 'orders/graph_number_product_employee'
        return axiosClient.get(url, { params: { year } })
    },

    getInformationGraphTurnOver: (year) => {
        const url = 'orders/graph_turnover'
        return axiosClient.get(url, { params: { year } })
    },

    getInformationGraphTurnOverByEmployee: (year) => {
        const url = 'orders/graph_turnover_employee'
        return axiosClient.get(url, { params: { year } })
    },

    getTotalProducts: (year) => {
        const url = 'orders/total_product'
        return axiosClient.get(url, { params: { year } })
    },

    getTotalTurnOvers: (year) => {
        const url = 'orders/total_turn_over'
        return axiosClient.get(url, { params: { year } })
    },
}

export default StatisticAPI
