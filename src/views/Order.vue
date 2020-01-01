<template>
    <div class="checkout-box">
        <h2>Order has been submitted successfuly !</h2>
        <ul class="checkout-list">
            <transition-group name="fade">
                <li v-for="(product, index) in this.getCurrentOrder.cart" :key="index" class="checkout-product">
                    <h3 class="product-name">{{ product.name }}</h3>
                    <span class="product-price">
                      x{{ product.quantity }}
                    </span>
                    <span class="product-price">€ {{ product.price * product.quantity }}</span>
                </li>
            </transition-group>
        </ul>
        <div style="margin:10px;">
            Registered by : {{ this.getCurrentOrder.full_name }}
        </div>
        <div style="margin:10px;">
            Address : {{ this.getCurrentOrder.address }}
        </div>
        <div style="margin:10px;">
            Phone : {{ this.getCurrentOrder.phone }}
        </div>
        <div style="margin:10px;" v-if="this.getCurrentOrder.coupon">
            coupon code : {{ this.getCurrentOrder.coupon }}
        </div>
        <p class="delivery_fee">
            Delivery Fee: € {{ this.getCurrentOrder.delivery_fee }}
        </p>
        <h3 class="total">
            Total: € {{ this.getCurrentOrder.final_price }}
        </h3>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'order',
        data() {
            return {
                id: null,
                data: {}
            }
        },
        created() {
            this.id = this.$route.params.id;
        },
        computed: {
            ...mapGetters({
                getCurrentOrder: 'getCurrentOrder',
            })
        },
        methods: {
            ...mapActions({
                getCurrentOrderInfo: 'getCurrentOrderInfo',
            }),
            async updateInfo() {
                await this.getCurrentOrderInfo(this.id)
            },
        },
        mounted() {
            if (this.getCurrentOrder == null) {
                this.updateInfo()
            } else {
                if (this.getCurrentOrder.id != this.id) {
                  this.updateInfo()
                }
            }
        }
    }
</script>
<style scoped>
    .checkout-box {
        width: 100%;
        max-width: 900px;
        display: flex;
        flex-direction: column;
        margin: 50px auto;
        box-sizing: border-box;
        padding: 1em;
    }

    .checkout-list {
        padding: 0;
    }

    .address_input {
        margin: 5px 5px;
        width: 70%;
        display: inline-block;
        padding: 1rem 1rem;
    }

    .address_btn {
        background-color: #27AE60;
        border: 0;
        cursor: pointer;
        padding: 1rem 1rem;
        box-sizing: border-box;
        border-radius: 3px;
        color: #fff;
        display: inline-block;
        justify-content: space-around;
        position: relative;
        width: 130px;
    }

    .confirm {
        background-color: #27AE60;
        border: 0;
        cursor: pointer;
        padding: 1rem 1rem;
        box-sizing: border-box;
        border-radius: 3px;
        color: #fff;
        display: inline-block;
        justify-content: space-around;
        position: relative;
        margin-top: 10px;
        width: 95%;
    }

    .confirm:disabled {
        cursor: not-allowed;
        opacity: 0.85;
    }

    .checkout-product {
        display: grid;
        grid-template-columns: 1fr 3fr 2fr .5fr;
        background-color: #fff;
        box-shadow: 0px 0px 10px rgba(73, 74, 78, 0.1);
        border-radius: 5px;
        list-style: none;
        box-sizing: border-box;
        padding: .8em;
        margin: 1em 0;
    }

    .checkout-product * {
        place-self: center;
    }

    .product-name {
        box-sizing: border-box;
    }

    .product-price {
        font-size: 1.2em;
        font-weight: bold;
    }

    .product-remove {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: 0;
        background-color: #E0E0E0;
        color: #fff;
        cursor: pointer;
    }

    .total {
        font-size: 1.5em;
        font-weight: bold;
        align-self: flex-end;
        float: right;
        clear: both;
    }

    .delivery_fee {
        font-size: 1.2em;
        font-weight: bold;
        margin-top: 5px;
        margin-bottom: 5px;
        align-self: flex-end;
        float: right;
        clear: both;
    }

    .checkout-message {
        font-size: 1.5em;
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .5s;
    }

    .fade-enter, .fade-leave-to {
        transform: translateX(-40px);
        opacity: 0;
    }
</style>
