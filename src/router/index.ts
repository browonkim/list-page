import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "list"*/ '@/views/CommonLayout.vue'),
        children: [{
            path: '/',
            name: 'list',
            component: () => import(/* webpackChunkName: "list"*/ '@/views/ListView.vue')
        }]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
