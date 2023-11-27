if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { User, Booking } = require('../models')
const axios = require('axios')
const midtransClient = require('midtrans-client');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

class Controller {

    static async register(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.create({ email, password })

            res.status(201).json({ id: user.id, email: user.email })
        } catch (error) {
            // console.log(error)
           if (error.name === 'SequelizeValidationError'){
            res.status(400).json({message : error.errors[0].message})
           } else if (error.name === 'SequelizeUniqueConstraintError'){
            res.status(400).json({message : error.errors[0].message})
           } else {
            res.status(500).json({message : "Internal server error"})
           }
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body

            if (!email) {
                throw { name: "NoEmail" }
            }

            if (!password) {
                throw { name: "NoPassword" }
            }

            const user = await User.findOne({
                where: { email }
            })

            if (!user || !comparePassword(password, user.password)) {
                throw { name: "Invalid" }
            }

            const token = signToken({ id: user.id })

            res.status(200).json({ access_token: token })
        } catch (error) {
            console.log(error)
            if (error.name === 'NoEmail') {
                res.status(400).json({ message: "Email is required" })
            } else if (error.name === 'NoPassword') {
                res.status(400).json({ message: "Password is required" })
            } else if (error.name === 'Invalid') {
                res.status(401).json({ message: "Invalid email/password" })
            } else {
                res.status(500).json({ message: "Internal server error" })
            }
        }
    }

    static async handleBooking(req, res) {
        try {
            const { title, cinema, seat, date, price } = req.body
            const booking = await Booking.create({ title, cinema, seat, date, price, UserId: req.user.id })
            res.status(201).json(booking)
        } catch (error) {
            // console.log(error)
            if (error.name === 'SequelizeValidationError'){
                res.status(400).json({message : error.errors[0].message})
               } else if (error.name === 'SequelizeUniqueConstraintError'){
                res.status(400).json({message : error.errors[0].message})
               } else {
                res.status(500).json({message : "Internal server error"})
               }
        }
    }

    static async handleShowBooking(req, res) {
        try {
            const booking = await Booking.findAll({
                where: {
                    UserId: req.user.id
                },
                include: ["User"],
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })
            if (!booking) {
                throw { name: "noBooking" }
            }
            res.status(200).json(booking)
        } catch (error) {
            console.log(error)
            if (error.name === 'noBooking') {
                res.status(404).json({ message: "Booking not found" })
            } else {
                res.status(500).json({ message: "Internal server error" })
            }
        }
    }

    static async handleStatusBooking(req,res){
        try {
            await Booking.update(
                {status : true},
           { 
            where : { id : req.body.id }}
            )
            res.status(200).json({message : "Success make a payment"})
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal server error" })
        }
    }

    static async fetchMovie(req, res) {
        const { page = 1, year = 2023} = req.query
        const limit = 8
        const options = {
            method: 'GET',
            url: 'https://moviesdatabase.p.rapidapi.com/titles/x/upcoming',
            params: {
                limit: limit,
                page: page,
                year: year
              },
            headers: {
                'X-RapidAPI-Key': '5faf68ba11mshd794f7226721935p17f89bjsnc294cc8ff351',
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            let movie = response.data.results.map(el => {
                return {
                    id: el.id,
                    title: el.titleText.text,
                    image: el.primaryImage ? el.primaryImage.url : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png",
                    releaseYear: el.releaseYear.year
                }
            })
            res.status(200).json(movie)
              console.log(movie);
            //   console.log(response.data.results);
        } catch (error) {
            console.error(error);
        }
    }

    static async fetchMovieById(req, res) {
        const { id } = req.params
        const options = {
            method: 'GET',
            url: `https://moviesdatabase.p.rapidapi.com/titles/${id}`,
            headers: {
                'X-RapidAPI-Key': '5faf68ba11mshd794f7226721935p17f89bjsnc294cc8ff351',
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            res.status(200).json({
                id: response.data.results.id,
                title: response.data.results.titleText.text,
                image: response.data.results.primaryImage ? response.data.results.primaryImage.url : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png",
                releaseYear: response.data.results.releaseYear.year
            })
            // console.log(movie);
        } catch (error) {
            console.error(error);
        }
    }

    static async generateMidtrans(req,res){
        try {
            console.log(req.body)
            const booking = await Booking.findByPk(req.body.id)

            if (booking.status){
                throw {name : "hasPaid"}
            }

            let snap = new midtransClient.Snap({
                
                isProduction : false,
                serverKey : 'SB-Mid-server-kqwdHPwZ_n1muU1iZ5Y9wF4h'
            });

            let parameter = {
                "transaction_details": {
                    "order_id": "YOUR-BOOKED-" + Math.floor(100000 + Math.random() * 100000),
                    "gross_amount": 50000
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    "email": req.user.email,
                }
            };

            const midtransToken = await snap.createTransaction(parameter)
            // console.log(midtransToken, "<><><>")
     
            res.status(201).json(midtransToken)
        } catch (error) {
            if (error.name === 'hasPaid'){
                res.status(400).json({message : "Already Paid"})
            } else {
                res.status(500).json({message : "Internal server error"})
            }
            // console.log(error)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.google_token,
                audience: process.env.G_CLIENT,
            });
            const payload = ticket.getPayload();
            let user = await User.findOne({
                where: { email: payload.email }
            })

            if (!user) {
                user = await User.create({
                    email: payload.email,
                    password: "wadidaw",
                }, { hooks: false }
                )
            }
            let access_token = signToken({
                id: user.id
            })
            console.log(access_token)
            res.status(200).json({ access_token })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

}

module.exports = Controller