import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios'
import { getEnvVariable } from '../helpers'

const { VITE_API_URL } = getEnvVariable()


export const calendarApi = axios.create({
    baseURL: VITE_API_URL
})


calendarApi.interceptors.request.use( ( config : InternalAxiosRequestConfig ) : InternalAxiosRequestConfig => {
    
    const headers : AxiosRequestHeaders = Object.assign({}, config.headers, {
        ...config.headers,
        'Authorization': `Bearer ${ localStorage.getItem('token') }`,
    });
    config.headers = headers;
    return config;
});

// TODO configurar interceptores