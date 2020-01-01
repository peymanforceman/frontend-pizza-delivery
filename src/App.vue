<template>
    <div class="container">
        <mainMenu>
            <btn btnColor="btn btn-small btn-info btn-popup"
                 :cartIcon="true"
                 @click.native="showPopupCart()">
                Cart
                <span class="btn-circle" v-if="hasProduct()">
           {{ getSumProductsInCart }}
        </span>
            </btn>
            <transition name="appear">
                <popupcart class="cart" v-if="getPopupCart"/>
            </transition>
        </mainMenu>
        <transition name="leave">
            <router-view></router-view>
        </transition>
        <maskBg v-if="getPopupCart" @click.native="showPopupCart()"/>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import mainMenu from './components/Menu';
    import btn from './components/Btn';
    import popupcart from './components/Popupcart';
    import maskBg from './components/Mask';

    export default {
        components: {
            mainMenu,
            btn,
            popupcart,
            maskBg,
        },
        methods: {
            ...mapActions([
                'showOrHiddenPopupCart',
            ]),
            hasProduct() {
                return this.getProductsInCart.length > 0;
            },
            showPopupCart() {
                this.showOrHiddenPopupCart();
            },
        },
        computed: {
            ...mapGetters([
                'getProductsInCart',
                'getSumProductsInCart',
                'getPopupCart',
            ]),
        },
    };
</script>

<style>
    @import './assets/css/normalize.css';
    @import url('https://fonts.googleapis.com/css?family=Roboto');

    body {
        font-family: 'Roboto', sans-serif;
        background-color: #FAFAFA;
    }

    a {
        color: #000;
        text-decoration: none;
    }

    .container {
        width: 100%;
    }

    .cart {
        position: absolute;
        top: 75px;
        right: 300px;
    }

    .btn-circle {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        position: absolute;
        top: -5px;
        right: -5px;
        background-color: #fff;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>
