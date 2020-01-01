<template>
    <header class="header">
        <nav class="nav">
            <ul class="nav-links">
                <li class="link">
                    <router-link to="/">Home</router-link>
                </li>
                <template v-if="authenticated">
                    <li class="link">
                        <router-link to="/order-history">Order History</router-link>
                    </li>
                    <li class="link">
                        <a href="#" @click.prevent="signOut">
                            Sign out
                        </a>
                    </li>
                </template>
                <template v-else>
                    <li class="link">
                        <router-link to="/login">Login</router-link>
                    </li>
                    <li class="link">
                        <router-link to="/register">Register</router-link>
                    </li>
                </template>

            </ul>
        </nav>
        <slot></slot>
    </header>
</template>

<script>import {mapGetters, mapActions} from 'vuex'

export default {
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user'
        })
    },

    methods: {
        ...mapActions({
            signOutAction: 'auth/signOut'
        }),

        signOut() {
            this.signOutAction().then(() => {
                this.$router.replace({
                    name: 'home'
                })
            })
        }
    }
}
</script>

<style scoped>
    .header {
        width: 100%;
        height: 70px;
        background-color: #333333;
        box-sizing: border-box;
        padding: .5em;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .nav {
        width: 600px;
    }

    ul {
        padding-inline-start: 0px;
    }

    .nav-links {
        width: 100%;
        display: flex;
        justify-content: flex-start;
    }

    .link {
        list-style: none;
        padding: 0 1em;
    }

    .link a {
        color: #fff;
        text-decoration: none;
    }
</style>
