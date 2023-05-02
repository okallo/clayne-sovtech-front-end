import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import People from '../views/PeopleView.vue'
import Jokes from '../views/JokesView.vue'
import Search from '../views/SearchView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/jokes',
    name: 'jokes',
    component: Jokes
  },
  {
    path: '/people',
    name: 'people',
    component: People
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
