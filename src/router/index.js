import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import platformRouter from './modules/platform'

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
    path: '/wxlogin',
    component: () => import('@/views/login/wxlogin'),
    hidden: true
  },
  {
    path: '/wxcallback',
    component: () => import('@/views/login//wxcallback'),
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
      meta: { title: '??????', icon: 'dashboard' }
    }]
  }, //??????
/*
  {
    path: '/platform',
    component: Layout,
    redirect: '/platform/index',
    name: 'platformManage',
    meta: { title: '????????????', icon: 'platform' },
    children: [
      {
        path: 'index',
        name: 'platformIndex',
        component: () => import('@/views/platform/index'),
        meta: { title: '????????????' },
        hidden: true
      },
      {
        path: 'music',
        name: 'music',
        component: () => import('@/views/platform/music'),
        meta: { title: '??????' }
      },
      {
        path: 'level',
        name: ' level',
        redirect: '/platform/level/index',
        component: () => import('@/views/platform/level'),
        meta: { title: '??????????????????'},
        children: [
          {
            path: 'index',
            component: () => import('@/views/platform/level/index'),
            name: 'levelList',
            meta: { title: '????????????' },
            hidden: true
          },
          {
            path: 'create',
            component: () => import('@/views/platform/level/create'),
            name: 'createLevel',
            meta: { title: '??????????????????', activeMenu: '/platform/level' },
            hidden: true
          },
          {
            path: 'edit/:id(\\d+)',
            name: 'editLevel',
            component: () => import('@/views/platform/level/edit'),
            meta: { title: '??????????????????', activeMenu: '/platform/level/' },
            hidden: true,
          },
        ]
      },
      {
        path: 'mer',
        name: ' mer',
        redirect: '/platform/mer/index',
        component: () => import('@/views/platform/mer'),
        meta: { title: '?????????', activeMenu: '/platform/mer'},
        children: [
          {
            path: 'index',
            component: () => import('@/views/platform/mer/index'),
            name: 'activityset',
            meta: { title: '????????????' },
            hidden: true
          },
          {
            path: 'banner',
            name: 'banner',
            redirect: '/platform/mer/banner/index',
            component: () => import('@/views/platform/mer/banner'),
            meta: { title: '??????BANNER'},
            hidden: true,
            children: [
              {
                path: 'index',
                component: () => import('@/views/platform/mer/banner/index'),
                name: 'bannerList',
                meta: { title: 'banner??????', activeMenu: '/platform/mer'},
                hidden: true
              },
              {
                path: 'create',
                component: () => import('@/views/platform/mer/banner/create'),
                name: 'createBanner',
                meta: { title: '??????', activeMenu: '/platform/mer' },
                hidden: true
              },
              {
                path: 'edit/:id(\\d+)',
                name: 'editBanner',
                component: () => import('@/views/platform/mer/banner/edit'),
                meta: { title: '??????', activeMenu: '/platform/mer' },
                hidden: true,
              }
            ]
          }
        ]
      },
      {
        path: 'user',
        name: ' userSet',
        redirect: '/platform/user/index',
        component: () => import('@/views/platform/user'),
        meta: { title: '?????????'},
        children: [
          {
            path: 'index',
            component: () => import('@/views/platform/user/index'),
            name: 'fenxiao',
            meta: { title: '??????????????????', activeMenu: '/platform/user' },
            hidden: true
          }
        ]
      }
    ]
  }, // ????????????
*/
  platformRouter,
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/list',
    name: 'activityManage',
    meta: { title: '????????????', icon: 'activity' },
    children: [
      {
        path: 'create/:type/:mid(\\d+)',
        name: 'createActivity',
        component: () => import('@/views/activity/create'),
        meta: { title: '????????????', activeMenu: '/activity/list' },
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)/:type/:mid(\\d+)',
        name: 'editActivity',
        component: () => import('@/views/activity/edit'),
        meta: { title: '????????????', icon: 'activity', activeMenu: '/activity/list' },
        hidden: true
      },
      {
        path: 'list',
        name: 'Activity',
        component: () => import('@/views/activity/list'),
        meta: { title: '????????????' }
      },
      {
        path: 'enableUserSaleActivity',
        name: 'enableUserSaleActivity',
        component: () => import('@/views/activity/enableUserSaleActivity'),
        meta: { title: '????????????' },
        hidden: true
      },
      {
        path: 'discount',
        name: 'discount',
        component: () => import('@/views/activity/discount'),
        meta: { title: '???????????????' },
        hidden: true
      },
      {
        path: 'detail/:id(\\d+)',
        name: 'detail',
        component: () => import('@/views/activity/detail/index'),
        redirect: '/activity/detail/:id(\\d+)/overview',
        meta: { title: '??????????????????', icon: 'activity', activeMenu: '/activity/list' },
        hidden: true,
        children: [
          {
            path: 'overview',
            component: () => import('@/views/activity/detail/overview'),
            name: '????????????',
            meta: { title: '????????????', activeMenu: '/activity/list' }
          },
          {
            path: 'statistics',
            component: () => import('@/views/activity/detail/statistics'),
            name: '??????????????????',
            meta: { title: '??????????????????', activeMenu: '/activity/list' }
          },
          {
            path: 'order',
            component: () => import('@/views/activity/detail/order'),
            name: '????????????',
            meta: { title: '??????????????????', activeMenu: '/activity/list' }
          },
          {
            path: 'voteList',
            component: () => import('@/views/activity/detail/voteItemList'),
            name: '????????????',
            meta: { title: '??????????????????', activeMenu: '/activity/list' }
          }
        ]
      },
      {
        path: 'recommendAnli',
        component: () => import('@/views/activity/anliRecommend'),
        name: '????????????',
        meta: { title: '????????????', activeMenu: '/activity/list' },
        hidden: true
      },
      {
        path: 'recommendActivity',
        name: ' recommendActivity',
        component: () => import('@/views/activity/recommend/index'),
        meta: { title: '????????????', activeMenu: '/activity/list' },
        hidden: true
      },
      {
        path: 'recommendActivityAdd',
        name: ' recommendActivityAdd',
        component: () => import('@/views/activity/recommend/create'),
        meta: { title: '??????????????????', activeMenu: '/activity/list' },
        hidden: true
      },
      {
        path: 'activityOptions',
        name: 'activityOptions',
        component: () => import('@/views/activity/activityOptions'),
        meta: { title: '????????????/??????' }
      }
    ]
  }, // ????????????

  {
    path: '/fangan',
    name: 'fangan',
    redirect: '/fangan/index',
    component: Layout,
    meta: { title: '????????????', icon: 'fangan' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/fangan/index'),
        name: '??????',
        meta: { title: '????????????' }
      },
      {
        path: 'create',
        component: () => import('@/views/fangan/create'),
        name: 'createFangan',
        meta: { title: '????????????', activeMenu: '/fangan/index' },
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)',
        name: 'editFangan',
        component: () => import('@/views/fangan/edit'),
        meta: { title: '????????????', activeMenu: '/fangan/index' },
        hidden: true,
      },
      {
        path: 'recommend',
        component: () => import('@/views/fangan/recommend'),
        name: '??????????????????',
        meta: { title: '??????????????????', activeMenu: '/fangan/index'},
        hidden: true
      },
      {
        path: 'counselor',
        name: 'counselor',
        redirect: '/fangan/counselor/index',
        component: () => import('@/views/activity/counselor'),
        meta: { title: '????????????'},
        children: [
          {
            path: 'index',
            component: () => import('@/views/activity/counselor/index'),
            name: 'counselorList',
            meta: { title: '????????????', activeMenu: '/fangan/counselor'},
            hidden: true
          },
          {
            path: 'create',
            component: () => import('@/views/activity/counselor/create'),
            name: 'createCounselor',
            meta: { title: '????????????', activeMenu: '/fangan/counselor' },
            hidden: true
          },
          {
            path: 'edit/:id(\\d+)',
            name: 'editCounselor',
            component: () => import('@/views/activity/counselor/edit'),
            meta: { title: '????????????', activeMenu: '/fangan/counselor' },
            hidden: true,
          }
        ]
      },
    ]
  },

  {
    path: '/merchant',
    component: Layout,
    redirect: '/merchant/index',
    name: 'merchant',
    meta: { title: '????????????', icon: 'merchant' },
    children: [
      {
        path: 'index',
        name: 'merchantManagement',
        component: () => import('@/views/merchant/index'),
        meta: { title: '????????????' }
      },
      {
        path: 'edit/:id(\\d+)',
        name: 'merchantCreate',
        component: () => import('@/views/merchant/edit'),
        meta: { title: '????????????', activeMenu: '/merchant/index' },
        hidden: true
      },
      {
        path: 'paid',
        name: 'paidMerchantManagement',
        component: () => import('@/views/merchant/paid'),
        meta: { title: '??????????????????', activeMenu: '/merchant/index'},
        hidden: true
      },
      {
        path: 'dailingqu',
        name: 'dailingqudMerchantManagement',
        component: () => import('@/views/merchant/dailingqu'),
        meta: { title: '???????????????', activeMenu: '/merchant/index'},
        hidden: true
      },
      {
        path: 'recommend',
        name: 'recommendMerchant',
        component: () => import('@/views/merchant/recommend'),
        meta: { title: '????????????', activeMenu: '/merchant/index'},
        hidden: true
      },
      {
        path: 'detail/:id(\\d+)',
        name: 'merchantDetail',
        component: () => import('@/views/merchant/detail'),
        redirect: '/merchant/detail/:id(\\d+)/overview',
        meta: { title: '??????????????????', activeMenu: '/merchant/index' },
        hidden: true,
        children: [
          {
            path: 'overview',
            component: () => import('@/views/merchant/detail/overview'),
            name: '????????????-??????',
            meta: { title: '????????????', activeMenu: '/merchant/index' }
          },
          {
            path: 'activitys',
            component: () => import('@/views/merchant/detail/activitys'),
            name: '????????????-????????????',
            meta: { title: '????????????-????????????', activeMenu: '/merchant/index' }
          },
          {
            path: 'statistics',
            component: () => import('@/views/merchant/detail/statistics'),
            name: '????????????-????????????1',
            meta: { title: '????????????', activeMenu: '/merchant/index' }
          },
          {
            path: 'wallet',
            component: () => import('@/views/merchant/detail/wallet'),
            name: '????????????-????????????2',
            meta: { title: '????????????', activeMenu: '/merchant/index' }
          },
          {
            path: 'order',
            component: () => import('@/views/merchant/detail/order'),
            name: '????????????-????????????3',
            meta: { title: '????????????', activeMenu: '/merchant/index' }
          },
          {
            path: 'vipHistory',
            component: () => import('@/views/merchant/detail/vipHistory'),
            name: '????????????-????????????',
            meta: { title: '??????????????????', activeMenu: '/merchant/index' }
          }
        ]
      },
      {
        path: 'renzheng',
        name: 'merchantRZ',
        redirect: '/merchant/renzheng/daishenhe',
        component: () => import('@/views/merchant/renzheng'),
        meta: { title: '????????????' },
        children: [
          {
            path: 'daishenhe',
            name: 'daishenhe',
            component: () => import('@/views/merchant/renzheng/daishenhe'),
            meta: { title: '?????????', activeMenu: '/merchant/renzheng' },
            hidden: true
          },
          {
            path: 'yishenhe',
            name: 'yishenhe',
            component: () => import('@/views/merchant/renzheng/yishenhe'),
            meta: { title: '????????????', activeMenu: '/merchant/renzheng' },
            hidden: true
          }
        ]
      },
      {
        path: 'lingqu',
        name: 'merchantLQ',
        redirect: '/merchant/lingqu/daishenhe',
        component: () => import('@/views/merchant/lingqu'),
        meta: { title: '????????????' },
        children: [
          {
            path: 'daishenhe',
            name: 'daishenheLQ',
            component: () => import('@/views/merchant/lingqu/daishenhe'),
            meta: { title: '?????????', activeMenu: '/merchant/lingqu' },
            hidden: true
          },
          {
            path: 'yishenhe',
            name: 'yishenheLQ',
            component: () => import('@/views/merchant/lingqu/yishenhe'),
            meta: { title: '????????????', activeMenu: '/merchant/lingqu' },
            hidden: true
          }
        ]
      }
    ]
  }, // ????????????

  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'user',
    meta: { title: '????????????', icon: 'user' },
    children: [
      {
        path: 'index',
        name: 'userManagement',
        component: () => import('@/views/user/index'),
        meta: { title: '????????????' }
      },
      {
        path: 'detail/:id(\\d+)',
        name: 'userDetail',
        component: () => import('@/views/user/detail'),
        meta: { title: '????????????', activeMenu: '/user/index' },
        hidden: true
      },
      {
        path: 'virtual',
        name: 'virtual',
        component: () => import('@/views/user/virtual'),
        meta: { title: '????????????' }
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/user/admin'),
        meta: { title: '???????????????' }
      },
      {
        path: 'virtualimport',
        name: 'virtualimport',
        component: () => import('@/views/user/virtualImport'),
        meta: { title: '??????????????????', activeMenu: '/user/virtual' },
        hidden: true
      },
      {
        path: 'virtualcreate',
        name: 'virtualcreate',
        component: () => import('@/views/user/virtualCreate'),
        meta: { title: '??????????????????', activeMenu: '/user/virtual' },
        hidden: true
      },
      {
        path: 'black',
        name: 'userBlack',
        component: () => import('@/views/user/black'),
        meta: { title: '?????????' },
        hidden: true
      }
    ]
  }, // ????????????

  {
    path: '/school',
    component: Layout,
    redirect: '/school/index',
    name: 'schoolManage',
    meta: { title: '????????????', icon: 'school' },
    children: [
      {
        path: 'article',
        name: 'article',
        redirect: '/school/article/index',
        component: () => import('@/views/school/article'),
        meta: { title: '????????????'},
        children: [
          {
            path: 'index',
            component: () => import('@/views/school/article/index'),
            name: 'articleList',
            meta: { title: '????????????', activeMenu: '/school/article/index' },
            hidden: true
          },
          {
            path: 'rec',
            component: () => import('@/views/school/article/recommend'),
            name: 'recArticleList',
            meta: { title: '????????????', activeMenu: '/school/article/index' },
            hidden: true
          },
          {
            path: 'create',
            component: () => import('@/views/school/article/create'),
            name: 'createArticle',
            meta: { title: '????????????', activeMenu: '/school/article/index' },
            hidden: true
          },
          {
            path: 'edit/:id(\\d+)',
            name: 'editArticle',
            component: () => import('@/views/school/article/edit'),
            meta: { title: '????????????', activeMenu: '/school/article/index' },
            hidden: true,
          },
        ]
      },
      {
        path: 'teacher',
        name: 'teacher',
        redirect: '/school/teacher/index',
        component: () => import('@/views/school/teacher'),
        meta: { title: '????????????'},
        children: [
          {
            path: 'index',
            component: () => import('@/views/school/teacher/index'),
            name: 'TeacherList',
            meta: { title: '????????????', activeMenu: '/school/teacher'},
            hidden: true
          },
          {
            path: 'create',
            component: () => import('@/views/school/teacher/create'),
            name: 'createTeacher',
            meta: { title: '????????????', activeMenu: '/school/teacher' },
            hidden: true
          },
          {
            path: 'edit/:id(\\d+)',
            name: 'editTeacher',
            component: () => import('@/views/school/teacher/edit'),
            meta: { title: '????????????', activeMenu: '/school/teacher/' },
            hidden: true,
          },
        ]
      },
    ]
  }, // ????????????

  {
    path: '/order',
    component: Layout,
    redirect: '/order/index',
    name: 'order',
    meta: { title: '????????????', icon: 'order' },
    children: [
      {
        path: 'index',
        name: 'orderBase',
        component: () => import('@/views/order/index'),
        meta: { title: '????????????' }
      }
    ]
  }, // ????????????

  {
    path: '/account',
    component: Layout,
    redirect: '/account/index',
    name: 'account',
    meta: { title: '????????????', icon: 'qianbao' },
    children: [
      {
        path: 'index',
        name: 'base',
        component: () => import('@/views/account/index'),
        meta: { title: '????????????' },
        hidden: true
      },
      {
        path: 'lishi',
        name: 'lishi',
        component: () => import('@/views/account/lishi'),
        meta: { title: '????????????' }
      },
      {
        path: 'tixianshenhe',
        name: 'tixianshenhe',
        redirect: '/account/tixianshenhe/daishenhe',
        component: () => import('@/views/account/tixianshenhe'),
        meta: { title: '????????????' },
        children: [
          {
            path: 'daishenhe',
            name: 'tixiandaishenhe',
            component: () => import('@/views/account/tixianshenhe/daishenhe'),
            meta: { title: '?????????', activeMenu: '/account/tixianshenhe' },
            hidden: true
          },
          {
            path: 'yitongguo',
            name: 'tixianyitongguo',
            component: () => import('@/views/account/tixianshenhe/yitongguo'),
            meta: { title: '????????????', activeMenu: '/account/tixianshenhe' },
            hidden: true
          }
        ]
      }
    ]
  }, // ????????????

  {
    path: '/mine',
    component: Layout,
    redirect: '/mine/index',
    name: 'mine',
    meta: { title: '??????', icon: 'qianbao' },
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'minInfo',
        component: () => import('@/views/mine/index'),
        meta: { title: '????????????' },
        hidden: false
      },
      {
        path: 'reset',
        name: 'reset',
        component: () => import('@/views/mine/reset'),
        meta: { title: '????????????' },
        hidden: false
      }
    ]
  },

  /*{
    path: '/notice',
    component: Layout,
    redirect: '/notice/index',
    name: 'notice',
    meta: { title: '????????????', icon: 'message' },
    children: [
      {
        path: 'index',
        name: 'guanfang',
        component: () => import('@/views/notice/index'),
        meta: { title: '????????????' }
      }
    ]
  },*/ // ??????
  {
    path: '/logs',
    component: Layout,
    redirect: '/logs/index',
    name: 'logs',
    meta: { title: '????????????', icon: 'logs' },
    children: [
      {
        path: 'index',
        name: 'loglist',
        component: () => import('@/views/logs/index'),
        meta: { title: '????????????' }
      }
    ]
  }, // ????????????

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // base: process.env.NODE_ENV === 'production' ? '/dash-ui/' : '/',
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
