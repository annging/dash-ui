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
        redirect: '/platform/level/index',
        component: () => import('@/views/platform/level'),
        meta: { title: '会员等级设置'},
        children: [
          {
            path: 'index',
            component: () => import('@/views/platform/level/index'),
            name: 'levelList',
            meta: { title: '会员等级' },
            hidden: true
          },
          {
            path: 'create',
            component: () => import('@/views/platform/level/create'),
            name: 'createLevel',
            meta: { title: '创建会员等级', activeMenu: '/platform/level' },
            hidden: true
          },
          {
            path: 'edit/:id(\\d+)',
            name: 'editLevel',
            component: () => import('@/views/platform/level/edit'),
            meta: { title: '编辑会员等级', activeMenu: '/platform/level/' },
            hidden: true,
          },
        ]
      },
      {
        path: 'mer',
        name: ' mer',
        redirect: '/platform/mer/index',
        component: () => import('@/views/platform/mer'),
        meta: { title: '商家端', activeMenu: '/platform/mer'},
        children: [
          {
            path: 'index',
            component: () => import('@/views/platform/mer/index'),
            name: 'activityset',
            meta: { title: '活动设置' },
            hidden: true
          }
        ]
      },
      /*{
        path: 'user',
        name: ' userSet',
        redirect: '/platform/user/index',
        component: () => import('@/views/platform/user'),
        meta: { title: '用户端'},
        children: [
          {
            path: 'index',
            component: () => import('@/views/platform/user/index'),
            name: 'fenxiao',
            meta: { title: '我要赚钱列表', activeMenu: '/platform/user' },
            hidden: true
          }
        ]
      },*/
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
        path: 'create/:type/:mid(\\d+)',
        name: 'createActivity',
        component: () => import('@/views/activity/create'),
        meta: { title: '创建活动', activeMenu: '/activity/list' },
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)/:type/:mid(\\d+)',
        name: 'editActivity',
        component: () => import('@/views/activity/edit'),
        meta: { title: '编辑活动', icon: 'activity', activeMenu: '/activity/list' },
        hidden: true
      },
      {
        path: 'list',
        name: 'Activity',
        component: () => import('@/views/activity/list'),
        meta: { title: '活动管理' }
      },
      {
        path: 'enableUserSaleActivity',
        name: 'enableUserSaleActivity',
        component: () => import('@/views/activity/enableUserSaleActivity'),
        meta: { title: '分销活动' },
        hidden: true
      },
      {
        path: 'discount',
        name: 'discount',
        component: () => import('@/views/activity/discount'),
        meta: { title: '优惠券列表' },
        hidden: true
      },
      {
        path: 'detail/:id(\\d+)/:type',
        name: 'detail',
        component: () => import('@/views/activity/detail/index'),
        redirect: '/activity/detail/:id(\\d+)/:type/overview',
        meta: { title: '活动详细数据', icon: 'activity', activeMenu: '/activity/list' },
        hidden: true,
        children: [
          {
            path: 'overview',
            component: () => import('@/views/activity/detail/overview'),
            name: '活动详情',
            meta: { title: '活动详情', activeMenu: '/activity/list' }
          },
          {
            path: 'statistics',
            component: () => import('@/views/activity/detail/statistics'),
            name: '活动详情数据',
            meta: { title: '活动详情数据', activeMenu: '/activity/list' }
          }
        ]
      },
      {
        path: 'recommendAnli',
        component: () => import('@/views/activity/anliRecommend'),
        name: '优秀案例',
        meta: { title: '优秀案例', activeMenu: '/activity/list' },
        hidden: true
      },
      {
        path: 'recommendActivity',
        name: ' recommendActivity',
        component: () => import('@/views/activity/recommend/index'),
        meta: { title: '首页推荐', activeMenu: '/activity/list' },
        hidden: true
      },
      {
        path: 'recommendActivityAdd',
        name: ' recommendActivityAdd',
        component: () => import('@/views/activity/recommend/create'),
        meta: { title: '添加首页推荐', activeMenu: '/activity/list' },
        hidden: true
      },
      {
        path: 'activityOptions',
        name: 'activityOptions',
        component: () => import('@/views/activity/activityOptions'),
        meta: { title: '活动反馈/举报' }
      }
    ]
  }, // 活动管理

  {
    path: '/fangan',
    name: 'fangan',
    redirect: '/fangan/index',
    component: Layout,
    meta: { title: '方案管理', icon: 'fangan' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/fangan/index'),
        name: '方案',
        meta: { title: '方案管理' }
      },
      {
        path: 'create',
        component: () => import('@/views/fangan/create'),
        name: 'createFangan',
        meta: { title: '创建方案', activeMenu: '/fangan/index' },
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)',
        name: 'editFangan',
        component: () => import('@/views/fangan/edit'),
        meta: { title: '编辑方案', activeMenu: '/fangan/index' },
        hidden: true,
      },
      {
        path: 'recommend',
        component: () => import('@/views/fangan/recommend'),
        name: '推荐方案列表',
        meta: { title: '推荐方案列表', activeMenu: '/fangan/index'},
        hidden: true
      },
      {
        path: 'counselor',
        name: 'counselor',
        redirect: '/fangan/counselor/index',
        component: () => import('@/views/activity/counselor'),
        meta: { title: '活动顾问'},
        children: [
          {
            path: 'index',
            component: () => import('@/views/activity/counselor/index'),
            name: 'counselorList',
            meta: { title: '顾问列表', activeMenu: '/fangan/counselor'},
            hidden: true
          },
          {
            path: 'create',
            component: () => import('@/views/activity/counselor/create'),
            name: 'createCounselor',
            meta: { title: '新增顾问', activeMenu: '/fangan/counselor' },
            hidden: true
          },
          {
            path: 'edit/:id(\\d+)',
            name: 'editCounselor',
            component: () => import('@/views/activity/counselor/edit'),
            meta: { title: '编辑顾问', activeMenu: '/fangan/counselor' },
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
    meta: { title: '商家管理', icon: 'merchant' },
    children: [
      {
        path: 'index',
        name: 'merchantManagement',
        component: () => import('@/views/merchant/index'),
        meta: { title: '商家管理' }
      },
      {
        path: 'edit/:id(\\d+)',
        name: 'merchantCreate',
        component: () => import('@/views/merchant/edit'),
        meta: { title: '编辑商家', activeMenu: '/merchant/index' },
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
        path: 'dailingqu',
        name: 'dailingqudMerchantManagement',
        component: () => import('@/views/merchant/dailingqu'),
        meta: { title: '待领取商家', activeMenu: '/merchant/index'},
        hidden: true
      },
      {
        path: 'recommend',
        name: 'recommendMerchant',
        component: () => import('@/views/merchant/recommend'),
        meta: { title: '推荐商家', activeMenu: '/merchant/index'},
        hidden: true
      },
      {
        path: 'detail/:id(\\d+)',
        name: 'merchantDetail',
        component: () => import('@/views/merchant/detail'),
        redirect: '/merchant/detail/:id(\\d+)/overview',
        meta: { title: '商家详细数据', activeMenu: '/merchant/index' },
        hidden: true,
        children: [
          {
            path: 'overview',
            component: () => import('@/views/merchant/detail/overview'),
            name: '商家详情-概览',
            meta: { title: '商家详情', activeMenu: '/merchant/index' }
          },
          {
            path: 'activitys',
            component: () => import('@/views/merchant/detail/activitys'),
            name: '商家详情-活动列表',
            meta: { title: '商家详情-活动列表', activeMenu: '/merchant/index' }
          },
          {
            path: 'statistics',
            component: () => import('@/views/merchant/detail/statistics'),
            name: '商家详情-数据统计',
            meta: { title: '商家详情', activeMenu: '/merchant/index' }
          }
        ]
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
      },
      {
        path: 'lingqu',
        name: 'merchantLQ',
        redirect: '/merchant/lingqu/daishenhe',
        component: () => import('@/views/merchant/lingqu'),
        meta: { title: '领取审核' },
        children: [
          {
            path: 'daishenhe',
            name: 'daishenheLQ',
            component: () => import('@/views/merchant/lingqu/daishenhe'),
            meta: { title: '待审核', activeMenu: '/merchant/lingqu' },
            hidden: true
          },
          {
            path: 'yishenhe',
            name: 'yishenheLQ',
            component: () => import('@/views/merchant/lingqu/yishenhe'),
            meta: { title: '审核通过', activeMenu: '/merchant/lingqu' },
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
        path: 'detail/:id(\\d+)',
        name: 'userDetail',
        component: () => import('@/views/user/detail'),
        meta: { title: '用户详情', activeMenu: '/user/index' },
        hidden: true
      },
      {
        path: 'virtual',
        name: 'virtual',
        component: () => import('@/views/user/virtual'),
        meta: { title: '虚拟用户' }
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/user/admin'),
        meta: { title: '后台管理员' }
      },
      {
        path: 'virtualimport',
        name: 'virtualimport',
        component: () => import('@/views/user/virtualImport'),
        meta: { title: '导入虚拟用户', activeMenu: '/user/virtual' },
        hidden: true
      },
      {
        path: 'virtualcreate',
        name: 'virtualcreate',
        component: () => import('@/views/user/virtualCreate'),
        meta: { title: '导入虚拟用户', activeMenu: '/user/virtual' },
        hidden: true
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
    path: '/school',
    component: Layout,
    redirect: '/school/index',
    name: 'schoolManage',
    meta: { title: '商家学院', icon: 'school' },
    children: [
      {
        path: 'article',
        name: 'article',
        redirect: '/school/article/index',
        component: () => import('@/views/school/article'),
        meta: { title: '文章管理'},
        children: [
          {
            path: 'index',
            component: () => import('@/views/school/article/index'),
            name: 'articleList',
            meta: { title: '文章列表', activeMenu: '/school/article/index' },
            hidden: true
          },
          {
            path: 'rec',
            component: () => import('@/views/school/article/recommend'),
            name: 'recArticleList',
            meta: { title: '推荐文章', activeMenu: '/school/article/index' },
            hidden: true
          },
          {
            path: 'create',
            component: () => import('@/views/school/article/create'),
            name: 'createArticle',
            meta: { title: '创建文章', activeMenu: '/school/article/index' },
            hidden: true
          },
          {
            path: 'edit/:id(\\d+)',
            name: 'editArticle',
            component: () => import('@/views/school/article/edit'),
            meta: { title: '编辑文章', activeMenu: '/school/article/index' },
            hidden: true,
          },
        ]
      },
      {
        path: 'teacher',
        name: 'teacher',
        redirect: '/school/teacher/index',
        component: () => import('@/views/school/teacher'),
        meta: { title: '导师管理'},
        children: [
          {
            path: 'index',
            component: () => import('@/views/school/teacher/index'),
            name: 'TeacherList',
            meta: { title: '导师列表', activeMenu: '/school/teacher'},
            hidden: true
          },
          {
            path: 'create',
            component: () => import('@/views/school/teacher/create'),
            name: 'createTeacher',
            meta: { title: '新增导师', activeMenu: '/school/teacher' },
            hidden: true
          },
          {
            path: 'edit/:id(\\d+)',
            name: 'editTeacher',
            component: () => import('@/views/school/teacher/edit'),
            meta: { title: '编辑导师', activeMenu: '/school/teacher/' },
            hidden: true,
          },
        ]
      },
    ]
  }, // 内容管理

  {
    path: '/order',
    component: Layout,
    redirect: '/order/index',
    name: 'order',
    meta: { title: '订单管理', icon: 'order' },
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
        meta: { title: '账户总览' },
        hidden: true
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
    path: '/mine',
    component: Layout,
    redirect: '/mine/index',
    name: 'mine',
    meta: { title: '我的', icon: 'qianbao' },
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'minInfo',
        component: () => import('@/views/mine/index'),
        meta: { title: '我的账号' },
        hidden: false
      },
      {
        path: 'reset',
        name: 'reset',
        component: () => import('@/views/mine/reset'),
        meta: { title: '重置密码' },
        hidden: false
      }
    ]
  },

  /*{
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
  },*/ // 通知
  {
    path: '/logs',
    component: Layout,
    redirect: '/logs/index',
    name: 'logs',
    meta: { title: '系统日志', icon: 'logs' },
    children: [
      {
        path: 'index',
        name: 'loglist',
        component: () => import('@/views/logs/index'),
        meta: { title: '系统日志' }
      }
    ]
  }, // 系统日志

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
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
