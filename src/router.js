import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopCarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsDetail from './components/news/NewsDetail.vue'
import PhotoList from './components/photo/PhotoList.vue'
import PhotoInfo from './components/photo/PhotoInfo.vue'
import GoodsList from './components/goodslist/GoodsList.vue'
import GoodsInfo from './components/goodslist/GoodsInfo.vue'
import GoodsDesc from './components/goodslist/GoodsDesc.vue'
import GoodsComments from'./components/goodslist/GoodsComments.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [ // 配置路由规则
      { path:'/',redirect:'/home' },
      { path: '/home', component: HomeContainer },
      { path: '/member', component: MemberContainer },
      { path: '/shopcar', component: ShopcarContainer },
      { path: '/search', component: SearchContainer },
      { path:'/home/newslist',component:NewsList },
      { path:'/home/newsdetail/:id',component:NewsDetail },
      { path:'/home/photolist',component:PhotoList } ,
      { path:'/home/photoinfo/:id',component:PhotoInfo },
      { path:'/home/goodslist',component:GoodsList },
      { path:'/home/goodsinfo/:id',component:GoodsInfo },
      { path:'/home/goodsdesc/:id',component:GoodsDesc },
      { path:'/home/goodscomments/:id',component:GoodsComments }
  ],
  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})

// 把路由对象暴露出去
export default router