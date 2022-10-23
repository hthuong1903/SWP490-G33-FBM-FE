import axios from 'axios'
import { BASE_URL } from './constraint'

const uploadApi = {
    uploadImage: (params) => {
        const url = '/storage_server/upload'
        return axios.post(`${BASE_URL}` + url, params)
    }
}

export default uploadApi
