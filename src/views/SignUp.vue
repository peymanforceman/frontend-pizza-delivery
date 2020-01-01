<template>
    <div class="signIn">
        <section class="form animated flipInX">
            <h3 style="margin-bottom: 10px;">Register A New Account</h3>
            <form class="loginbox" @submit.prevent="submit">
                <input required="required" class="input" placeholder="Full Name" type="text" id="full_name"
                       name="full_name"
                       v-model="form.full_name">
                <input required="required" class="input" placeholder="Phone" type="text" id="phone" name="phone"
                       v-model="form.phone">
                <input required="required" class="input" placeholder="Email" type="email" id="email" name="email"
                       v-model="form.email">
                <input required="required" class="input" placeholder="Password" type="password" id="password"
                       name="password"
                       v-model="form.password">
                <input required="required" class="input" placeholder="Repeat Password" type="password"
                       name="confirm_password"
                       id="repeat_password" v-model="form.password_confirmation">

                <textarea v-model="form.address" required="required" class="input" placeholder="Address"></textarea>
                <button class="button" id="submit" :disabled="!validateForm">Register</button>
            </form>
        </section>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'signUp',
        data() {
            return {
                form: {
                    email: '',
                    full_name: '',
                    phone: '',
                    address: '',
                    password: '',
                    password_confirmation: '',
                }
            }
        },
        computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user'
            }),
            validateForm() {
                return this.form.full_name != '' && this.form.email != '' && this.form.password != ''
                    && this.form.phone != '' && this.form.address != '' && this.form.password_confirmation != ''
            }
        },
        methods: {
            ...mapActions({
                signUp: 'auth/signUp'
            }),

            submit() {
                this.signUp(this.form).then(() => {
                    this.$router.replace({
                        name: 'login'
                    })
                }).catch(() => {
                    this.form.password = ''
                    this.form.password_confirmation = ''
                    this.$vs.notify({
                        title: 'Error',
                        text: "Wrong Information , please fill all the information correctly.",
                        time: 4000,
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'danger'
                    })
                })
            }
        }
    }
</script>
<style>
    .form {
        position: absolute;
        top: 30%;
        left: 50%;
        background: #fff;
        width: 285px;
        margin: -140px 0 0 -182px;
        padding: 40px;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    }

    .input {
        outline: none;
        display: block;
        width: 100%;
        margin: 0 0 20px;
        padding: 10px 15px;
        border: 1px solid #ccc;
        color: #ccc;
        font-family: "Roboto";
        box-sizing: border-box;
        font-size: 14px;
        font-wieght: 400;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        transition: 0.2s linear;
    }

    .input:focus {
        color: #333;
        border: 1px solid #2D9CDB;
    }

    .button {
        cursor: pointer;
        background: #2D9CDB;
        width: 100%;
        padding: 10px 15px;
        border: 0;
        color: #fff;
        font-family: "Roboto";
        font-size: 14px;
        font-weight: 400;
    }

    .button:disabled{
        cursor: not-allowed;
        opacity: 0.85;
    }

    .button:hover {
        background: #2D9CDB;
    }
</style>
