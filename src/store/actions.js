import axios from 'axios'

const actions = {
    async reqProducts({commit}) {
        let response = await axios.get('products')
        commit('SET_PRODUCTS', response.data.data)
    },
    addProduct: (context, product) => {
        context.commit('ADD_PRODUCT', {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
        });
    },
    async reqDeliveryFee({commit}) {
        let response = await axios.get('delivery-fee')
        commit('SET_DELIVERY_FEE', response.data.data)
    },
    async confirmOrder({commit}, payload) {
        let response = await axios.post('order', payload)
        commit('SET_CURRENT_ORDER', {response: response.data.data, cart: payload.cart})
        commit('EMPTY_CART')
        return response.data.data
    },
    async getCurrentOrderInfo({commit}, id) {
        let response = await axios.post('order/' + id)
        console.log(response)
        commit('UPDATE_CURRENT_ORDER', {response: response.data.data})
    },
    async reqOrderHistory({commit}) {
        let response = await axios.get('user-history')
        commit('SET_ORDER_HISTORY', response.data.data)
    },
    removeProduct: (context, index) => {
        context.commit('REMOVE_PRODUCT', index);
    },
    increaseProduct: (context, index) => {
        context.commit('INC_PRODUCT', index);
    },
    decreaseProduct: (context, index) => {
        context.commit('DEC_PRODUCT', index);
    },
    currentProduct: (context, product) => {
        context.commit('CURRENT_PRODUCT', product);
    },
    showOrHiddenModal: (context) => {
        context.commit('SHOW_MODAL');
    },
    showOrHiddenPopupCart: (context) => {
        context.commit('SHOW_POPUP_CART');
    },


    // async getAllQuizzes({commit}) {
    //     let response = await axios.get('api/quizzes')
    //     commit('SET_QUIZZES', response.data.data)
    // },
    // async getQuiz({commit}, id) {
    //     let response = await axios.get(`api/quiz/${id}`)
    //     commit('SET_QUIZ', response.data.data)
    // },
    // setQuestionAnswer({commit}, data) {
    //     commit('SET_QUESTION_ANSWER', data)
    // },
    // async sendQuiz({commit}, data) {
    //     let response = await axios.post(`api/quiz/${data.quiz_id}`, data)
    //     commit('SET_QUIZ_RESULT', response.data.data)
    //     return response.data.data
    // },
    // async getResult({commit}, id) {
    //     let response = await axios.get(`api/quiz/result/${id}`)
    //     commit('SET_QUIZ_RESULT', response.data.data)
    // },
    // async getAnswers({commit}, data) {
    //     let response = await axios.post(`api/admin/result/answers`, data)
    //     return response.data.data
    // },
    // async getAllDimensions({commit}) {
    //     let response = await axios.get(`api/dimensions`)
    //     commit('SET_DIMENSIONS', response.data.data)
    // },
    // async loginReq({commit}, data) {
    //     return new Promise((resolve, reject) => {
    //         axios.post(`api/admin/login`, data)
    //             .then(response => {
    //                 const token = response.data.access_token
    //
    //                 localStorage.setItem('access_token', token)
    //                 commit('SET_LOGIN_INFO', token)
    //
    //                 resolve(response)
    //             })
    //             .catch(error => {
    //                 reject(error)
    //             })
    //     })
    // },
    // adminLogOut(context) {
    //     helpers.setAuth(context)
    //     if (context.getters.loggedIn) {
    //         return new Promise((resolve, reject) => {
    //             axios.post('api/admin/logout')
    //                 .then(response => {
    //                     localStorage.removeItem('access_token')
    //                     context.commit('LOG_OUT')
    //                     resolve(response)
    //                 })
    //                 .catch(error => {
    //                     localStorage.removeItem('access_token')
    //                     context.commit('LOG_OUT')
    //                     reject(error)
    //                 })
    //         })
    //     }
    // },
    // getResults(context, page = 1) {
    //     helpers.setAuth(context)
    //     axios.post(`api/admin/results?page=${page}`)
    //         .then(response => {
    //             context.commit('GET_ALL_RESULTS', response.data)
    //         })
    // }
}

export default actions
