const mutations = {
    ADD_PRODUCT: (state, product) => {
        //
        let index = state.cartProducts.findIndex(p => p.id === product.id)
        if (index >= 0) {
            state.cartProducts[index].quantity++;
            // product exist , increase total
        } else {
            state.cartProducts.push(product);
        }
    },
    SET_DELIVERY_FEE(state, data) {
        state.deliveryFee = data
    },
    SET_CURRENT_ORDER(state, data) {
        state.current_order = data.response
        state.current_order.cart = data.cart
    },
    SET_ORDER_HISTORY(state, data){
        state.history = data
    },
    UPDATE_CURRENT_ORDER(state, data) {
        state.current_order = data.response
    },
    REMOVE_PRODUCT: (state, index) => {
        state.cartProducts.splice(index, 1);
    },
    EMPTY_CART: (state) => {
        state.cartProducts = []
    },
    SHOW_MODAL: (state) => {
        state.showModal = !state.showModal;
    },
    SHOW_POPUP_CART: (state) => {
        state.showPopupCart = !state.showPopupCart;
    },
    INC_PRODUCT: (state, index) => {
        state.cartProducts[index].quantity++;
    },

    DEC_PRODUCT: (state, index) => {
        if (state.cartProducts[index].quantity > 1) {
            state.cartProducts[index].quantity--;
        } else {
            state.cartProducts.splice(index, 1);
        }
    },
    SET_PRODUCTS(state, data) {
        state.products = data
    }
}

export default mutations
