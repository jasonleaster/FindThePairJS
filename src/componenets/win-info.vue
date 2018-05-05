<template>
    <div class="win-info" v-bind:class="{hidden: notShow}">
        <h1>Good Job! You win the game in 
            <span class="costTime">{{costTime}}</span> seconds!
        </h1>
    </div>
</template>

<script>
    export default {
        props : ["notShow", "costTime"],
    }
</script>

<style scoped>

.hidden {
    visibility: hidden;
}

.win-info {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(238, 238, 238, 0.95);
    transition: all 0.7s ease 0.7s;
    z-index: 40;
}

.win-info h1 {
    position: absolute;
    top: 40%;
    width: 100%;
    text-align: center;
}

</style>