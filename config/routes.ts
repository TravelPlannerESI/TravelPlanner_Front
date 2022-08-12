export default [
  {
    path: '/nologin',
    layout: false,
    routes: [
      {
        name: 'nologin-maps',
        path: '/nologin/maps',
        component: './nologin/Maps',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: '대시보드',
    icon: undefined,
    component: './dashboard',
  },
  {
    path: '/',
    layout: false,
    component: './main/Maps',
  },
  {
    path: '/search/day',
    name: '조회',
    icon: undefined,
    component: './search/DaySearch',
  },
  {
    path: '/manage',
    name: '관리',
    icon: undefined,
    component: './manage/PlanManage',
  },
  {
    path: '/setting',
    component: './setting',
    menuRender: false,
  },

  // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  // {
  //   path: '/',
  //   redirect: '/welcome',
  // },
  {
    component: './404',
  },
];
