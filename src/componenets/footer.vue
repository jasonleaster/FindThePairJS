<template>
    <div class="footer" v-bind:class="{hidden: notShow}">
        A simple JS Find the Pair game by 
            <a href="http://jasonleaster.github.io">Jason Leaster</a> 
            &nbsp; ... &nbsp; Awesome illustrations from 
            <a href="http://www.freepik.com/free-photos-vectors/icon" target="_blank">Freepik</a> 
    </div>
</template>

<script>
    export default {
        props : ["notShow"],
    }
</script>

<style scoped>
.hidden {
   /* 游戏开始后移除footer*/
   transform: translateY(+200px);
}

/*
关于 fixed 定位:
    一个固定定位（position属性的值为fixed）元素会相对于视窗来定位，
这意味着即便页面滚动，它还是会停留在相同的位置。和 relative 一样，
 top 、 right 、 bottom 和 left 属性都可用。
 */

.footer {
    position: fixed;
    bottom: 10%;
    width: 100%;
    text-align: center;
    font: 13px tahoma, "segoe UI", Helvetica, Arial;
    transition: transform 0.5s cubic-bezier(0.785, -0.370, 0.290, 1.335)  0.4s;
}
</style>