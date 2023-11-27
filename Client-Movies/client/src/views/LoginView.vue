<template>
  <!-- login form here -->

  <div class="loginform">
    <h4 class="text-center">Login Here</h4>
    <div class="section-login">
      <form @submit.prevent="handleLogin">
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
          <span>Don't have an account? </span
          ><a @click.prevent="toRegister" href="">Sign Up</a>
        </div>
        <button type="submit" class="btn btn-primary col-lg-12">Login</button>
      </form>
      <br />
      <br />
    </div>
    <GoogleLogin :callback="callback" prompt />
  </div>

</template>

<script>
import { mapState, mapActions } from "pinia";
import { useMovieStore } from "../stores/main";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState(useMovieStore, ["isLoggedIn"]),
  },
  methods: {
    ...mapActions(useMovieStore, ["login", "toRegister",'handleGoogleLogin']),
    handleLogin() {
      this.login(this.form);
    },
    callback(response) {
      this.handleGoogleLogin(response);
    },
  },
};
</script>

<style>
.loginform {
  background-color: white;
  width: 30%;
  height: auto;
  margin: 7% auto;
  padding: 25px 10px;
  border-radius: 5px;
  box-shadow: 1px;
}
</style>