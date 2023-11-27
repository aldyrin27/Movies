import { createRouter, createWebHistory } from 'vue-router'
import Swal from 'sweetalert2'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MoviesView from '../views/MoviesView.vue'
import DetailView from '../views/DetailView.vue'
import AddBook from '../views/AddBook.vue'
import BookView from '../views/BookView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView
    },
    {
      path: '/add/:id',
      name: 'add',
      component: AddBook
    },
    {
      path: '/book',
      name: 'book',
      component: BookView
    }, 
  ]
})

router.beforeEach((to,from,next) =>{
  if (localStorage.access_token && to.name === 'login'){
    next({name : 'home'})
  } 
  else if (!localStorage.access_token && to.name === 'book') {
    Swal.fire("Must Login First To View");
  } else if (!localStorage.access_token && to.name === 'add') {
    Swal.fire("Must Login First To View");
  } else {
    next()
  }
})

export default router
