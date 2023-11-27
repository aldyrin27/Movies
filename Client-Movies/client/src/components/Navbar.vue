<template>
    <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" style="cursor : pointer">
            <a @click.prevent="toHome" class="nav-link active" aria-current="page">Home</a>
          </li>
          <li class="nav-item" style="cursor : pointer">
            <a @click.prevent="toBookList" class="nav-link active" >List Booking</a>
          </li>
        </ul>
      </div>
      <div class="ms-auto">
        <button @click.prevent="toLogin" v-if="!isLogin" type="button" class="btn btn-success">login</button>
        <button @click.prevent="logout" v-else  type="button" class="btn btn-danger">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>

import {mapState, mapActions} from 'pinia'
import {useMovieStore} from '../stores/main'

export default {
     name : "Navbar",
  methods : {
    ...mapActions(useMovieStore,['logout','toLogin','toHome','toBookList']),
  },
  computed : {
    ...mapState(useMovieStore,['access_token']),
    isLogin(){
      return this.access_token ? true : false
    }
  }
}
</script>

<style>

</style>