<template>
  <div class="app-container">

    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="黑马程序员·Vue项目">
      <span  slot="left" @click="goBack">
        <mt-button icon="back" v-show="flag">返回</mt-button>
      </span>
    </mt-header>
    <!-- 中间的 路由 router-view 区域 -->

      <transition>
        <router-view></router-view>
      </transition>


    <!-- 底部 Tabbar 区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-zjj" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-zjj" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-zjj" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">{{ $store.getters.getAllCounts }}</span>
				</span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-zjj" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>

  </div>
</template>

<script>
  export default {
      data(){
          return{
              flag:false
          }
      },
      methods:{
          //点击返回按钮返回到上一页
          goBack(){
              this.$router.go(-1)
          }
      },
      //监听路由地址，如果路由地址是首页则将返回按钮隐藏
      watch:{
          "$route.path":function (newvalue) {
              if (newvalue === '/home'){
                  this.flag = false
              }else {
                  this.flag = true
              }
          }
      },
      //在页面加载的时候就设置返回按钮的显示和隐藏
      created(){
          if (this.$route.path === '/home'){
              this.flag = false
          } else {
              this.flag = true
          }
      }
  }

</script>


<style lang="scss" scoped>
  /*设置title的层级*/
  .mint-header{
    z-index: 99;
  }
  .app-container{
      padding-top: 40px;
      padding-bottom: 50px;
    /*解决header和tabbar区域随着页面滚动的问题，这里只能设置x轴方向的hidden*/
    overflow-x: hidden;
  }
  /*为页面滑动添加动画效果*/
  .v-enter{
    /*把这一组动画分开是为了实现页面从右侧进入从左侧离开的效果*/
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    /*解决切换页面时页面上下移动的问题*/
    position: absolute;
  }
  .v-enter-active,
  .v-leave-active{
    transition: all 0.5s ease;
  }
  /*解决tabbar无法切换的问题*/
  .mui-bar-tab .mui-tab-item-zjj.mui-active {
    color: #007aff;
  }
  .mui-bar-tab .mui-tab-item-zjj {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
  }
  .mui-bar-tab .mui-tab-item-zjj .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .mui-bar-tab .mui-tab-item-zjj .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
