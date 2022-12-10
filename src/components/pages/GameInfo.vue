<template>
    <div class="min-h-screen relative">
        <Header></Header>
        <section id="game" class="w-full h-[68vh] bg-slate-900 flex p-[40px] gap-[30px] items-center" v-if="game">
            <div class="w-[60%] h-[85%]  text-white flex gap-[25px]">
                <div class="w-[60%] h-full">
                    <img class="w-full h-full object-cover rounded-[10px]"
                        :src="url + '/game/get-game-image/' + game._id" alt="">
                </div>
                <div class="h-full px-[20px] w-[60%] flex items-start flex-col gap-[30px]">
                    <div class="w-full flex justify-start h-[20%] items-center gap-[20px]">
                        <h3 class="font-bold text-left text-[40px]">{{ game.name }}</h3>
                        <button
                            class="flex items-center gap-[10px] w-[100px] justify-center py-[4px] font-bold text-slate-500 rounded-full border-[1px] border-slate-700 hover:bg-slate-700 hover:text-slate-900">
                            <fa class="text-red-600" icon="heart" />
                            {{ likes.cuantity }}
                        </button>
                    </div>
                    <p class="text-left w-full font-semibold text-[20px] text-slate-600">{{ game.description }}</p>
                    <p class="w-full pt-[10px] text-black font-semibold ">
                        <span
                            class="text-left px-[20px] py-[4px] font-semibold rounded-full bg-yellow-500 hover:bg-yellow-600 hover:text-white cursor-pointer">{{
                                    category.name
                            }}</span>
                    </p>

                </div>
            </div>
            <div class="w-[35%] bg-stone-800  h-[75%] flex flex-col items-center justify-center gap-[20px]">
                <p class="text-green-500 font-bold text-[50px] ">${{ game.price }} <span
                        class="text-white font-semibold">COP</span></p>
                <button class="bg-white px-[20px] py-[4px] rounded-full font-semibold hover:bg-gray-200">Comprar
                    Ahora</button>
                <button @click="addToCart"
                    class="border-2 border-white text-white flex items-center font-semibold px-[20px] py-[4px] rounded-full gap-[4px] hover:bg-gray-900">Agregar
                    al Carrito
                    <fa class="w-[20px] h-[20px]" icon="cart-shopping" />
                </button>
            </div>
        </section>
        <Footer class="absolute w-full bottom-0"></Footer>
    </div>
</template>

<script>
import Header from '../principal/Header.vue'
import Footer from '../principal/Footer.vue'
import axios from 'axios';
import environ from '../../enviroments/enviroment';
export default {
    data() {
        return {
            game: {},
            category: {},
            likes: {},
            url: environ.URL_API
        }
    },
    methods: {
        async getGame() {
            const res = await axios.get(environ.URL_API + '/game/get-game/' + this.$route.params.id)
            this.game = res.data.game[0]
            this.category = res.data.game[0].categoryId
            this.likes = res.data.game[0].likes
            console.log(this.game)
        },
        async addToCart() {
            if (!localStorage.getItem('user')) {
                this.$swal.fire({
                    title: 'No has iniciado sesión',
                    text: "Inicia sesión para agregar productos a tu carrito",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Iniciar sesión',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$router.push({ name: 'login' })
                    }
                })
            } else {
                let user = JSON.parse(localStorage.getItem('user'))
                let res = await axios.post(environ.URL_API + '/cart/add-game', {
                    userId: user._id,
                    gameId: this.$route.params.id
                })
                if (res.data.msg === 'Game Already in Cart') {
                    this.$swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: 'Este Juego ya esta en el carrito!',
                    })
                    return false
                } else if (res.data.msg === 'Game added to cart') {
                    this.$swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Juego añadido al carrito',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }
        }
    },
    components: { Header, Footer },
    async mounted() {
        this.getGame()
        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'))
            this.username = user.name
        }
    },
}
</script>