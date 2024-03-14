import axios from "axios"
import {getCookie} from "cookies-next";
import {BASE_API_URL} from "../utils/constraints";


const getHeader = (type) => {
    if (type === 1) {
        return ({
            'Content-Type': 'application/json',
        })
    } else if (type === 2) {
        return ({
            'Content-Type': 'application/json',
            'x-access-token': getCookie('ecl-token')
        })
    } else if (type === 3) {
        return ({
            'Content-Type': 'multipart/related',
            'x-access-token': getCookie('ecl-token')
        })
    }
}


export const generateNewAccessToken = async (token) => {
    try {
        const postAxios = axios.create({
            LookupAddress: undefined,
            LookupAddressEntry: undefined,
            baseURL: BASE_API_URL
        })
        const response = await postAxios.post('auth/refresh-token', {refreshToken: token})
        if (response.status === 200) {
            return {
                error: false,
                data: response.data
            }
        } else {
            return {
                error: true,
                data: null,
                message: response.data.msg
            }
        }
    } catch (error) {
        return {
            error: true,
            data: null,
            message: error?.response?.data?.message ?? ''
        }
    }
}
export const postData = async (url, postData, login = false, isFileType = false) => {
    try {
        const postAxios = isFileType ? axios.create({
            LookupAddress: undefined,
            LookupAddressEntry: undefined,
            baseURL: BASE_API_URL,
            headers: getHeader(3)
        }) : axios.create({
            LookupAddress: undefined,
            LookupAddressEntry: undefined,
            baseURL: BASE_API_URL,
            headers: login ? getHeader(2) : getHeader(1)
        })
        const response = await postAxios.post(url, postData)
        if (response.status === 200) {
            return response?.data ?? {
                success: true,
                data: null,
                msg: 'Default success'
            }
        } else {
            return response?.data ?? {
                success: false,
                data: null,
                msg: 'Default not 200'
            }
        }
    } catch (error) {
        console.log(error.message, 'on http Request');
        return error?.response?.data ?? {
            success: false,
            data: null,
            message: error?.message ?? 'Something Went wrong'
        }
    }
}


export const getData = async (url, login = false) => {
    try {
        const getAxios = axios.create({
            LookupAddress: undefined,
            LookupAddressEntry: undefined,
            baseURL: BASE_API_URL,
            headers: login ? getHeader(2) : getHeader(1)
        })
        const response = await getAxios.get(`${BASE_API_URL}${url}`)
        if (response.status === 200) {
            return response?.data ?? {
                success: true,
                data: null,
                msg: 'Default success'
            }
        } else {
            return response?.data ?? {
                success: false,
                data: null,
                msg: 'Default not 200'
            }
        }
    } catch (error) {
        console.log(error.message, 'on http Request');
        return error?.response?.data ?? {
            success: false,
            data: null,
            message: error?.message ?? 'Something Went wrong'
        }
    }
}

export const getBlobData = async (url, login = false) => {
    try {
        const getAxios = axios.create({
            LookupAddress: undefined,
            LookupAddressEntry: undefined,
            baseURL: BASE_API_URL,
            headers: login ? getHeader(2) : getHeader(1)
        })
        const response = await getAxios.get(`${BASE_API_URL}${url}`, {
            LookupAddress: undefined,
            LookupAddressEntry: undefined,
            responseType: 'blob',
            timeout: 30000,
        })

        if (response) {
            return {
                error: false,
                data: response
            }
        } else {
            return {
                error: true,
                data: null,
                message: 'Some thing went wrong.'
            }
        }
    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Some thing went wrong.'
        }
    }
}


export const postBlobData = async (url, payload, login = false) => {
    try {
        const getAxios = axios.create({
            LookupAddress: undefined,
            LookupAddressEntry: undefined,
            baseURL: BASE_API_URL,
            headers: login ? getHeader(2) : getHeader(1)
        })
        const response = await getAxios.post(`${BASE_API_URL}${url}`, payload, {
            LookupAddress: undefined,
            LookupAddressEntry: undefined,
            responseType: 'blob',
            timeout: 30000,
        })

        if (response) {
            return {
                error: false,
                data: response
            }
        } else {
            return {
                error: true,
                data: null,
                message: 'Some thing went wrong.'
            }
        }
    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Some thing went wrong.'
        }
    }
}

