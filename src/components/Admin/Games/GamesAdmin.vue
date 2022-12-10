<template>
    <section class="h-full bg-slate-900">
        <div class="flex flex-col max-w-[1200px] mx-auto">
            <nav class="w-full p-[5px] border-b-[1px] border-slate-500">
                <button class="w-[25px] h-[25px] bg-blue-400 text-white hover:bg-blue-600" @click="create">
                    <fa class="" icon="plus" />
                </button>
            </nav>
            <table class="w-full text-center h-full">
                <tr class="border-b-[1px] border-slate-500">
                    <th class="py-[10px] text-[18px] text-white">Id</th>
                    <th class="py-[10px] text-[18px] text-white">Nombre</th>
                    <th class="py-[10px] text-[18px] text-white">Categoria</th>
                    <th class="py-[10px] text-[18px] text-white">Precio</th>
                    <th class="py-[10px] text-[18px] text-white">Likes</th>
                    <th class="py-[10px] text-[18px] text-white">Acciones</th>
                </tr>
                <tr v-for="game, x in games" class="border-b-[1px] border-slate-500 py-[10px] hover:cursor-pointer">
                    <td class="py-[10px] text-slate-400">{{ x = x + 1 }}</td>
                    <td class="py-[10px] text-slate-400">{{ game.name }}</td>
                    <td class="py-[10px] text-slate-400">{{ game.categoryId.name }}</td>
                    <td class="py-[10px] text-slate-400">{{ game.price }}</td>
                    <td class="py-[10px] text-slate-400">{{ game.likes.cuantity }}</td>
                    <td class="py-[10px] text-slate-400 flex gap-[10px] justify-center items-center">
                        <fa icon="pen-to-square" class="text-yellow-500 hover:text-yellow-700 hover:cursor-pointer"
                            @click="editGame(game._id)" 
                        />
                        <fa icon="trash" class="text-red-500 hover:text-red-800 hover:cursor-pointer"
                            @click="deleteGame(game._id)" />
                    </td>
                </tr>
            </table>
        </div>

    </section>
</template>
<script>
import axios from 'axios';
import environ from '../../../enviroments/enviroment';
export default {
    data() {
        return {
            games: [],
            showModalCreate: false,
            showModalEdit: false,
            loading: {
                value: false
            }
        }
    },
    methods: {
        async getGames() {
            const res = await axios(environ.URL_API + '/game/getall')
            this.games = res.data.GamesFound
        },
        closeCreate(value) {
            this.showModalCreate = value
        },
        closeEdit(value) {
            this.showModalEdit = value
        },
        create(){
            this.$router.push({name:'create-game'})
        },  
        editGame(id){
            this.$router.push({name:'edit-game',params:{id:id}})
        },
        deleteGame(id) {
            this.$router.push({name:'delete-game',params:{id:id}})
        }
    },
    mounted() {
        this.getGames()
    },
}
</script>
<style>

</style>