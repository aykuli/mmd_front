import axios, { AxiosError } from "axios"

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    responseType: "json",
    withCredentials: true,
    headers: { "Accept-Language": "en" },
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
