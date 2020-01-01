import axios from 'axios'
import store from '@/store/index'

store.subscribe((mutation, state) => {
    switch (mutation.type) {
        case 'auth/SET_TOKEN':
            if (mutation.payload) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
                localStorage.setItem('token', mutation.payload)
            } else {
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('token')
            }
            break;
        case 'ADD_PRODUCT':
            localStorage.setItem('cart', JSON.stringify(state.cartProducts))
            break;
        case 'REMOVE_PRODUCT':
            localStorage.setItem('cart', JSON.stringify(state.cartProducts))
            break;
        case 'EMPTY_CART':
            localStorage.removeItem('cart')
            break;
        case 'INC_PRODUCT':
            localStorage.setItem('cart', JSON.stringify(state.cartProducts))
            break;
        case 'DEC_PRODUCT':
            localStorage.setItem('cart', JSON.stringify(state.cartProducts))
            break;
    }
})
