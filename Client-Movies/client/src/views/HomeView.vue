<template>
  <div>
    <div class="container mt-5 p-5">
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <button
            type="button"
            class="btn btn-outline-success"
            data-mdb-ripple-color="dark"
            disabled
          >
            <h1 style="color: #04ba77">NOW PLAYING</h1>
          </button>
        </div>
      </div>
    </div>
     <div class="d-flex justify-content-center mt-5">
      <form @submit.prevent="fetchMovie(page,year)" class="w-25 d-flex" role="search">
        <input v-model="year" class="form-control me-2" type="search" placeholder="Search By Year" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
    <div class="container row mx-auto d-flex">
      <Card 
        v-for="movies in movie" :key="movies.id"
        
        :movies="movies"
      />
    </div>
         <div class="d-grid gap-2 d-md-flex justify-content-md-end m-5 p-5">
    <button :disabled="page===1" @click.prevent="fetchMovie(page -=1)" class="btn btn-primary me-md-2" type="button">Prev</button>
    <button @click.prevent="fetchMovie(page +=1)" class="btn btn-primary" type="button">Next</button>
</div>
  </div>
</template>

<script>

import { mapActions, mapState } from 'pinia';
import { useMovieStore } from '../stores/main';
import Card from "../components/Card.vue";

export default {
    name : "HomeView",
    data(){
      return {
        page : 1,
        year : ""
      }  
    },
    components : {
      Card
    },
    computed : {
        ...mapState(useMovieStore,['movie'])
    },
    methods : {
        ...mapActions(useMovieStore,['fetchMovie'])
    },
    created(){
        this.fetchMovie(this.page)
    }
};
</script>

<style>

</style>