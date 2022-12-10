<template>

    <div class="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white p-[30px] w-[35%]">
        <!-- contenedor del modal  -->
        <div
            class="flex justify-between text-[25px] gap-[40px] text-center font-bold border-b-slate-700 border-b-[0.5px] mb-[20px]">
            <!-- header del modal -->
            <h2 class="">Crear Juego</h2>
            <button class="" @click="returnList">
                <fa icon="xmark" />
            </button>
        </div>

        <div class="pt-[20px]">
            <!-- formulario -->
            <form class="flex flex-col " @submit="createGame">

                <div class="flex flex-wrap gap-[10px]">

                    <div class="flex flex-col w-[49.1%] gap-[10px]">
                        <div class="flex flex-col w-full gap-[10px] mb-[10px]">
                            <div class="w-full h-[40px] relative overflow-hidden text-[15px]">
                                <input type="text" required class="fields" id="name" autocomplete="off">
                                <label class="lbl-nombre">
                                    <span class="text-nomb text-gray-500">Nombre Del Juego</span>
                                </label>
                            </div>
                            <div class="w-full h-[40px] relative overflow-hidden text-[15px]">
                                <input type="number" required class="fields" id="price" autocomplete="off">
                                <label class="lbl-nombre">
                                    <span class="text-nomb text-gray-500">Precio</span>
                                </label>
                            </div>
                        </div>

                        <div class="w-full">
                            <div class="">
                                <textarea name="" id="description" required
                                    class="border-b-slate-700 border-b-[2.5px] w-full focus:outline-none py-[8px]"
                                    placeholder="Ingrese una descripción" maxlength="400"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-[10px] w-[49.1%]">
                        <div class="w-full">
                            <SelectCategories id="category"></SelectCategories>
                        </div>

                        <div class="w-full flex gap-2 items-end h-full">
                            <label class="custom-file-upload">
                                <input id="upload" required type="file" @change="changeImage"
                                    accept="image/png, image/jpeg" class="hidden" />
                                <fa icon="upload" />
                            </label>
                            <img class="w-[82%] h-[100%]" id="image" alt="">
                        </div>
                    </div>
                </div>
                <div class="w-full flex justify-center">
                    <button
                        class="text-center mt-[40px] w-[100px] text-white rounded-full bg-slate-600 pt-[5px] pb-[5px]"
                        type="submit">
                        Guardar
                    </button>
                </div>
            </form>
        </div>

    </div>

</template>

<script>
import axios from 'axios';
import SelectCategories from '../Categories/SelectCategories.vue';
import environ from '../../../enviroments/enviroment';
export default {
    props: {
        showModalCreate: Boolean
    },
    methods: {
        changeImage(e) {
            let archivo = e.target.files[0]
            let objeto = URL.createObjectURL(archivo)
            let filename = document.getElementById('image')
            filename.src = objeto
        },
        async createGame(e) {
            e.preventDefault()
            const name = document.getElementById('name').value
            const price = parseInt(document.getElementById('price').value)
            const file = document.getElementById('upload')
            const description = document.getElementById('description').value
            const categories = document.getElementById('category')
            const categoryId = categories.options[categories.selectedIndex].value

            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('file0', file.files[0])
            formData.append('categoryId', categoryId)
            formData.append('price', price)

            const res = await axios.post(environ.URL_API + '/game/create', formData, {
                headers: { "Content-Type": "multipart/form-data" },

            })

            if (res) {
                this.$swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se ha creado un nuevo juego',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    this.$router.push({ name: 'list-games' })
                })
            }
        },
        returnList() {
            this.$router.push({ name: 'list-games' })
        },

    },
    components: { SelectCategories }
}
</script>

<style>
.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}

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