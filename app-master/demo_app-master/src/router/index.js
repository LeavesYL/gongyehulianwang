import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../components/page/login/index')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/page/register/index')
  },
  {
    path: '/homePage',
    name: 'homePage',
    component: () => import('../components/page/homePage/index')
  },
  {
    path: '/renwu',
    name: 'renwu',
    component: () => import('../components/page/renwu/index')
  },
  {
    path: '/wode',
    name: 'wode',
    component: () => import('../components/page/wode/index')
  },
  {
    path: '/tianjia',
    name: 'tianjia',
    component: () => import('../components/tianjia/index')
  },
  // 产线部分
  {
    path: '/productionMain',
    name: 'main',
    component: () => import('../production-line/production-line-main/index')
  },
  {
    path: '/immediate',
    name: 'immediate',
    component: () => import('../production-line/production-line-immediate/index')
  },
  {
    path: '/abstract',
    name: 'abstract',
    component: () => import('../production-line/production-line-abstract/index')
  },
  {
    path: '/details',
    name: 'details',
    component: () => import('../production-line/production-line-details/index')
  },
  {
    path: '/compare',
    name: 'compare',
    component: () => import('../production-line/production-line-compare/index')
  },
  // 设备管理
  {
    path: '/deviceDetail',
    name: 'deviceDetail',
    component: () => import('../device/deviceDetail/index1')
  },
  {
    path: '/deviceManagement',
    name: 'deviceManagement',
    component: () => import('../device/deviceManagement/index')
  },
  //工单管理
  {
    path: '/gongdanguanli',
    name: 'gongdanguanli',
    component: () => import('../gongdan/gongdanguali/index')
  },
  {
    path: '/fenpei',
    name: 'fenpei',
    component: () => import('../gongdan/fenpei/index')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../gongdan//detail/index')
  },
  {
    path: '/shenhe',
    name: 'shenhe',
    component: () => import('../gongdan/shenhe/index.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
