<template>
    <div class="modal-overlay">
        <div class="modal">
            <div class="loading"></div>
            <h2 class="absolute top-[50%] w-[500px] text-center">Procesando compra</h2>
        </div>
    </div>
    
</template>

<style scoped>

@keyframes loading {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.loading {
    position: absolute;
    top: 45%;
    left: 50%;
    margin: -25px 0 0 -25px;
    height: 50px;
    width: 50px;
    border: 6px solid #fafafa;
    border-top-color: #e16971;
    border-bottom-color: #e16971;
    border-radius: 100%;
    animation: loading 1.5s infinite linear;
}

.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
}

.modal {
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: white;
    height: 500px;
    width: 500px;
    margin-top: 10%;
    border-radius: 20px;
}
</style>