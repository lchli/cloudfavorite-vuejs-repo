
const routes = [
  {
    path: '/',
    component: () => import('pages/Login.vue')
    // children: [
    //   { path: '', component: () => import('pages/index.vue') },
    //   { path: '/urlList', component: () => import('pages/UrlList.vue') },
    //   { path: '/login', component: () => import('pages/Login.vue') },
    //   { path: '/register', component: () => import('pages/register.vue') }
    // ]
  },
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue')
  },
  { path: '/register', component: () => import('pages/register.vue') },
  { path: '/writePost', component: () => import('pages/writePost.vue') },
  { path: '/myPost', component: () => import('pages/myPost.vue') },
  { path: '/postDetail', component: () => import('pages/postDetail.vue') }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
