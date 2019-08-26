<template>
    <div>
        <!--顶部移动条区域-->
        <div id="slider" class="mui-slider ">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator
             mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!--item.id == 0 ? 'mui-active' : ''表示当前循环项的id等于0的时候就增加一个类-->
                    <a :class="['mui-control-item',item.id == 0 ? 'mui-active' : '' ]"
                       @click="getPhotoList(item.id)" v-for="item in cate" :key="item.id">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>
        <!--图片列表区域-->
        <ul class="info-list">
            <router-link class="info-item" v-for="item in photoList" :key="item.id"
                     :to="'/home/photoinfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info-container">
                    <h3>{{ item.title }}</h3>
                    <div class="info-content">
                        {{ item.zhaiyao }}
                    </div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<style lang="scss" scoped>

    *{
        touch-action: pan-y;
    }
    /*懒加载样式*/
    .info-list{
        margin: 0;
        padding: 0;
        list-style: none;
        padding: 0 10px;
        padding-bottom: 0;
    }
    .info-list .info-item{
        background-color: lightgrey;
        margin: 5px 0;
        box-shadow: 0 0 9px #919191;
        position: relative;
        img{
            width: 100%;
            vertical-align: bottom;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
    }
    .info-container{
        text-align: left;
        color: white;
        position: absolute;
        bottom: 0;
        background-color:rgba(0,0,0,0.5);
        max-height: 90px;
        h3{
            font-size: 14px;
        }
        .info-content{
            font-size: 13px;

        }
    }

</style>

<script>
import mui from '../../lib/mui/js/mui.js'

    export default {
        data(){
            return{
                cate:[],
                photoList:[]
            }
        },
        methods:{
            //获取顶部滑动条的数据
            getCategroy(){
                this.$http.get('api/getimgcategory').then(result=>{
                    if (result.body.status === 0){
                        //获取数据之后手动添加一项数据
                        result.body.message.unshift({ id:0,title:"全部" })
                        this.cate = result.body.message
                    }
                })
            },
            //获取图片列表的数据
            getPhotoList(cateid){
                this.$http.get('api/getimages/'+cateid).then(result=>{
                    if (result.body.status === 0){
                        this.photoList = result.body.message
                    }
                })
            }
        },
        created(){
            this.getCategroy()
            //默认在页面刚加载的时候显示id为0那项的数据
            this.getPhotoList(0)
        },
        mounted() {
            //实现上方的导航条移动的效果
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        }


    }

</script>