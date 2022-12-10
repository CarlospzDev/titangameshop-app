<template>

    <div class="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white p-[30px] w-[35%]">
        <!-- contenedor del modal  -->
        <div
            class="flex justify-between text-[25px] gap-[40px] text-center font-bold border-b-slate-700 border-b-[0.5px] mb-[20px]">
            <!-- header del modal -->
            <h2 class="">Crear Categoria</h2>
            <button class="" @click="returnList">
                <fa icon="xmark" />
            </button>
        </div>

        <div class="pt-[20px]">
            <!-- formulario -->
            <form class="flex flex-col items-center" @submit="create">

                <div class="grid grid-cols-1 gap-[20px]">
                    <div class="w-[95%] h-[40px] relative overflow-hidden text-[15px]">
                        <input type="text" required class="fields" id="name" v-model="name" autocomplete="off">
                        <label class="lbl-nombre">
                            <span class="text-nomb text-gray-500">Nombre De La Categoria</span>
                        </label>
                    </div>
                    <button
                        class="alig text-center mt-[40px] px-[60px] text-white rounded-full bg-slate-600 pt-[5px] pb-[5px]"
                        type="submit">Guardar</button>
                </div>

            </form>
        </div>

    </div>

</template>

<script>
import axios from 'axios';
import environ from '../../../enviroments/enviroment';
export default {
    data() {
        return {
            name: ''
        }
    },
    methods: {
        returnList() {
            this.$router.push({ name: 'list-categories' })
        },
        async create(e) {
            e.preventDefault()
            const res = await axios.post(environ.URL_API + '/category/create', { name: this.name })
            if (res) {
                this.$swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Categoria creada',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    this.$router.push({ name: 'list-categories' })
                })
            }
        }
    },
}
</script>

<style>
.Modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.5);
}
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