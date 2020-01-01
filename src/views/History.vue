<template>

    <vs-row vs-align="flex-start"
            vs-type="flex" vs-justify="center" vs-w="12">

        <vs-col style="margin-top:25px;" vs-type="flex" vs-justify="center" vs-align="center" vs-w="8" vs-xs="12">

            <div>
                <vs-collapse accordion>
                    <vs-collapse-item v-for="(order, index) in getHistory" :key="index" icon-arrow="arrow_drop_down">
                        <div slot="header">
                            ORDER #{{ order.id }} | Cost: €{{ order.final_price }}
                        </div>
                        <div>
                            <vs-table :data="order.cart">
                                <template slot="header">
                                    <h3>
                                        Cart
                                    </h3>
                                </template>
                                <template slot="thead">
                                    <vs-th>
                                        Product
                                    </vs-th>
                                    <vs-th>
                                        Quantity
                                    </vs-th>
                                    <vs-th>
                                        Cost
                                    </vs-th>
                                </template>

                                <template slot-scope="{data}">
                                    <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                                        <vs-td>
                                            {{data[indextr].name}}
                                        </vs-td>

                                        <vs-td>
                                            x{{data[indextr].quantity}}
                                        </vs-td>

                                        <vs-td>
                                            €{{data[indextr].price}}
                                        </vs-td>
                                    </vs-tr>
                                </template>
                            </vs-table>
                        </div>
                    </vs-collapse-item>
                </vs-collapse>
            </div>
        </vs-col>
    </vs-row>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "history",
        data() {
            return {}
        },
        computed: {
            ...mapGetters({
                getHistory: 'getHistory',
                authenticated: 'auth/authenticated',
                user: 'auth/user'
            })
        }, methods: {
            ...mapActions([
                'reqOrderHistory',
            ]),
        },
        mounted() {
            this.reqOrderHistory()
        }
    };
</script>
