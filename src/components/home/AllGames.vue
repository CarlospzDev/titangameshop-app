<template>
    <section class=" flex flex-col gap-[20px] bg-slate-900 pb-[100px]">
        <div class="max-w-[1200px] mx-auto mt-[25px]">
            <h2 class="text-[30px] font-bold mb-[25px] text-white text-center">Nuestros Juegos</h2>
            <div class="grid grid-cols-5 gap-[20px]">
                <!-- Cards Container -->
                <RouterLink :key="game._id" v-for="game in allGames" :to="{name:'game-info',params:{id:game._id}}"
                    class="flex flex-col gap-[15px] rounded-[10px] p-[5px] hover:cursor-pointer hover:bg-slate-800 hover:border-slate-800">
                    <!-- Card -->
                    <div class="h-[250px] rounded-[10px]">
                        <!-- img container -->
                        <img :src="url + '/game/get-game-image/' + game._id" alt=""
                            class="w-full h-full object-cover rounded-[10px]">
                    </div>
                    <h3 class="font-bold text-[16px] overflow-hidden text-white px-[5px]">{{ game.name }}</h3>
                    <div class="relative flex flex-col gap-[2px] p-[5px] text-white font-semibold">
                        <!-- inf container -->
                        <p class="text-slate-600 font-bold text-[14px]">{{ game.categoryId.name }}</p>
                        <p class="flex justify-between">
                            <span class="text-green-500">${{ game.price }}
                                <span class="text-white">COP</span>
                            </span>
                        <div class="flex items-center gap-[5px] right-0">
                            <p>{{ game.likes.cuantity }}</p>
                            <fa icon="heart" :class="[game.likes.usersId.includes(userId) ? 'text-red-600' : '']" id="icon" />
                        </div>
                        </p>

                    </div>
                </RouterLink>
            </div>
        </div>
    </section>

</template>

<script>

import axios from 'axios'
import environ from '../../enviroments/enviroment'

export default {


    data() {
        return {
            allGames: [],
            url: environ.URL_API,
            userId: ''
        }
    },
    methods: {
        async getAllGames() {
            const res = await axios(environ.URL_API + '/game/getall')
            this.allGames = res.data.GamesFound
        }
    },
    mounted() {
        this.getAllGames()
        if (localStorage.getItem('user')) {
            let userId = JSON.parse(localStorage.getItem('user'))
            this.userId = userId._id
        }
    },
    components: {
    }

}

</script>

<style>

</style>