
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'dashbord', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: '', redirect: 'dashbord' },
      { path: 'gestion-des-utilisateurs', name: 'users', component: () => import('pages/Users.vue') },
      { path: 'gestion-des-posts', name: 'posts', component: () => import('pages/Posts.vue') },
      { path: 'mon-profile', name: 'profile', component: () => import('pages/Profile.vue') },
      { path: 'gestion-des-admins', name: 'admins', component: () => import('pages/Admin.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },

  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/Login.vue')
      }
    ]
  }
]

export default routes
