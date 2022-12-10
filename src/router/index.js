import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/pages/Home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Home,
            name: 'home'
        },
        {
            path: '/login',
            component: () => import('../components/pages/login.vue'),
            name: 'login'
        },
        {
            path: '/user',
            component: () => import('../components/pages/Usersettings.vue'),
            name: 'user'
        },
        {
            path: '/register',
            component: () => import('../components/pages/register.vue'),
            name: 'register'
        },
        {
            path: '/game/:id',
            component: () => import('../components/pages/GameInfo.vue'),
            name: 'game-info'
        },
        {
            path: '/cart/:id?',
            component: () => import('../components/pages/CartShop.vue'),
            name: 'cart-shop'
        },
        {
            path: '/admin',
            component: () => import('../components/Admin/Admin.vue'),
            name: 'admin',
            children: [
                {
                    path: 'games',
                    component: () => import('../components/Admin/Games/GamesAdmin.vue'),
                    name: 'list-games',
                },
                {
                    path: 'game/create',
                    component: () => import('../components/Admin/Games/CreateGame.vue'),
                    name: 'create-game',
                },
                {
                    path: 'game/update/:id',
                    component: () => import('../components/Admin/Games/EditGame.vue'),
                    name: 'edit-game'
                },
                {
                    path: 'game/delete/:id',
                    component: () => import('../components/Admin/Games/DeleteGame.vue'),
                    name: 'delete-game'
                },
                {
                    path: 'categories',
                    component: () => import('../components/Admin/Categories/CategoriesAdmin.vue'),
                    name: 'list-categories'
                },
                {
                    path: 'category/create',
                    component: () => import('../components/Admin/Categories/CreateCategory.vue'),
                    name: 'create-category'
                },
                {
                    path: 'category/update/:id',
                    component: () => import('../components/Admin/Categories/EditCategory.vue'),
                    name: 'edit-category'
                },
                {
                    path: 'category/delete/:id',
                    component: () => import('../components/Admin/Categories/DeleteCategory.vue'),
                    name: 'delete-category'
                },

            ]
        }
    ]
})
export default router
