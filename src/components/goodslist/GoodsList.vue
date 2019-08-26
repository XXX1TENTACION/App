<template>
    <div class="goods-container">
       <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goGoodsInfo(item.id)">
           <img :src="item.img_url" />
           <h3>{{ item.title }}</h3>
           <div class="goods-content">
               <p class="price">
                   <span class="new">￥{{ item.sell_price }}</span>
                   <span class="old">￥{{ item.market_price }}</span>
               </p>
               <p class="sell">
                   <span>热卖中</span>
                   <span>剩{{ item.stock_quantity }}件</span>
               </p>
           </div>
       </div>
        <!--  点击加载更多-->
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<style lang="scss" scoped>
    .goods-container{
        padding: 7px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .goods-item{
            border: 1px solid #cccccc;
            box-shadow: 0 0 8px #cccccc;
            width: 49%;
            margin: 4px 0;
            padding: 2px;
            min-height: 309px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            img{
                width: 100%;
            }
            h3{
                font-size: 15px;
            }
            .goods-content{
                background-color: #eeeeee;
                p{
                    margin: 0;
                    padding: 8px;
                }
                .new{
                    font-size: 18px;
                    color: red;
                    font-weight: bold;
                }
                .old{
                    font-size: 13px;
                    text-decoration: line-through;
                    margin-left: 8px;
                }
              .sell{
                  display: flex;
                  justify-content: space-between;
              }
            }
        }
    }
</style>

<script>
    export default {
        data(){
            return {
                pageindex:1,
                goodsList:[],
            }
        },
        methods:{
            getGoods(){
                this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
                    if (result.body.status === 0){
                        this.goodsList = this.goodsList.concat(result.body.message)
                    }
                })
            },
            getMore(){
                this.pageindex++
                this.getGoods()
            },
            //编程式导航
            goGoodsInfo(id){
                this.$router.push('/home/goodsinfo/'+id)
            },
        },

        created(){
            this.getGoods()
        }
    }

</script>