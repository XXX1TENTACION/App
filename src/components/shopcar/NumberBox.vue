<template>
    <div>
        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number"  @change="countChange"
                   :value="counts"  ref="box" readonly/>
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
        data() {
            return {

            }
        },
        methods: {
            countChange(){
                this.$store.commit('updataGoodsinfo',{id:this.id,counts:this.$refs.box.value})
            }
        },
        props:["counts","id"]
    }

</script>