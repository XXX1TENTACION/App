<template>
    <div class="goodsinfo-container">
        <!--小球动画区域-->
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
        >
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <!--  轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!--注意，子组件中获取图片的的地址属性为item.img，所以需要在获取到message之后为其添加一个img属性-->
                    <swiper :lunbolist="lunboList" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <!-- 购买区域    -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsInfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>
                        <span>市场价：<del>￥{{ goodsInfo.market_price }}</del></span>&nbsp;&nbsp;
                        销售价：<span class="sell">￥{{ goodsInfo.sell_price }}</span>
                    </p>
                        <p>购买数量：<NumberBox @getCount="getSelectCount" :stock="goodsInfo.stock_quantity"></NumberBox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addtoCar" >加入购物车</mt-button>
                    </p>

                </div>
            </div>
        </div>





        <!--   商品参数区域     -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsInfo.goods_no }}</p>
                    <p>库存情况：{{ goodsInfo.stock_quantity }}</p>
                    <p>上架时间：{{ goodsInfo.add_time | dataFomate }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goGoodsDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComments(id)" >商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    //导入轮播图子组件
    import Swiper from '../subcomponents/Swiper.vue'
    //导入添加box组件
    import NumberBox from '../subcomponents/NumberBox.vue'
    export default {
        data(){
            return{
                id:this.$route.params.id,
                lunboList:[],
                goodsInfo:{},
                ballFlag:false,
                count:1 //设置数量选择中的值默认为1,代表最终选择框中的数据
            }
        },
        methods:{
            getLunbotu(){
                this.$http.get('api/getthumimages/'+this.id).then(result=>{
                    if (result.body.status === 0){
                        result.body.message.forEach(item=>{
                            item.img = item.src
                            this.lunboList = result.body.message
                        })

                    }
                })
            },
            getGoodsInfo(){
                this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                    if (result.body.status === 0){
                        this.goodsInfo = result.body.message[0]
                    }
                })
            },
            goGoodsDesc(id){
                this.$router.push('/home/goodsdesc/'+id)
            },
            goComments(id){
                this.$router.push('/home/goodscomments/'+id)
            },
            //添加购物车小球动画
            addtoCar(){
                this.ballFlag = !this.ballFlag
                //每次点击添加之购物车就创建一个对象传递到vuex中
                //{ id:商品的id，count：商品的数量，price：商品的单价，selected：商品是否参与结算 }
                let goodsinfo = {
                    id:this.id,
                    count:this.count,
                    price: this.goodsInfo.sell_price,
                    selected:true  //默认商品是被选中的状态
                }
                //console.log(goodsinfo)
                //调用vuex中的方法
                this.$store.commit('addToCar',goodsinfo)

            },
            beforeEnter(el){
                el.style.transform = 'translate(0,0)'
            },
            enter(el,done){
                el.offsetWidth
                //获取小球在页面中的坐标
                let ballposition = this.$refs.ball.getBoundingClientRect()
                //回去徽标在页面中的位置
                let bagdeposition = document.getElementById("badge").getBoundingClientRect()
                //求出这两个位置的差值
                let xDis = bagdeposition.left - ballposition.left
                let yDis = bagdeposition.top - ballposition.top

                //模板字符串
                el.style.transform = `translate(${xDis}px,${yDis}px)`
                el.style.transition = 'all 0.5s cubic-bezier(.4,-0.3,1,.68)'
                done()
            },
            afterEnter(el){
                this.ballFlag = !this.ballFlag
            },
            //为子组件定义一个方法，让父组件拿到数量选择框中的值
            getSelectCount(count){
                this.count = count
                //console.log("父组件拿到的值为："+this.count)
            }
        },

        created(){
            this.getLunbotu()
            this.getGoodsInfo()
        },
        components:{
            Swiper,
            NumberBox
        }
    }

</script>

<style lang="scss" scoped>
    .goodsinfo-container{
        background-color: #eeeeee;
        overflow: hidden;
        /*设置小球样式*/
        .ball{
            width: 15px;
            height: 15px;
            background-color: red;
            border-radius: 50%;
            position: absolute;
            z-index: 99;
            left: 77px;
            top: 411px;

        }
    }
        .mui-card{
            .sell{
                font-size: 16px;
                color: red;
                font-weight: bold;
            }
        .mui-card-footer {
            display: block;

            button {
                margin: 15px 0;
            }
        }

    }

</style>