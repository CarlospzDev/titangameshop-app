<template>
    <section class="w-full h-screen bg-neutral-900 flex">
        <div class="w-[65%] flex flex-col p-[20px] pt-[40px]">
            <RouterLink class="text-left text-white" :to="{name:'home'}">
                <p class="text-center w-[100px] font-bold text-[20px] cursor-pointer">Titan <br>GameStore</p>
            </RouterLink>
            <div>
                <p class="text-center font-bold text-white text-[70px] pt-[40px]">¡HOLA! DISFRUTA <br> DE LA <br>
                    EXPERIENCIA <br> <span>(¬‿¬)</span></p>
            </div>
        </div>

        <div class="flex justify-center w-[35%] items-center">
            
            <form
                class="w-[90%] h-[80%] bg-white px-[15px] pt-[15px] flex flex-col items-center border rounded-br-[90px] rounded-tl-[90px] gap-[30px]"
                @submit="login">
                <h2 class="mt-[20px] mb-[10px] text-[30px] font-bold">Inicio de sesión</h2>
                <p class="text-center mb-[15px] text-[14px] w-[100%]">Ingresa y obtén todos tus juegos favoritos a buen
                    precio</p>
                <div class="flex flex-wrap text-neutral-900 w-[90%] text-[15px] gap-[30px]">
                    <div class="w-[95%] h-[40px] relative overflow-hidden text-[15px]">
                        <input type="text" required class="fields" id="email">
                        <label class="lbl-nombre">
                            <span class="text-nomb text-gray-500">Correo Electronico</span>
                        </label>
                    </div>
                    <div class="w-[95%] h-[40px] relative overflow-hidden text-[15px]">
                        <input type="password" required class="fields" id="password">
                        <label class="lbl-nombre">
                            <span class="text-nomb text-gray-500">Contraseña</span>
                        </label>
                    </div>
                    <div class="flex items-center justify-evenly w-full text-[11px]">
                        <div class="flex gap-[10px]">
                            <input type="checkbox" id="recordar">
                            <label for="recordar" class="cursor-pointer">Recordar Contraseña</label>
                        </div>
                        <a>Recuperar Contraseña</a>
                    </div>
                </div>

                <button class="text-center mt-[40px] px-[50px] text-white rounded-full bg-slate-600"
                    type="submit">Iniciar Sesión</button>
                <p class="my-[45px]">¿Aún no tienes cuenta? <RouterLink class="text-emerald-800" :to="{name:'register'}">
                        Registrate</RouterLink>
                </p>
            </form>
        </div>
    </section>


</template>

<script>

import axios from 'axios'
import environ from '../../enviroments/enviroment'
export default {
    methods: {
        async login(e) {
            e.preventDefault()
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value

            const res = await axios.post(environ.URL_API + '/user/sign-in', {
                email,
                password
            })

            if (!res.data.ok) {
                this.$swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Correo o Contraseña Incorrectos',
                })
                return
            }

            localStorage.setItem('user', JSON.stringify({
                _id: res.data.UserFound._id,
                rol: res.data.UserFound.rol,
                games: res.data.UserFound.gamesId,
                name: res.data.UserFound.names,
                email: res.data.UserFound.email
            }))
            if (res.data.UserFound.rol == 'admin') {
                this.$router.push({ name: 'admin' })
            } else {
                this.$router.push({ name: 'home' })
            }

        },
    },
    mounted() {

    },
    beforeMount() {
        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'))
            if (user.rol === 'admin') {
                this.$router.push({ name: 'admin' })
            } else {
                this.$router.push({ name: 'home' })
            }
        }
    }
}

</script>

<style>
.fields {
    width: 100%;
    height: 100%;
    background: none;
    padding-top: 20px;
    border: none;
    padding-bottom: 10px;
    outline: 0px;
}

.lbl-nombre {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 20px;
    height: 100%;
    pointer-events: none;
    border-bottom: 2px solid #c7c7c7;
}

.lbl-nombre:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 100%;
    border-bottom: 2px solid #171717;
    transform: translateX(-100%);
    transition: all 0.3s ease;
}

.text-nomb {
    position: absolute;
    bottom: 5px;
    left: 0;
    transition: all 0.3s ease;
}

.fields:focus+.lbl-nombre .text-nomb,
.fields:valid+.lbl-nombre .text-nomb {
    transform: translateY(-90%);
    font-size: 12px;
    color: #0d2222;
}

.fields:focus+.lbl-nombre:after,
.fields:valid+.lbl-nombre:after {
    transform: translateX(0%);
}
</style>