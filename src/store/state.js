const state = {
    products: [],
    cartProducts: JSON.parse(localStorage.getItem('cart')) || [],
    deliveryFee: [],
    history: null,
    current_order: null,
    showModal: false,
    showPopupCart: false,
    token: localStorage.getItem('access_token') || null,
}

export default state
