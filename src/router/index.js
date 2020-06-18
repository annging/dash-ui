import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '概览', icon: 'dashboard' }
    }]
  }, //概览

  {
    path: '/platform',
    component: Layout,
    redirect: '/platform/index',
    name: 'platformManage',
    meta: { title: '平台管理', icon: 'platform' },
    children: [
      {
        path: 'index',
        name: 'platformIndex',
        component: () => import('@/views/platform/index'),
        meta: { title: '平台管理' },
        hidden: true
      },
      {
        path: 'music',
        name: 'music',
        component: () => import('@/views/platform/music'),
        meta: { title: '音乐' }
      },
      {
        path: 'level',
        name: ' level',
        component: () => import('@/views/platform/level'),
        meta: { title: '会员等级设置' }
      },
    ]
  }, // 平台管理

  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/list',
    name: 'activityManage',
    meta: { title: '活动管理', icon: 'activity' },
    children: [
      {
        path: 'list',
        name: 'Activity',
        component: () => import('@/views/activity/list'),
        meta: { title: '活动列表' }
      },
      {
        path: 'detail/:id(\\d+)',
        name: 'detail',
        component: () => import('@/views/activity/detail/index'),
        meta: { title: '活动详细数据', icon: 'activity', activeMenu: '/activity/list' },
        hidden: true,
        children: [
          {
            path: 'overview',
            component: () => import('@/views/activity/detail/overview'),
            name: '活动详情',
            meta: { title: '活动详情', activeMenu: '/activity/index' }
          }
        ]
      },
      {
        path: 'recommendAnli',
        component: () => import('@/views/activity/anliRecommend'),
        name: '优秀案例',
        meta: { title: '优秀案例' },
        hidden: true
      },
      {
        path: 'recommendActivity',
        name: ' recommendActivity',
        component: () => import('@/views/activity/recommend'),
        meta: { title: '首页推荐' },
        hidden: true
      },
      {
        path: 'fangan',
        name: 'fangan',
        redirect: '/fangan/index',
        component: () => import('@/views/activity/fangan'),
        meta: { title: '活动方案'},
        children: [
          {
            path: 'index',
            component: () => import('@/views/activity/fangan/index'),
            name: '活动方案',
            meta: { title: '活动方案' }
          },
          {
            path: 'create',
            component: () => import('@/views/activity/fangan/create'),
            name: 'createFangan',
            meta: { title: '创建方案', activeMenu: '/activity/fangan/index' },
            hidden: true
          },
          {
            path: 'edit/:id(\\d+)',
            name: 'editFangan',
            component: () => import('@/views/activity/fangan/edit'),
            meta: { title: '编辑方案', activeMenu: '/activity/fangan/index' },
            hidden: true,
          },
          {
            path: 'recommend',
            component: () => import('@/views/activity/fangan/recommend'),
            name: '推荐方案列表',
            meta: { title: '推荐方案列表', activeMenu: '/activity/fangan/index'},
            hidden: true
          },
        ]
      },
    ]
  }, // 活动管理

  {
    path: '/merchant',
    component: Layout,
    redirect: '/merchant/index',
    name: 'merchant',
    meta: { title: '商家管理', icon: 'merchant' },
    children: [
      {
        path: 'index',
        name: 'merchantManagement',
        component: () => import('@/views/merchant/index'),
        meta: { title: '商家管理' }
      },
      {
        path: 'create',
        name: 'merchantCreate',
        component: () => import('@/views/merchant/create'),
        meta: { title: '新增商家', activeMenu: '/merchant/index' },
        hidden: true
      },
      {
        path: 'paid',
        name: 'paidMerchantManagement',
        component: () => import('@/views/merchant/paid'),
        meta: { title: '付费商家管理', activeMenu: '/merchant/index'},
        hidden: true
      },
      {
        path: 'renzheng',
        name: 'merchantRZ',
        redirect: '/merchant/renzheng/daishenhe',
        component: () => import('@/views/merchant/renzheng'),
        meta: { title: '认证审核' },
        children: [
          {
            path: 'daishenhe',
            name: 'daishenhe',
            component: () => import('@/views/merchant/renzheng/daishenhe'),
            meta: { title: '待审核', activeMenu: '/merchant/renzheng' },
            hidden: true
          },
          {
            path: 'yishenhe',
            name: 'yishenhe',
            component: () => import('@/views/merchant/renzheng/yishenhe'),
            meta: { title: '认证通过', activeMenu: '/merchant/renzheng' },
            hidden: true
          }
        ]
      }
    ]
  }, // 商家管理

  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'user',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'index',
        name: 'userManagement',
        component: () => import('@/views/user/index'),
        meta: { title: '用户列表' }
      },
      {
        path: 'black',
        name: 'userBlack',
        component: () => import('@/views/user/black'),
        meta: { title: '小黑屋' },
        hidden: true
      }
    ]
  }, // 用户管理

  {
    path: '/order',
    component: Layout,
    redirect: '/order/index',
    name: 'order',
    meta: { title: '订单管理', icon: 'qianbao' },
    children: [
      {
        path: 'index',
        name: 'orderBase',
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理' }
      }
    ]
  }, // 账户中心

  {
    path: '/account',
    component: Layout,
    redirect: '/account/index',
    name: 'account',
    meta: { title: '账户中心', icon: 'qianbao' },
    children: [
      {
        path: 'index',
        name: 'base',
        component: () => import('@/views/account/index'),
        meta: { title: '账户总览' }
      },
      {
        path: 'lishi',
        name: 'lishi',
        component: () => import('@/views/account/lishi'),
        meta: { title: '资金明细' }
      },
      {
        path: 'tixianshenhe',
        name: 'tixianshenhe',
        redirect: '/account/tixianshenhe/daishenhe',
        component: () => import('@/views/account/tixianshenhe'),
        meta: { title: '提现审核' },
        children: [
          {
            path: 'daishenhe',
            name: 'tixiandaishenhe',
            component: () => import('@/views/account/tixianshenhe/daishenhe'),
            meta: { title: '待审核', activeMenu: '/account/tixianshenhe' },
            hidden: true
          },
          {
            path: 'yitongguo',
            name: 'tixianyitongguo',
            component: () => import('@/views/account/tixianshenhe/yitongguo'),
            meta: { title: '提现记录', activeMenu: '/account/tixianshenhe' },
            hidden: true
          }
        ]
      }
    ]
  }, // 账户中心

  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/index',
    name: 'notice',
    meta: { title: '消息中心', icon: 'message' },
    children: [
      {
        path: 'index',
        name: 'guanfang',
        component: () => import('@/views/notice/index'),
        meta: { title: '官方通知' }
      }
    ]
  }, // 通知

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
