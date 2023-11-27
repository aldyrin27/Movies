<template>

    <div
      class="card col-md-3 d-flex grid gap-3 mt-5 row mx-auto"
      style="width: 18rem"
      
    >
      <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
        <img
          :src="movies.image"
          alt="image not found"
          class="img-fluid"
        />
          <div
            class="mask"
            style="background-color: rgba(251, 251, 251, 0.15)"
          ></div>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ movies.title }}</h5>
        <p class="card-text">Release Year : {{ movies.releaseYear }}</p>
        <!-- <a @click.prevent="handleDetail(movies.id)" class="btn btn-primary">Detail</a> -->
        &nbsp
        <a @click.prevent="handleAddMovie(movies.id)" class="btn btn-warning">Booking</a>
      </div>
    </div>

</template>

<script>
import { mapActions } from 'pinia';
import { useMovieStore } from '../stores/main';
export default {
  name: "Card",
  data(){
    return {

    }
  },
  props: ["movies"],
  methods : {
    ...mapActions(useMovieStore,['fetchMovieById','toAddMovie']),
    handleDetail(id){
        this.fetchMovieById(id)
    },
    handleAddMovie(id){
        this.toAddMovie(id)
    }
  }
};
</script>

<style>
</style>