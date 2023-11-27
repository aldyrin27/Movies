import { defineStore } from 'pinia'
import Axios from 'axios'
import Swal from 'sweetalert2'

const baseUrl = 'http://localhost:3000'
export const useMovieStore = defineStore('movie',  {
  
  state(){
    return {
      isLoggedIn: false,
      access_token: localStorage.access_token,
      movie : [],
      movieId : {},
      booked : []
    }
  },
  actions : {

    async login(form){
      try {
        const {data} = await Axios({
          method : "POST",
          url : baseUrl + "/login",
          data : form
        })
        localStorage.setItem("access_token", data.access_token)
        this.access_token = data.access_token

        this.isLoggedIn = true
        Swal.fire("Login Success");
        this.$router.push("/")
      } catch (error) {
        Swal.fire(error.response.data.message)
      }
  },

  async register(form) {
    try {
      
      await Axios.post(baseUrl + "/register", form)
      Swal.fire("Register Success");
      this.$router.push('/login')
    } catch (error) {
      Swal.fire(error.response.data.message)
    }
  },

  async handleGoogleLogin(response){
    console.log(response)
    try {

      const { data } = await Axios.post(baseUrl + "/google", {}, {
        headers : {
          google_token : response.credential
        }
      })

      const access_token = data.access_token;
        localStorage.setItem("access_token", access_token);
        this.access_token = access_token
        this.isLoggedIn = true
        this.$router.push('/')
        Swal.fire("Success Google Login");
    } catch (error) {
      Swal.fire(error.response.data.message);
      // console.log(error)
    }
  },

  async fetchMovie(page = 1, year){
    try {
      if (year){
        const {data} = await Axios({
          method : "GET",
          url : baseUrl + "/movies?year=" + year,
        })
        this.movie = data
        // console.log(data)
      } else {
        const {data} = await Axios({
          method : "GET",
          url : baseUrl + "/movies?page=" + page,
        })
        this.movie = data
      }
      // console.log(data)
    } catch (error) {
      Swal.fire(error.response.data.message)
    }
  },

  async fetchMovieById(id){
    try {
      console.log(id)
      const { data } = await Axios({
        method: "GET",
        url: baseUrl + "/movies/" + id,
      })
      console.log(data)
      this.movieId = data
    } catch (error) {
      console.log(error)
      Swal.fire(error.response.data.message)
    }
  },

  async handleCreateBook(form){
    try {
      console.log(form)
      const {data} = await Axios({
        method : "POST",
        url : baseUrl + "/booking",
        data : form,
        headers: {
          access_token: localStorage.access_token
        }
      })
      console.log(data)
      Swal.fire("Booking Success");
      this.$router.push("/book")
    } catch (error) {
      console.log(error)
      Swal.fire(error.response.data.message)
    }
  },

  async fetchBook(){
    try {
      const {data} = await Axios({
        method : "GET",
        url : baseUrl + "/booking",
        headers: {
          access_token: localStorage.access_token
        }
      })
      console.log(data)
      this.booked = data
    } catch (error) {
      console.log(error)
      Swal.fire(error.response.data.message)
    }
  },
  
  async updatePayment(id){
    try {

        const { data } = await Axios({
          method: "POST",
          url : baseUrl + "/generate-midtrans",
          data : {id},
          headers: {
            access_token: localStorage.access_token
          }
        })

        console.log(data)

           window.snap.pay(data.token, {
           onSuccess: function(result){
            Axios({
              method : "PATCH",
              url : baseUrl + "/booking",
              data : {id},
              headers: {
                access_token: localStorage.access_token
              }
            })
            window.location.reload()
           }
      })
    } catch (error) {
      Swal.fire(error.response.data.message)
    }
  },

  toLogin() {
    this.$router.push('/login')
  },

  toRegister(){
    this.$router.push('/register')
  },

  toHome(){
    this.$router.push('/')
  },

  logout() {
    localStorage.clear()
    this.access_token = null
    this.isLoggedIn = false
    this.$router.push('/login')
  },

  toAddMovie(id){
    // this.fetchMovieById(id)
    this.$router.push(`/add/${id}`)
  },

  toBookList(){
    this.$router.push('/book')
  }

  },
  getters : {

  }

})
