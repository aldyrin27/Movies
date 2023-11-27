'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User)
    }
  }
  Booking.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "Title is required"},
        notEmpty : {msg : "Title is required"}
      }
    },
    cinema: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "Cinema is required"},
        notEmpty : {msg : "Cinema is required"}
      }
    },
    seat: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "Seat is required"},
        notEmpty : {msg : "Seat is required"}
      }
    },
    date: {
      type : DataTypes.DATE,
      allowNull : false,
      validate : {
        isDate : true,
        notNull : {msg : "Date is required"},
        notEmpty : {msg : "Date is required"},
        isFuture(value){
          if (new Date(value) < new Date()){
            throw new Error("Please choose another date")
          }
        }
      } 
    },
    price: DataTypes.INTEGER,
    status: {
      type : DataTypes.BOOLEAN,
      defaultValue : '0'
    },
    UserId: {
      type : DataTypes.INTEGER,
      references : {
        model : "Users",
        key : "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};