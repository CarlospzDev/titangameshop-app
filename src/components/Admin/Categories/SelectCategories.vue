<template>
    <select name="" id="categories" required class="border-b-slate-700 border-b-[2.5px] w-full p-[5px] outline-none" v-if="categories">
        <option value="">--Seleccione una categoría--</option>
        <option v-for="category in categories" :value="category._id">{{category.name}}</option>
    </select>
</template>

<script>
import axios from 'axios';
import environ from '../../../enviroments/enviroment';
export default {
    data() {
        return {
            categories: []
        }
    },
    methods: {
        async getCategories() {
            const res = await axios.get(environ.URL_API + '/category/getall')
            this.categories = res.data.CategoriesFound
        }
    },
    mounted() {
        this.getCategories()
    }
}
</script>