import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        role: null,
        name: null,
        email: null,
        user: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token
    },
    actions: {
        setToken(token){
            this.token = token
        },
        setRole(role){
            this.role = role
        },
        setName(name){
            this.name = name
        },
        setEmail(email){
            this.email = email
        },
        setUser(user){
            this.user = user
        },
        clearAuth(){
            this.token = null
            this.role = null
            this.name = null
            this.email = null
            this.user = null
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'auth',
                storage: localStorage,
                paths: ['token', 'role', 'user', 'name', 'email']
            }
        ]
    }
})