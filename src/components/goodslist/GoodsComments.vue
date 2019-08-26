<template>
    <div>
        <comments :id="$route.params.id"></comments>
    </div>
</template>

<style>

</style>

<script>
    //导入评论子组件
    import comments from '../subcomponents/comments.vue'
    export default {
        components:{
            comments
        }
    }

</script>