<template>
   <div class="registerform">
    <h4 class="text-center">Register Here</h4>

    <div class="section-login">
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter Email"
            v-model="form.email"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter Password"
            v-model="form.password"
          />
        </div>
        <div class="mb-3">
          <span>Already have an account? </span><a @click.prevent="toLogin" href="">Sign In</a>
        </div>
        <button type="submit" class="btn btn-primary col-lg-12">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>

import {mapState, mapActions} from 'pinia'
import {useMovieStore} from '../stores/main'

export default {
    name : "Register",
    data(){
        return {
            form : {
                email : "",
                password : ""
            }
        }
    },
    methods : {
        ...mapActions(useMovieStore,['register','toLogin']),
        handleRegister(){
            this.register(this.form)
        }
    }
}
</script>

<style>


.registerform {
  background-color: white;
  width: 30%;
  height: auto;
  margin: 7% auto;
  padding: 25px 10px;
  border-radius: 5px;
}
</style>