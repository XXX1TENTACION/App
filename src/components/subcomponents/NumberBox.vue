<template>
    <div>
        <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='stock'>
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1" @change="getChange" ref="box"/>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>

<style>

</style>

<script>
    import mui from '../../lib/mui/js/mui'
    export default {
        mounted() {
            mui('.mui-numbox').numbox()
        },
        data(){
            return{
                number:1
            }
        },
        methods:{
            getChange(){
                this.number = this.$refs.box.value
                this.$emit("getCount",parseInt(this.number))
            },

        },
        props:["stock"],
        watch:{
            //根据父组件中的库存情况控制数量选择框的最大值
            stock:function (newvalue,oldvalue) {
                mui('.mui-numbox').numbox().setOption('max',newvalue)
            }
        }
    }

</script>