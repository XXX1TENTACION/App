<template>
    <div>
        <!-- 轮播图区域       -->
       <swiper :lunbolist="lunboList" :isfull="true"></swiper>
        <!--  六宫格区域     -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                <img src="../../images/menu1.png"/>
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                <img src="../../images/menu2.png"/>
                <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                <img src="../../images/menu3.png"/>
                <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png"/>
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png"/>
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png"/>
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>

    </div>
</template>
<style lang="scss" scoped>

    /*设置六宫格的背景颜色*/
    .mui-grid-view.mui-grid-9{
        background-color: white;
        border: 0;
    }
    /*去点六宫格的边框*/
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: 0;
    }
    /*修改六宫格图片的大小*/
    .mui-grid-view.mui-grid-9 img{
        width: 60px;
        height: 60px;
    }
    /*修改六宫格字体大小*/
    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
        font-size: 13px;
    }

</style>



<script>
    //导入组件
    import { Toast} from 'mint-ui'
    //1、导入轮播图子组件 2、注册子组件 3、在页面上插入
    import Swiper from '../subcomponents/Swiper.vue'

    export default {
        data(){
            return {
                lunboList: [],
            }
        },
        methods:{
            getLunbotu(){
                this.$http.get('api/getlunbo').then(result=>{
                  //判断数据加载是否成功
                  if(result.body.status === 0){
                      this.lunboList = result.body.message
                  }else{
                      Toast("轮播图数据加载失败！")
                  }
                })
            }
        },
        created(){
            //在页面刚刚加载的时候就调用该方法获取轮播图数据
            this.getLunbotu()
        },
        components:{
            Swiper
        }
    }

</script>