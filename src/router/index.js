import Vue from 'vue'
import VueRouter from 'vue-router'
import CartCheckout from '../views/CartCheckout';
import store from '../store/index'
import SignUp from "../views/SignUp";
import SignIn from "../views/SignIn";
import Order from "../views/Order";
import Home from "../views/Home";
import History from "../views/History";

Vue.use(VueRouter)
const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters['auth/authenticated']) {
        next()
        return
    }
    next('/')
}

const ifAuthenticated = (to, from, next) => {
    if (store.getters['auth/authenticated']) {
        next()
        return
    }
    next('/login')
}

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: SignIn,
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: '/register',
        name: 'register',
        component: SignUp,
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: '/order-history',
        name: 'history',
        component: History,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/order/:id',
        name: 'order',
        component: Order,
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: CartCheckout,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
