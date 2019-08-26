<template>
    <div class="shop-container">
        <div class="mui-card" v-for="(item,i) in goodsList":key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                               @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])">

                    </mt-switch>
                    <div class="right">
                        <img :src="item.thumb_path"/>
                        <div class="shop-info">
                            <h3>{{ item.title }}</h3>
                            <p style="margin: 0">
                                <span class="sell">￥{{ item.sell_price }}</span>
                                <!--nuberbox区域-->
                                <NumberBox :counts="$store.getters.getGoodsCounts[item.id]" :id="item.id"></NumberBox>
                               <span><a href="#" @click.prevent="del(item.id,i)"> 删除</a></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="topay">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品<span>{{ $store.getters.getGoodsCountsAndAmount.counts }}</span>件，
                            总价<span style="font-weight: bold">￥{{ $store.getters.getGoodsCountsAndAmount.price}}</span></p>
                    </div>
                    <mt-button type="danger" >去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .shop-container{
        background-color: #eeeeee;
        overflow: hidden;
        .mui-card{
            img{
                width: 60px;
                height: 60px;
            }
            h3{
                font-size: 15px;
            }
            .sell{
                font-size: 14px;
                color: red;
                font-weight: bold;
            }
           .mui-card-content-inner{
               display: flex;
           }
            .right{
                display: flex;
                align-items: center;
            }
        }
        .mui-card-content-inner{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .topay{
                span{
                    color: red;
                }
            }
        }
    }
</style>
<script>
    //导入numberbox
    import NumberBox from '../shopcar/NumberBox.vue'
    export default {
        components:{
            NumberBox
        },
        data(){
            return{
                goodsList:[]
            }
        },
        methods:{
            getGoodsList(){
                let listArr = []
                //遍历购物车中的信息，被商品id存放到listArr中
                this.$store.state.car.forEach(item=>{
                    listArr.push(item.id)
                })
                //如果购物车中没有数据直接return
                if (listArr.length === 0){
                    return
                }

                this.$http.get('api/goods/getshopcarlist/'+listArr.join(',')).then(result=>{
                    if (result.body.status === 0){
                        this.goodsList = result.body.message
                    }
                })
            },
            del(id,index){
                this.goodsList.splice(index,1)
                //掉用全局方法删除本地存储中的数据
                this.$store.commit('del',id)
            },
            selectedChange(id,select){
               // console.log(id+"----"+select)
                this.$store.commit('updateSelected',{id,select})
            },
        },

        created(){
            this.getGoodsList()
        }
    }

</script>