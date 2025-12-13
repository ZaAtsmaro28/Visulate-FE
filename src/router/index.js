import { createRouter, createWebHistory } from 'vue-router'

// Layout
import AppLayout from '../layouts/AppLayout.vue'

// Pages
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import Posts from '../pages/Posts.vue'
import Forbidden from '../pages/Forbidden.vue'
import MyApp from '../pages/MyApp.vue'
import MyPosts from '../pages/MyPosts.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/MyApp',
    name: 'MyApp',
    component: MyApp
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: Forbidden
  },

  {
    path: '/',
    component: AppLayout,   // layout global
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { role: 'admin' }
      },
      {
        path: 'posts',
        name: 'posts',
        component: Posts
      },
      {
        path: 'MyPosts',
        name: 'MyPosts',
        component: MyPosts
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Route Guard
router.beforeEach((to, from, next) => {
  // const token = localStorage.getItem("token")
  // const userRole = localStorage.getItem("role")

  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next('/login')
  }

  if (to.path === '/login' && auth.isAuthenticated) {
    return next('/dashboard')
  }

  if (to.meta.role) {
    const allowed = Array.isArray(to.meta.role) ? to.meta.role : [to.meta.role]

    if (!allowed.includes(auth.role)) {
      
      return next('/posts')
    }
  }
  
  next()
})

export default router
