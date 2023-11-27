<template>
   <div class="container mt-5 w-50">
    <div class="card mb-3">
      <img
        :src="movieId.image"
        class="card-img-top"
        alt="loading"
      />
      <div class="card-body">
        <h5 class="card-title">{{movieId.title}}</h5>
        <p class="card-text">
          <small class="text-body-secondary"> Release Year :
          <h5>{{movieId.releaseYear}}</h5></small>
        </p>
        <p class="card-text">
          <a href="#" class="btn btn-warning">Booking</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useMovieStore } from '../stores/main'
export default {
    name : "DetailView",
    computed : {
        ...mapState(useMovieStore,['movieId'])
    },
    methods : {
        ...mapActions(useMovieStore,['fetchMovieById'])
    },
    // created(){
    //   this.fetchMovieById()
    // }
}
</script>

<style>

</style>