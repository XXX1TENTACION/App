<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media"v-for="item in newsList" :key="item.id">
                <router-link :to="'/home/newsdetail/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                        <div class="mui-media-body">
                            <h1>{{ item.title }}</h1>
                            <p class='mui-ellipsis'>
                                <span>发表时间:{{ item.add_time | dataFomate()}}</span>
                                <span>点击次数:{{ item.click }}次</span>
                            </p>
                        </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui'
    export default {
        data(){
            return{
                newsList:[]
            }
        },
        methods:{
            getNews(){
                this.$http.get('api/getnewslist').then(result=>{
                    if (result.body.status === 0){
                        this.newsList = result.body.message
                    }else{
                        Toast("获取新闻数据失败")
                    }
                })
            }
        },
        created(){
            this.getNews()
        },
    }

</script>

<style lang="scss" scoped>
    .mui-table-view h1{
        font-size: 14px;
    }
    .mui-table-view .mui-ellipsis{
        font-size: 12px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    

</style>
