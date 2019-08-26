<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- v-for循环渲染轮播图  -->
            <!-- 将来谁调用该子组件就需要为其传递一个lunbolist ,还需要传递一个isfull代表轮播图图片的宽度是否100%         -->
            <mt-swipe-item v-for="item in lunbolist" :key="item.id">
                <img :src="item.img" :class="{'full':isfull}"/>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>


<script>
    export default {
        data(){
            return{

            }
        },
        props:["lunbolist","isfull"]
    }

</script>

<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;
    }
    /*设置轮播图片的大小*/
    .mint-swipe-item img{
        /*width: 100%;*/
        height: 100%;
    }
    .mint-swipe-item{
        text-align: center;
    }
    .full{
        width: 100%;
    }

</style>