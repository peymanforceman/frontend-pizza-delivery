const getters = {
    getProducts: state => state.products,
    getDeliveryFee: state => {
        if (state.deliveryFee.length > 0) {
            return state.deliveryFee[0]
        } else {
            return null
        }
    },
    getProductsInCart: state => state.cartProducts,
    getCurrentOrder: state => state.current_order,
    getHistory: state => state.history,
    getSumProductsInCart: state => {
        let sum = 0;
        if(state.cartProducts.length>0){
            console.log(state.cartProducts)
            state.cartProducts.forEach(product => {
                sum += (product.quantity)
            })
        }
        return sum;
    },
    getTotalProductsInCart: state => {
        let sum = 0;
        state.cartProducts.forEach(product => {
            sum += (product.quantity * product.price)
        })
        return sum;
    },
    getShowModal: state => state.showModal,
    getPopupCart: state => state.showPopupCart,

}

export default getters
