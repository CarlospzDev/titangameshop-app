<template>
    <div v-show="showModal" class="modal-overlay">
        <div class="modal">
            <div class="w-full text-right px-[20px]">
                <span class="w-[5px] cursor-pointer font-bold text-[18px] hover:text-gray-400" @click="clicked">X</span>
            </div>
            <form action="" class="flex flex-col gap-[20px]" @submit="finishPurchase">
                <div class="flex flex-col px-[30px] gap-[10px] w-full">
                    <!-- User Info -->
                    <h2 class="text-center font-bold text-[20px]">Datos del usuario</h2>
                    <div class="flex gap-[10px] items-center">
                        <label class="font-semibold" for="name">Nombre: </label>
                        <input type="text" disabled name="name" class="w-[75%] p-[5px] bg-white border-b-2 border-slate-800"
                            v-model="name">
                    </div>
                    <div class="flex gap-[20px] items-center">
                        <label class="font-semibold" for="email">Correo: </label>
                        <input type="text" disabled name="email" class="w-[75%] p-[5px] bg-white border-b-2 border-slate-800"
                            v-model="email">
                    </div>
                </div>
                <div class="flex flex-col gap-[10px] w-full px-[30px]">
                    <!-- Card Info -->
                    <h2 class="text-center text-[19px] font-bold">Informacion de la tarjeta</h2>
                    <div class="flex gap-[20px] items-center">
                        <label for="cardNumber">Numero de tarjeta: </label>
                        <div class="flex justify-center items-center">
                            <input required class="w-[50px] p-[5px] border-b-2 border-slate-800 focus:outline-none" type="text"
                                name="cardNumber1" maxlength="4" v-model="card_number.one" autocomplete="off">-
                            <input required class="w-[50px] p-[5px] border-b-2 border-slate-800 focus:outline-none" type="text"
                                name="cardNumber2" maxlength="4" v-model="card_number.two" autocomplete="off">-
                            <input required class="w-[50px] p-[5px] border-b-2 border-slate-800 focus:outline-none" type="text"
                                name="cardNumber3" maxlength="4" v-model="card_number.three" autocomplete="off">-
                            <input required class="w-[50px] p-[5px] border-b-2 border-slate-800 focus:outline-none" type="text"
                                name="cardNumber3" maxlength="4" v-model="card_number.four" autocomplete="off">
                        </div>
                    </div>
                    <div class="flex gap-[10px] items-center">
                        <label for="cardNumber">Fecha de expiracion: </label>
                        <div class="flex justify-center items-center">
                            <input required class="w-[50px] p-[5px] border-b-2 border-slate-800 focus:outline-none" type="text"
                                name="cardNumber1" maxlength="2" v-model="exp_month" autocomplete="off">/
                            <input required class="w-[50px] p-[5px] border-b-2 border-slate-800 focus:outline-none" type="text"
                                name="cardNumber2" maxlength="2" v-model="exp_year" autocomplete="off">
                        </div>
                    </div>
                    <div class="flex gap-[10px] items-center">
                        <label for="cardNumber">CVC: </label>
                        <div class="flex justify-start items-center">
                            <input required class="w-[50px] p-[5px] border-b-2 border-slate-800 focus:outline-none" type="text"
                                name="cardNumber1" maxlength="3" v-model="cvc" autocomplete="off">
                        </div>
                    </div>
                </div>
                <div>
                    <button class="bg-yellow-400 hover:bg-yellow-500 font-bold text-black">Finalizar Compra</button>
                </div>
            </form>
            <Loading v-if="load"/>
        </div>
    </div>
</template>

<script>
import Loading from '../Loading.vue'
import axios from 'axios';
import environ from '../../enviroments/enviroment';
export default {
    data() {
        return {
            userId: JSON.parse(localStorage.getItem('user'))._id,
            name: JSON.parse(localStorage.getItem('user')).name,
            email: JSON.parse(localStorage.getItem('user')).email,
            exp_month: '',
            exp_year: '',
            card_number: {
                one: '',
                two: '',
                three: '',
                four: ''
            },
            cvc: '',
            load: false
        }
    },
    props: {
        showModal: Boolean
    },
    methods: {
        clicked() {
            this.$emit('clicked', false)
        },
        async finishPurchase(e) {
            e.preventDefault()
            this.load = true
            let res = await axios.post(environ.URL_API + '/cart/purchase', {
                userId: this.userId,
                name: this.name,
                email: this.email,
                exp_month: this.exp_month,
                exp_year: this.exp_year,
                card_number: this.card_number.one + this.card_number.two + this.card_number.three + this.card_number.four,
                cvc: this.cvc
            })
            if (res.data.ok) {
                this.load = false
                this.$swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Compra realizada con exito',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    location.reload()
                })
            }
        }
    },
    components:{
        Loading,
    }

}

</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #000000da;
}

.modal {
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: white;
    height: 500px;
    width: 500px;
    margin-top: 10%;
    padding: 20px 0;
    border-radius: 20px;
}


h6 {
    font-weight: 500;
    font-size: 28px;
    margin: 20px 0;
}


button {
    width: 150px;
    height: 40px;
    font-size: 15px;
    border-radius: 16px;
    margin-top: 50px;
}
</style>