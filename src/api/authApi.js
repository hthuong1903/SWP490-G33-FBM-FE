import axios from 'axios'
import axiosClient from './axiosClient'
import { BASE_URL } from './constraint'

const authApi = {
    getAllUser: () => {
        const url = `/user`
        return axiosClient.get(url)
    },
   
}

export default authApi
