<template>
    <div class="min-h-screen relative pb-[20px]">
        <Header></Header>
        <nav class="w-full gap-[20px] border-b-2 border-slate-500 bg-slate-900">
            <div class="flex items-center justify-center w-full h-full">
                <RouterLink :to="{ name: 'list-games' }"
                    class="p-[25px] font-bold text-white hover:bg-slate-500 text-[20px]">Juegos</RouterLink>
                <RouterLink :to="{ name: 'list-categories' }"
                    class="p-[25px] font-bold text-white hover:bg-slate-500 text-[20px]">Categorias</RouterLink>
            </div>
        </nav>
        <RouterView></RouterView>
        <Footer class="absolute bottom-0 w-full"></Footer>
    </div>
</template>
<script>
import Header from '../principal/Header.vue'
import Footer from '../principal/Footer.vue'
import AdminGame from '../Admin/Games/GamesAdmin.vue'
export default {

    data() {
        return {
        }
    },
    mounted() {
    },
    components: {
        Header,
        AdminGame,
        Footer
    },
    beforeMount() {
        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'))
            if (user.rol === 'client') {
                this.$router.push({ name: 'home' })
            }
        } else {
            this.$router.push({ name: 'home' })
        }
    }
}
</script>
<style>

</style>