import axios, { AxiosError, AxiosInstance } from "axios"

const createAxiosInstance = (token: string | null): AxiosInstance => {
  const authorization = token ? { Authorization: `Token token=${token}` } : {}
  const axiosInstance = axios.create({
    withCredentials: !!token,
    responseType: "json",
    headers: {
      "Accept-Language": "ru",
      // "Access-Control-Allow-Origin": "https://mymeddata.ru",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
      "Access-Control-Allow-Origin": "http://localhost:3001",
      ...authorization,
    },
    timeout: 30000,
  })
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )
  return axiosInstance
}

export default createAxiosInstance
