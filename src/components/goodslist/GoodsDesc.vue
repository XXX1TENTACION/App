<template>
    <div class="desc">
        <h3>{{ descList.title }}</h3>
        <hr/>
        <div class="container" v-html="descList.content">
        </div>
    </div>
</template>

<style lang="scss">
    .desc{
        h3{
           font-size: 16px;
            color:#226aff;
            text-align: center;
            margin: 15px 0;
        }
        .container{
            img{
                width: 100%;
            }
        }
    }

</style>

<script>
    export default {
        data(){
            return{
                descList:{},
            }
        },
        methods:{
            getGoodsDesc(){
                this.$http.get('api/goods/getdesc/'+this.$route.params.id).then(result=>{
                    if (result.body.status === 0){
                        this.descList = result.body.message[0]
                    }
                })
            },
        },
        created(){
            this.getGoodsDesc()
        }
    }

</script>