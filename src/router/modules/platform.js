/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const platformRouter = {
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
  }

export default platformRouter
