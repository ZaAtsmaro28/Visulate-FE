import api from "./axios.js";
import router from "../router"
import { useAuthStore } from "../stores/auth.js";

export const authService = {

    async login(email, password) {
        try {
            const res = await api.post('/login', { email, password })

            const auth = useAuthStore()
            auth.setToken(res.data.token)
            auth.setRole(res.data.role)
            auth.setName(res.data.name)
            auth.setEmail(res.data.email)
            auth.setUser(res.data)


            return { success: true }

        } catch (error) {
            throw error
            return { success: false, error }
        } 
    },

    async logout() {
        try {

          await api.post('/logout')

        } 
        catch (error) {

          if (error.response?.status === 401) {
              console.warn('Token expired, continue logout');
          } 
          else {
              console.error('Error saat logout:', error)
          }

        }

        const auth = useAuthStore()
        auth.clearAuth()
      
        router.push('/login')
    }   
}
