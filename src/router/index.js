import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';

import ElementList from '../app/biElement/ElementList.vue';
import CreateElement from '../app/biElement/createElement.vue';


const routes = [
    // ...Home
    {
        path: '/',
        name: 'Home',
        component: Home
    },

    // 元件列表
    {
        path: '/elementList',
        name: 'ElementList',
        component: ElementList
    },

    // 新增元件
    {
        path: '/createElement',
        name: 'CreateElement',
        component: CreateElement
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router;