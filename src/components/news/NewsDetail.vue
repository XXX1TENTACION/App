<template>
    <div class="newsdetail">
        <!--标题区域-->
        <h3 class="title">{{ newsdetail.title }}</h3>
        <p class="subtilte">
            <span>发表时间:{{ newsdetail.add_time | dataFomate}}</span>
            <span>点击{{ newsdetail.click }}次</span>
        </p>
        <hr>
        <!--内容区域-->
        <div class="container" v-html="newsdetail.content">

        </div>
        <!--评论区域-->
        <!--父组件给子组件传值-->
        <comments :id="this.id"></comments>
    </div>
</template>
<script>
    //导入评论子组件
    import comments from '../subcomponents/comments.vue'
    import { Toast } from 'mint-ui'
    export default {
        data(){
            return{
                //获取每条新闻的唯一标示
                id:this.$route.params.id,
                newsdetail:{},
            }
        },
        methods:{
            getNewsDetail(){
                this.$http.get('api/getnew/'+this.id).then(result=>{
                    if (result.body.status === 0){
                        this.newsdetail = result.body.message[0]
                    } else{
                        Toast("获取新闻详情失败")
                    }
                })
            }
        },
        created(){
            this.getNewsDetail()
        },
        //注册评论子组件
        components:{
            comments
        }

    }
</script>
<style lang="scss" scoped>
    .newsdetail{
        padding: 0 4px;
    }
    .title{
        font-size: 16px;
        text-align: center;
        color: red;
        margin: 15px 0;
    }
    .subtilte{
        display: flex;
        justify-content: space-between;
        color: #226aff;
        font-size: 13px;
    }
</style>