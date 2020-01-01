<template>
    <div class="checkout-box">
        <div v-if="!hasProduct()" class="checkout-message">
            <h3>No products...</h3>
            <router-link to="./">Back to list of products</router-link>
        </div>
        <form v-if="hasProduct()" class="loginbox" @submit.prevent="submit">
            <ul class="checkout-list">
                <transition-group name="fade">
                    <li v-for="(product, index) in getProductsInCart" :key="index" class="checkout-product">
                        <h3 class="product-name">{{ product.name }}</h3>
                        <span class="product-price">
                      <button type="button" class="product-remove" @click="minus(index)">-</button>
                      x{{ product.quantity }}
                      <button type="button" class="product-remove" @click="add(index)">+</button>
                    </span>
                        <span class="product-price">€ {{ product.price * product.quantity }}</span>
                        <button type="button" class="product-remove" @click="remove(index)">X</button>
                    </li>
                </transition-group>
            </ul>
            <div>
                <input required="required" class="address_input" placeholder="Full Name" name="full_name"
                       v-model="form.full_name"
                       type="text">
            </div>
            <div>
                <input required="required" class="address_input" placeholder="Address" name="address"
                       v-model="form.address"
                       type="text">
            </div>
            <div>
                <input equired="required" class="address_input" placeholder="Phone" name="phone" v-model="form.phone"
                       type="text">
            </div>
            <div>
                <input class="address_input" placeholder="Coupon Code" name="coupon" v-model="form.coupon"
                       type="text">
            </div>

            <p class="delivery_fee" v-if="getDeliveryFee">
                Delivery Fee: € {{ getDeliveryFee.price }}
            </p>
            <h3 class="total" v-if="hasProduct()">
                Total: € {{ calculatePrice() }}
            </h3>
            <button :disabled="!validateForm" type="submit" class="confirm">Confirm Order</button>
        </form>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        data() {
            return {
                form: {
                    address: '',
                    full_name: '',
                    phone: '',
                    coupon: '',
                }
            }
        },
        computed: {
            ...mapGetters({
                getProductsInCart: 'getProductsInCart',
                getTotalProductsInCart: 'getTotalProductsInCart',
                getDeliveryFee: 'getDeliveryFee',
                authenticated: 'auth/authenticated',
                user: 'auth/user'
            }),
            validateForm() {
                return this.form.address != '' && this.form.phone != '' && this.form.full_name != ''
            }
        },

        methods: {
            ...mapActions([
                'removeProduct',
                'increaseProduct',
                'decreaseProduct',
                'reqDeliveryFee',
                'confirmOrder',
            ]),
            hasProduct() {
                return this.getProductsInCart.length > 0;
            },
            remove(index) {
                this.removeProduct(index);
            },
            add(index) {
                this.increaseProduct(index);
            },
            minus(index) {
                this.decreaseProduct(index);
            },
            calculatePrice() {
                if (this.getDeliveryFee != null) {
                    return (parseFloat(this.getTotalProductsInCart) + parseFloat(this.getDeliveryFee.price))
                } else {
                    return this.getTotalProductsInCart;
                }
            },
            async submit() {
                let payload = {
                    full_name: this.form.full_name,
                    address: this.form.address,
                    phone: this.form.phone,
                    coupon: this.form.coupon,
                    cart: this.getProductsInCart,
                }
                let result = await this.confirmOrder(payload)
                this.$vs.notify({
                    title: 'Order Submitted',
                    text: "Your order has been submitted successfully!",
                    time: 4000,
                    color: 'primary'
                })
                this.$router.replace({
                    name: 'order', params: {id: result.id}
                })
            }
        },
        mounted() {
            this.reqDeliveryFee();
            if (this.authenticated) {
                this.form.full_name = this.user.name
                this.form.address = this.user.address
                this.form.phone = this.user.phone
            }
        }
    };
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
