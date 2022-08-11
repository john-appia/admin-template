
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: 'dashbord', 
        name: 'home', 
        component: () => import('pages/IndexPage.vue'),
        meta: { requireAuth: true }
      },
      { path: '', redirect: 'dashbord' },
      { 
        path: 'gestion-des-utilisateurs', 
        name: 'users', 
        component: () => import('pages/Users.vue'),
        meta: { requireAuth: true }
      },
      { 
        path: 'gestion-des-posts', 
        name: 'posts', component: () => import('pages/Posts.vue'), 
        meta: { requireAuth: true } 
      },
      { 
        path: 'mon-profile', 
        name: 'profile', 
        component: () => import('pages/Profile.vue'), 
        meta: { requireAuth: true } 
      },
      { 
        path: 'gestion-des-admins', 
        name: 'admins', 
        component: () => import('pages/Admin.vue'), 
        meta: { requireAuth: true } 
      },

      // ADMIN PARAMETERS
      { 
        path: 'type-de-commerces', 
        name: 'typeCommerces', 
        component: () => import('pages/TypeCommerces.vue'), 
        meta: { requireAuth: true } 
      },
      { 
        path: 'type-administrations', 
        name: 'typeAdministrations', 
        component: () => import('pages/TypeAdministrations.vue'), 
        meta: { requireAuth: true } 
      },
      { 
        path: 'statut-demandes', 
        name: 'statutDemandes', 
        component: () => import('pages/StatutDemandes.vue'), 
        meta: { requireAuth: true } 
      },
      { 
        path: 'statut-incidents', 
        name: 'statutIncidents', 
        component: () => import('pages/StatutIncidents.vue'), 
        meta: { requireAuth: true } 
      },
      { 
        path: 'secteur-activites', 
        name: 'secteurActivites', 
        component: () => import('pages/SecteurActivites.vue'), 
        meta: { requireAuth: true } 
      },
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
        component: () => import('pages/Login.vue'),
        meta: { isAuth: true }
      }
    ]
  }
]

export default routes
