<template>
    <div class="relative min-h-screen">
        <Header :totalProducts="totalProducts"></Header>
        <section>
            <div class="flex flex-col max-w-[1200px] min-h-[70vh] justify-center items-center mx-auto ">
                <!-- Mensaje sin juegos -->
                <div class="p-[20px] flex flex-col justify-center items-center gap-[10px]"
                    v-if="(!user) || (user && userGames.gamesId == '')">
                    <h2 class="text-white text-[25px] font-bold">Tu carrito esta vacío</h2>
                    <p class="text-slate-500 text-[18px] font-semibold">No has seleccionado ningun juego</p>
                    <button @click="goHome" class="bg-yellow-500 hover:bg-yellow-600 font-semibold text-[18px] p-[20px]">Selecciona tus
                        juegos!</button>
                </div>
                <!-- Informacion del carrito -->
                <div class="flex gap-[20px] w-full items-start" v-if="user && userGames.gamesId != ''">
                    <!-- lista de juegos -->
                    <div class="bg-neutral-800 flex flex-col p-[20px] w-[70%] max-h-[500px] gap-[20px]">
                        <h2 class="text-white text-[20px] font-semibold">Tu carrito</h2>
                        <!-- Juegos -->
                        <div id="gamesSection" class="overflow-auto gap-[20px] flex flex-col h-full pr-[5px]">
                            <div class="flex gap-[20px] bg-neutral-900 w-full"
                                v-for="game in userGames.gamesId" :key="game._id" :id="game._id">
                                <div class="w-[15%]">
                                    <img :src="url_api + '/game/get-game-image/' + game._id" alt=""
                                        class="h-full w-full object-cover">
                                </div>
                                <div class="w-[85%] py-[10px] flex justify-between items-center">
                                    <p class="text-white text-[20px] font-semibold flex flex-col justify-evenly h-full">
                                        {{ game.name }}
                                        <span class="text-[16px] text-slate-500">Producto digital</span>
                                    </p>
                                    <div class="flex flex-col pr-[25px] py-[20px] gap-[10px] items-center justify-center">
                                        <fa icon="trash" class="text-red-500 text-[20px]" />
                                        <p class="text-white font-bold text-[20px]">${{ game.price }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <!-- Realizar la compra -->
                    <div class="flex flex-col bg-neutral-800 w-[30%] p-[20px] gap-[10px] max-h-[250px]">
                        <div class="flex flex-col gap-[10px] border-b-[1px] border-b-neutral-600 p-[10px]">
                            <h2 class="text-white text-[20px] font-semibold">Resumen</h2>
                            <button
                                @click="modal = true"
                                class="bg-yellow-500 w-full p-[20px] text-[18px] font-semibold hover:bg-yellow-600">Continuar
                                compra</button>
                            <p class="text-white flex justify-between font-semibold">
                                {{ userGames.gamesId.length }} Productos
                                <span class="text-green-500">${{ totalPrice }} COP</span>
                            </p>
                        </div>
                        <p class="text-white text-[20px] font-semibold flex justify-between items-center">
                            Total:
                            <span class="text-green-500 text-[25px]">${{ totalPrice }} COP</span>
                        </p>
                    </div>
                </div>
                <CartPurchase :showModal="modal" @clicked="closeModal"/>
            </div>
        </section>
        <Footer class="absolute w-full bottom-0"></Footer>
    </div>
</template>

<script>
import Header from '../principal/Header.vue';
import Footer from '../principal/Footer.vue';
import CartPurchase from './CartPurchase.vue';
import axios from 'axios';
import environ from '../../enviroments/enviroment';
export default {
    data() {
        return {
            userGames: null,
            totalPrice: null,
            user: false,
            url_api: environ.URL_API,
            totalProducts: null,
            modal: false
        }
    },
    methods: {
        closeModal(value){
            this.modal = value
        },
        goHome(){
            this.$router.push({name:'home'})
        }
    },
    async mounted() {
        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'))
            let res = await axios.get(environ.URL_API + '/cart/get-cart/' + user._id)
            this.user = true
            this.userGames = res.data.cart[0]
            this.totalPrice = res.data.totalPrice
            this.totalProducts = this.userGames.gamesId.length
        }

    },
    components: {
        Header,
        Footer,
        CartPurchase,
    }
}
</script>

<style>
    #gamesSection::-webkit-scrollbar{
        width: 10px;
        background: #262626;
        
    }

    #gamesSection::-webkit-scrollbar-thumb{
        background-color: #171717;
        border-radius: 5px;
    }
</style>