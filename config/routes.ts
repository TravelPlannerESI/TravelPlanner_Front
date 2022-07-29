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
    path: '/',
    layout: false,
    component: './main/Maps',
  },
  {
    path: '/dashboard',
    name: '대시보드',
    layout: false,
    icon: undefined,
    component: './dashboard',
  },
  {
    path: '/search',
    name: '조회',
    icon: undefined,
    routes: [
      { name: '날짜별 조회', path: '/search/day', component: './search/DaySearch' },
      { name: '금액별 조회', path: '/search/money', component: './search/MoneySearch' },
    ],
  },
  {
    path: '/manage',
    name: '관리',
    icon: undefined,
    routes: [
      { name: '일정 관리', path: '/manage/day', component: './manage/DayManage' },
      { name: '계획 관리', path: '/manage/plan', component: './manage/PlanManage' },
    ],
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
