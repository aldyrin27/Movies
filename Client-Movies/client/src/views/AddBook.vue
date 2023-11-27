<template>
  <div class="container d-flex mt-5 p-5">
    <div class="card" style="width: 18rem">
      <img
        :src="movieId.image"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <p class="card-text">
          {{movieId.title}}
        </p>
      </div>
    </div>
    <div class="container w-50">
      <h1 class="text-center">Book your seat now</h1>
      <form @submit.prevent="createBook">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Cinema</label>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="form.cinema"
          >
            <option selected>---Select Cinema---</option>
            <option value="CGV">CGV</option>
            <option value="XXI">XXI</option>
            <option value="Cinepolis">Cinepolis</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Seat</label>
          <input type="text" class="form-control" v-model="form.seat" />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Price</label>
          <input type="number" class="form-control" value="50.000" disabled />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Date</label>
          <input type="date" class="form-control" v-model="form.date" />
        </div>
        <button type="submit" class="btn btn-warning">Book</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useMovieStore } from '../stores/main';
export default {
  name: "AddBook",
  data() {
    return {
      form: {
        title : "",
        cinema: "",
        seat: "",
        price: 50000,
        date: "",
        status: false
      },
    };
  },
  
  computed : {
    ...mapState(useMovieStore,['movieId'])
  },
  watch :{
    movieId(value){
      if (value.id){
        this.form.title = value.title
      }
    }
  },
  methods : {
    ...mapActions(useMovieStore,['handleCreateBook','fetchMovieById',]),
    createBook(){
        this.handleCreateBook(this.form)
    },
  },
  created(){
      this.fetchMovieById(this.$route.params.id)
  }
};
</script>

<style>
</style>