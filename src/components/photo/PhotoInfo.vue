<template>
    <div class="photoinfo">
        <!--title部分-->
        <h3>{{ msg.title }}</h3>
        <div class="pt-info">
            <span>发表时间：{{ msg.add_time | dataFomate }}</span>
            <span>点击{{ msg.click }}次</span>
        </div>
        <hr/>
        <!--缩略图部分-->
        <vue-preview :slides="slide1" @close="handleClose"></vue-preview>


        <!--图片内容区域-->
        <div class="content">
            {{ msg.content }}
        </div>


        <!--评论区域-->
        <comments :id="id"></comments>
    </div>
</template>

<style lang="scss" scoped>
    .photoinfo{
        padding: 4px;
        h3{
            font-size: 15px;
            color: #26a2ff;
            text-align: center;
            margin: 15px 0;
        }
        .pt-info{
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            color: #8f8f94;
        }
        .content{
            font-size: 13px;
            line-height: 30px;
        }
    }
</style>

<script>
    //导入子组件
    import comments from '../subcomponents/comments.vue'
    export default {
        data(){
            return{
                id:this.$route.params.id,//从路由中获取id
                msg:{}, //图片详情
                slide1:[],//缩略图
            }
        },
        methods:{
            getPhotoInfo(){
                this.$http.get('api/getimageInfo/'+this.id).then(result=>{
                    if (result.body.status === 0){
                        this.msg = result.body.message[0]
                    }
                })
            },
            getThumbs(){
                this.$http.get('api/getthumimages/'+this.id).then(result=>{
                    if (result.body.status === 0) {
                        result.body.message.forEach((item,i)=>{
                            //由于接口文档中没有小图片的src所以小图片无法正常展示
                           // item.msrc = result.body.message[i].src
                            item.alt = 'picture'+(i+1)
                            item.title = 'Image Caption '+(i+1)
                            item.w = 600
                            item.h = 400
                        })
                        this.slide1 = result.body.message
                    }
                })
            },
            handleClose () {
                console.log('close event')
            }
        },
        created(){
            this.getPhotoInfo()
            this.getThumbs()
        },
        //注册子组件
        components:{
            comments
        }
    }

</script>