import axios, { AxiosError, AxiosInstance } from "axios"

const createAxiosInstance = (token: string | null): AxiosInstance => {
  const axiosInstance = axios.create({
    responseType: "json",
    withCredentials: true,
    headers: { "Accept-Language": "en", Authorization: `Token token=${token}` },
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
