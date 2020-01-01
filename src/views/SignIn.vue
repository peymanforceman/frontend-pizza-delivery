<template>
    <div class="signIn">
        <section class="form animated flipInX">
            <h3 style="margin-bottom: 10px;">Login To Your Account</h3>
            <form class="loginbox" @submit.prevent="submit">
                <input class="input" placeholder="Email" type="email" id="email" v-model="form.email">
                <input class="input" placeholder="Password" type="password" id="password" v-model="form.password">
                <button class="button" id="submit">Login</button>
            </form>
        </section>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'signin',

        data() {
            return {
                form: {
                    email: '',
                    password: '',
                }
            }
        },

        methods: {
            ...mapActions({
                signIn: 'auth/signIn'
            }),

            submit() {
                this.signIn(this.form).then(() => {
                    this.$router.replace({
                        name: 'home'
                    })
                    this.$vs.notify({
                        title: 'Welcome',
                        text: "Welcome back!",
                        time: 4000,
                        color: 'primary'
                    })
                }).catch(() => {
                    this.form.email = ''
                    this.form.password = ''
                    this.$vs.notify({
                        title: 'Error',
                        text: "Wrong Username or Password",
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

    .button:disabled {
        cursor: not-allowed;
        opacity: 0.85;
    }

    button:hover {
        background: #2D9CDB;
    }
</style>
