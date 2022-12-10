<template>
</template>

<script>
import axios from 'axios'
import environ from '../../../enviroments/enviroment';
export default {
    mounted() {
        this.$swal.fire({
                title: '¿Seguro que desea borrar esta categoria?',
                text: "Una vez la borres no podras revertirlo!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrala!',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axios.delete(environ.URL_API + '/category/delete/' + this.$route.params.id)
                    if (res.data.ok) {
                        this.$swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(()=>{
                            this.$router.push({name:'list-categories'})
                        })
                    }
                }else{
                    this.$router.push({name:'list-categories'})
                }
            })
    }
}
</script>