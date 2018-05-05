<template>
    <div class="center-circle" v-on:click="startGame" v-bind:class="{hidden: notShow}">
        <div class="message">
            <p>Let's play</p>
            <h1>Find the Pair!</h1>
            <p>Click here to start the game</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["notShow"],
        methods: {
            startGame: function() {
                this.$emit('boost');
                console.log("Game Initlization finished! Just Enjoy it :D ");
            }
        },
    }
</script>

<style>

.hidden {
    transform: scale(0);
}

.center-circle {
    /* align to the center */
    position: absolute;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
    /*
        使用带贝塞尔的动效函数
    */
    transition: transform 0.5s cubic-bezier(0.785, -0.370, 0.290, 1.335)  0.4s;
    /*transition-duration: 3s;*/
}

.message {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    transition: 0.1s ease 0.3s;
    text-align: center;
    font: 16px 'Acme', Helvetica, Arial, sans-serif;
}

.message h1 {
    font: 48px 'Acme', Helvetica, Arial, sans-serif;
    font-weight: normal;
    margin: 0 0 15px;
    color: #FC354C;
}

.message p {
    color: #444;
    font: 13px tahoma, Helvetica, "Segoe UI", Verdana, Arial;
    letter-spacing: 1px;
    margin: 0 0 0;
}


/*
    利用@media screen实现网页布局的自适应
    当检测到设备的最大宽度不足400px时，
    替换/覆盖部分元素的属性
*/

@media screen and (max-width: 400px) {
    .center-circle {
        width: 250px;
        height: 250px;
    }

    .message h1 {
        font: 38px 'Acme', Helvetica, Arial, sans-serif;
        margin: 0 0 10px;
        color: #FC354C;
    }
    .message p {
        font: 13px tahoma, Helvetica, "Segoe UI", Verdana, Arial;
    }
}
</style>