<template>
    <section class="h-full bg-slate-900">
        <div class="flex flex-col max-w-[1200px] mx-auto">
            <nav class="w-full p-[5px] border-b-[1px] border-slate-500">
                <button class="w-[25px] h-[25px] bg-blue-400 text-white hover:bg-blue-600"
                @click="create">
                    <fa class="" icon="plus" />
                </button>
            </nav>
            <table class="w-full text-center h-full">
                <tr class="border-b-[1px] border-slate-500">
                    <th class="py-[10px] text-[18px] text-white">Id</th>
                    <th class="py-[10px] text-[18px] text-white">Nombre</th>                    
                    <th class="py-[10px] text-[18px] text-white">Acciones</th>
                </tr>
                <tr v-for="category,x in categories" class="border-b-[1px] border-slate-500 py-[10px]" :key="category._id">
                    <td class="py-[10px] text-slate-400">{{ x = x + 1 }}</td>
                    <td class="py-[10px] text-slate-400">{{ category.name }}</td>
                    <td class="py-[10px] text-slate-400 flex gap-[10px] justify-center items-center">
                        <fa icon="pen-to-square" class="text-yellow-500 hover:text-yellow-700 hover:cursor-pointer"
                        @click="editCategory(category._id)"/>
                        <fa icon="trash" class="text-red-500 hover:text-red-800 hover:cursor-pointer"/>
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
            categories: [],
        }
    },
    methods: {
        async getCategories() {
            const res = await axios(environ.URL_API + '/category/getall')
            this.categories = res.data.CategoriesFound
        },
        create(){
            this.$router.push({name:'create-category'})
        },  
        editCategory(id){
            this.$router.push({name:'edit-category',params:{id:id}})
        },
        /* deleteCategory(id) {
            this.$router.push({name:'delete-category',params:{id:id}})
        } */
    },
    mounted() {
        this.getCategories()
    },
}
</script>
<style>

</style>