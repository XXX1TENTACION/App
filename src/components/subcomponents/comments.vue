<template>
    <div class="container">
        <h3>发表评论</h3>
        <hr/>
        <textarea placeholder="请输入评论内容，最多120字" maxlength="120" v-model="content"/>
        <mt-button type="primary" size="large" @click="postcmt">发表评论</mt-button>
        <div class="comments">
            <div class="cmt-item" v-for="( item,i ) in message" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i+1 }}楼 &nbsp;&nbsp;
                    用户：{{ item.user_name }} &nbsp;&nbsp;
                    发表时间：{{ item.add_time | dataFomate }} &nbsp;&nbsp;
                </div>
                <div class="cmt-content">
                    {{ item.content === "undefined" ? "这个用户什么都没有留下": item.content }}
                </div>
            </div>
        </div>




        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>

    </div>
</template>

<style lang="scss" scoped>
    .container h1{
        font-size: 18px;
    }
    .container textarea{
        font-size: 13px;
        margin: 0;
        line-height: 30px;
    }
    .comments{
        margin: 5px;
    }
    .comments .cmt-title{
        background-color: lightgray;
        font-size: 14px;
        line-height: 30px;
    }
    .comments .cmt-content{
        font-size: 14px;
        text-indent: 2em;
        line-height: 40px;
    }
</style>

<script>
    import { Toast } from 'mint-ui'
    export default {
        data(){
            return{
                pageindex :1,
                message : [],
                content:'',
            }
        },
        methods:{
            getComments(){
                this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageindex).then(result=>{
                    if (result.body.status === 0){
                        //拼接数组防止后面加载的型数据覆盖前面的数据
                        this.message = this.message.concat(result.body.message)
                    }else {
                        Toast("获取评论失败")
                    }
                })
            },
            postcmt(){
                if (this.content.trim().length === 0){
                    Toast('评论内容不能为空')
                }else{
                    //发送post请求把最新评论提交到服务器
                    this.$http.post('api/postcomment/'+this.$route.params.id,{ content:this.content.trim() })
                        .then(result=>{
                            if (result.body.status === 0){
                                //在客户端重新渲染
                                this.message.unshift({add_time: new Date(),content:this.content,user_name:"匿名用户"})
                                this.content = ''
                            } else {
                                Toast("添加失败")
                            }
                        })
                }
            },
            getMore(){
                //点击加载更多实现加载评论
                this.pageindex++
                this.getComments()
            }
        },
        created(){
            this.getComments()

        },
        props:['id']
    }

</script>