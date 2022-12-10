<template>
    <header class="flex justify-between items-center h-[10.7vh] px-[40px] w-full bg-neutral-900 " id="header">
        <div class="text-[25px] font-bold text-white text-center h-[40px] leading-[20px] ">
            <RouterLink :to="{ name: 'home' }">Titan <br>GameShop</RouterLink>
        </div>
        <nav class="flex items-center gap-[50px] text-white text-[18px]">
            <div>
                <fa icon="cart-shopping" class="text-[25px] hover:cursor-pointer" @click="goCart"/>
                <!-- <span v-if="totalProducts" class="bg-red-500 block text-center rounded-full">{{totalProducts}}</span> -->
            </div>            
            <div class="flex items-center gap-[15px]">
                <div v-if="user" class="flex items-center gap-[8px] font-semibold relative hover:cursor-pointer" @click="activeMenu">
                    <fa icon="user" class="text-[30px]" />
                    {{ user.info.name }}
                    <div class="w-full z-10 absolute top-0 mt-[30%] bg-neutral-900 flex flex-col justify-center items-center" :class="menu ? '' : 'hidden'" @mouseleave="deActiveMenu">
                        <RouterLink :to="{ name: 'admin' }" class="p-[10px] w-full text-center hover:bg-neutral-700"
                        >Mi Perfil</RouterLink>
                        <RouterLink :to="{ name: 'admin' }" class="p-[10px] w-full text-center hover:bg-neutral-700" v-if="user.info.rol == 'admin'"
                        >Dashboard</RouterLink>
                    </div>
                </div>
                <RouterLink class="flex items-center font-semibold gap-[8px]" :to="{ name: 'login' }" v-if="!user">
                    Iniciar sesión
                </RouterLink>
                <RouterLink class="font-semibold text-black bg-yellow-400 p-[20px] rounded-[10px] hover:bg-yellow-500"
                    :to="{ name: 'register' }" v-if="!user">Registrarse</RouterLink>
                <button class="font-semibold bg-yellow-400 text-black p-[20px] rounded-[10px] hover:bg-yellow-500"
                    v-if="user" @click="logout">Cerrar Sesion</button>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    data() {
        return {
            user: false,
            menu: false
        }
    },
    props: {
        session: Boolean,
        totalProducts: Number
    },
    methods: {
        logout() {
            localStorage.clear()
            location.href = "/"
        },
        activeMenu(){
            this.menu = true
        },
        deActiveMenu(){
            this.menu = false
        },
        goCart(){
            if(this.user){
                this.$router.push({name:'cart-shop',params:{id:this.user.info._id}})
            }else{
                this.$router.push({name:'cart-shop'})
            }
        }
    },
    mounted() {
        this.user = localStorage.getItem('user') ? { logged: true, info: JSON.parse(localStorage.getItem('user')) } : false
    },
}
</script>