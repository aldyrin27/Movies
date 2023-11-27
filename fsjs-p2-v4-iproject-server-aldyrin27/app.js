if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const Controller = require('./controllers/controller')
const authentication = require('./middlewares/authentication')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/register', Controller.register)
app.post('/google', Controller.googleLogin)
app.post('/login', Controller.login)
app.get('/movies', Controller.fetchMovie)
app.get('/movies/:id', Controller.fetchMovieById)

app.use(authentication)

app.post('/generate-midtrans', Controller.generateMidtrans)
app.post('/booking', Controller.handleBooking)
app.get('/booking', Controller.handleShowBooking)
app.patch('/booking', Controller.handleStatusBooking)

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})