import axios from "axios";
import { useAuthStore } from "../stores/auth";

const instance = axios.create({
  baseURL: "http://visulate.test/api",
})


export function setupAxiosInterceptors(pinia){
  const auth = useAuthStore()

  instance.interceptors.request.use((config) => {
    const token = auth.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })
  
  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        auth.clearAuth()
      }
  
      return Promise.reject(error)
    }
  )
}

export default instance
