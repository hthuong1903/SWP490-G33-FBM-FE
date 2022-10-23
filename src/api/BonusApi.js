import axiosClient from './axiosClient'

const BonusApi = {
    createBonusDetail: (period_code) => {
        const url = `/bonus_detail`
        return axiosClient.post(url, null, { params: { period_code } })
    },
    updateBonusDetail: (data) => {
        const url = '/bonus_detail'
        return axiosClient.put(url, data)
    },
    getBonusDetailPeriodCode: (period_code) => {
        const url = '/bonus_detail/period'
        return axiosClient.get(url, { params: { period_code } })
    },

    getBonus: () => {
        const url = '/bonus'
        return axiosClient.get(url)
    }
}

export default BonusApi
