<template>

<section class="flex flex-col items-center gap-[50px]  justify-center" >
    <h2 class="text-white text-center text-[40px]">Informacion de la cuenta</h2>
    <fa class="text-white text-[80px]" icon="user"/>
    <div class="flex  w-[100%] h-[400px] bg-slate-800">
        <div class="w-[50%] gap-[20px]">
            <button class="text-white text-[25px] p-[10px] bg-slate-700 hover:bg-violet-700 ">Credenciales</button>
            <div>
                <input class="input-style" type="text">
                <label for="">
                    <span>Editar Usuario</span>
                </label>
            </div>
            <div>
                <input type="text">
                <label for="">
                    <span>Editar Correo</span>
                </label>
            </div>
            <div>
                <input type="password">
                <label for="">
                    <span>Editar Contraseña</span>
                </label>
            </div>
        </div>

        <div class="w-[50%]">
            <button class="text-white text-[25px] p-[10px] bg-slate-700 hover:bg-violet-700">Productos</button>
        </div>




        
        
    </div>
</section>


</template>
<script></script>

<style scoped>

.input-style{
    border-radius: 10px;
    width: 200px;
    height: 30px;
}


</style>