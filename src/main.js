//入口文件

//导入vue
import Vue from 'vue'
//导入App.vue
import app from './App.vue'


//导入路由的包
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)

//导入路由对象
import router from './router.js';

//导入vuex
import Vuex from 'vuex'
//注册
Vue.use(Vuex)


//每次加载页面的时候把本地存储中的数据交给car
let car = JSON.parse(localStorage.getItem("car") || "[]")
//创建vuex实例
let store = new Vuex.Store({
    state:{  //this.$store.state.***
        //保存所有加入购物车的商品信息  { id:商品的id，count：商品的数量，price：商品的单价，selectd：商品是否参与结算 }
        car:car
    },
    mutations:{  //this.$store.commit('函数名'，‘参数’)
        //定义把商品信息添加至car中的方法
        addToCar(state,goodsinfo){
            //判断再添加商品之前购物超车中是否已近存在该商品，若存在，则之用增加其数量即可，不存在，则添加商品信息
            let flag = false //默认购物车中不存在要添加的商品
            state.car.some(item=>{
                if (item.id === goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    //将flag修改为true
                    flag = true
                    //结束循环
                    return true
                }
            })
            //只有购物车中不存要添加的商品信息的时候，才将商品信息添加至car
            if (flag === false){
                state.car.push(goodsinfo)
            }

            //每次都将car中的数据备份一份到本地存储
            localStorage.setItem("car",JSON.stringify(state.car))
        },
        //在购物车页面同步更新商品数量
        updataGoodsinfo(state,goodsinfo){
            state.car.some(item=>{
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.counts)
                    return
                }
            })
            localStorage.setItem("car",JSON.stringify(state.car))
        },
        //删除数据
        del(state,id){
            state.car.some((item,i)=>{
                if (item.id == id){
                    state.car.splice(i,1)
                    console.log("ok")
                    return true
                }
            })
            //更新本地存储中的数据
            localStorage.setItem("car",JSON.stringify(state.car))
        },
        //同步更新本地存储中的select
        updateSelected(state,selectedInfo){
            state.car.some(item=>{
                if (item.id == selectedInfo.id){
                    item.selected = selectedInfo.select
                }
            })
            localStorage.setItem("car",JSON.stringify(state.car))
        }
    },
    getters:{  //this.$store.getters.***
        //实现徽标数值跟随购物车中的数量动态改变
        getAllCounts(state){
            let count = 0
            state.car.forEach(item=>{
                count += item.count
            })
            return count
        },
        //实现从本地存储中获取每个商品的id及对应的商品数量,最终要把商品数量的值传递给购物车中的numberbox子组件
        getGoodsCounts(state){
            let obj = {}
            //遍历数组把数组中每项的id作为对象的键，每项的count作为对象的值
            //{ 55：1，44：2 }
            state.car.forEach(item=>{
                obj[item.id] = item.count
            })
            return obj
        },
        //获取car商品的selected
        getGoodsSelected(state){
            let obj = {}
            state.car.forEach(item=>{
                obj[item.id] = item.selected
            })
            return obj
        },
        //获取勾选商品的数量及其总价
        getGoodsCountsAndAmount(state){
            let obj ={
                counts:0,
                price:0
            }
            state.car.forEach(item=>{
                if (item.selected){
                    obj.counts += item.count
                    obj.price += item.count * item.price
                }
            })
            return obj
        }
    }
})

//导入VueResource
import VueResource from 'vue-resource';
//安装VueResource
Vue.use(VueResource)
//全局设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
//全局设置post请求的表单数据格式组织形式
Vue.http.options.emulateJSON = true

//导入moment
import moment from 'moment'
//定义全局的过滤器格式化时间
Vue.filter("dataFomate",function (dataStr,pattern = "YYYY-MM-DD HH:MM:SS") {
    return moment(dataStr).format(pattern)

})


//按需导入mint-ui组件
import { Header ,Swipe, SwipeItem,Button ,Lazyload,Switch  } from 'mint-ui';
//注册组件
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);
Vue.component(Switch.name, Switch);
//导入MUI样式
import  './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
import './lib/mui/fonts/mui-icons-extra.ttf';


//安装图片预览插件
import VuePreview from 'vue-preview'

Vue.use(VuePreview)






let vm = new Vue({
    el:"#app",
    //使用render将根组件渲染到index主页面中
    render:c=>c(app),
    router,
    //挂载vuex
    store
})