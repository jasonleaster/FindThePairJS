<template>
    <div class="card" 
        v-bind:card-id="{cardId}" 
        v-bind:card-name="{cardName}"
        v-bind:class="{flipper: isFlipped, rmHidden : animation}"
        v-on:click="flipperHandler" >

        <div class="back"></div>
        <div class="front" v-bind:style="{'background-image': image}"></div>
    </div>
</template>

<script>

const IMG_PATH = "./static/image/cards/";
const IMG_SUFFIX = ".png";

function getImgPath(imgName) {
    return 'url(' + IMG_PATH + imgName + IMG_SUFFIX + ')';
}

export default {
    props: {
        cardId: {
            type: Number,
            default: -1
        },
        cardName: {
            type: String,
            default: "card"
        },
        isFlipped: {
            type: Boolean,
            default: false
        },
        animation: {
            type: Boolean,
            default: false
        },
    },
    data: function () {
        return {
            id: this.cardId,
            name: this.cardName,
            image: getImgPath(this.cardName)
        }
    },
    methods: {
        flipperHandler: function ($event) {
            this.$emit('update', this.id, this.name);
        },
    },
}
</script>

<style scoped>
.card {
    position: relative;
    display: inline-block;
    width: 150px;
    height: 220px;
    margin: 10px;
    border-radius: 10px;
    transition: all 0.3s ease;
    cursor: pointer;

    /*
     * 首先将卡牌的位置上移20像素
     * 待游戏开始后，切换CSS属性，
     * 完成"渐渐引入"的效果
     */
    opacity: 0; 
    transform: translateY(-20px);
}

.rmHidden {
  opacity: 1;
  transform: translateY(0);
}

.back,
.front {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    transition: all 1s ease;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    backface-visibility: hidden;
    /*transition: all 0.3s ease;*/
}

.back {
    background: #fff url(./img/help.png) no-repeat center center;
    background-size: 64px 64px;
    transform: rotateY(0deg);
    z-index: 2;
}

/*
    先将图片翻转180度，待用户触发翻转动作时,
    flipper 选择器会将对应的元素翻转回0°的样子。
 */

.front {
    transform: rotateY(-180deg);
}

/**
 * 当卡片已经反转之后，不允许重新点击
 */
.flipper {
 /*   pointer-events: none;
    cursor: default;*/
}

.flipper .back {
    transform: rotateY(180deg);
    transition: all 1s ease;
}

.flipper .front {
    transform: rotateY(0deg);
    transition: all 1s ease;
}

.card :hover {
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
}

/*
    每个卡片不同的部分
 */
.card:nth-child(1) {
    transition-delay: 1.2s;
}
.card:nth-child(2) {
    transition-delay: 1.4s;
}
.card:nth-child(3) {
    transition-delay: 1.6s;
}
.card:nth-child(4) {
    transition-delay: 1.8s;
}
.card:nth-child(5) {
    transition-delay: 2s;
}
.card:nth-child(6) {
    transition-delay: 2.2s;
}
.card:nth-child(7) {
    transition-delay: 2.4s;
}
.card:nth-child(8) {
    transition-delay: 2.6s;
}
.card:nth-child(9) {
    transition-delay: 2.8s;
}
.card:nth-child(10) {
    transition-delay: 3s;
}
.card:nth-child(11) {
    transition-delay: 3.2s;
}
.card:nth-child(12) {
    transition-delay: 3.4s;
}
.card:nth-child(13) {
    transition-delay: 3.6s;
}
.card:nth-child(14) {
    transition-delay: 3.8s;
}

.card .front {
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center center;
}

@media screen and (max-width: 400px) {
    .card {
        width: 60px;
        height: 88px;
        margin: 5px;
    }
    .back {
        background-size: 32px 32px;
    }

    .front {
        background-size: 60px 88px;
    }
}
</style>