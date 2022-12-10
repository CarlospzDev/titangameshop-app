<template>
    <section class="w-full h-screen bg-neutral-900 flex">
        <div class="w-[65%] flex flex-col p-[20px] pt-[40px]">
            <RouterLink class="text-left text-white" to="/">
                <p class="text-center w-[100px] font-bold text-[20px] cursor-pointer">Titan <br>GameStore</p>
            </RouterLink>
            <div>
                <p class="text-center font-bold text-white text-[70px] pt-[40px]">¡HOLA! DISFRUTA <br> DE LA <br>
                    EXPERIENCIA <br> <span>(¬‿¬)</span></p>
            </div>
        </div>


        <div class="flex justify-center w-[35%] items-center">
            <form
                class="w-[90%] h-[80%] bg-white px-[15px] pt-[15px] flex flex-col items-center border rounded-br-[90px] rounded-tl-[90px]"
                @submit="register">
                <h2 class="my-[20px] text-[30px] font-bold">Registro</h2>
                <div class="flex flex-wrap gap-[10px] text-neutral-900 w-[90%] text-[15px]">
                    <div class="w-[48%] h-[40px] relative overflow-hidden text-[15px]">
                        <input type="text" required class="fields" v-model="names">
                        <label class="lbl-nombre">
                            <span class="text-nomb text-gray-500">Nombre</span>
                        </label>
                    </div>
                    <div class="w-[48%] h-[40px] relative overflow-hidden text-[15px]">
                        <input type="text" required class="fields" v-model="surnames">
                        <label class="lbl-nombre">
                            <span class="text-nomb text-gray-500">Apellidos</span>
                        </label>
                    </div>
                    <div class="w-[48%] h-[40px] relative overflow-hidden text-[15px]">
                        <input type="text" required class="fields" v-model="identification">
                        <label class="lbl-nombre">
                            <span class="text-nomb text-gray-500"># de Identificación</span>
                        </label>
                    </div>
                    <div class="w-[48%] h-[40px] relative overflow-hidden text-[15px]">
                        <input type="text" required class="fields" v-model="tel">
                        <label class="lbl-nombre">
                            <span class="text-nomb text-gray-500">Telefono</span>
                        </label>
                    </div>
                    <div class="w-[100%] h-[40px] relative overflow-hidden text-[15px]">
                        <input type="text" required class="fields" v-model="email">
                        <label class="lbl-nombre">
                            <span class="text-nomb text-gray-500">Correo electronico</span>
                        </label>
                    </div>
                    <div class="w-[48%] h-[40px] relative overflow-hidden text-[15px]">
                        <input type="password" required class="fields" v-model="password">
                        <label class="lbl-nombre">
                            <span class="text-nomb text-gray-500">Contraseña</span>
                        </label>
                    </div>
                    <div class="w-[48%] h-[40px] relative overflow-hidden text-[15px]">
                        <input type="password" required class="fields" v-model="Cpassword">
                        <label class="lbl-nombre">
                            <span class="text-nomb text-gray-500">Confirmar Contraseña</span>
                        </label>
                    </div>
                </div>

                <button class="text-center mt-[40px] px-[50px] text-white rounded-full bg-slate-600">Registrar</button>
                <p class="mt-[90px]">¿Ya estás registrado? <RouterLink class="text-emerald-800" :to="{name:'login'}">Inicia
                        Sesión</RouterLink>
                </p>
            </form>

        </div>
    </section>


</template>
<script>
import axios from 'axios'
import environ from '../../enviroments/enviroment'
export default {
    data() {
        return {
            names: '',
            surnames: '',
            identification: '',
            tel: '',
            email: '',
            password: '',
            Cpassword: ''
        }
    },
    methods: {
        async register(e) {
            e.preventDefault()
            if (this.password !== this.Cpassword) {
                this.$swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Las contraseñas no coinciden',
                })
                return
            } else {
                const res = await axios.post(environ.URL_API + '/user/sign-up', {
                    names: this.names,
                    surnames: this.surnames,
                    identification: this.identification,
                    tel: this.tel,
                    email: this.email,
                    password: this.password
                })
                if (res) {
                    this.$swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(()=>{
                        this.$router.push({name:'login'})
                    })
                }
            }

        }
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