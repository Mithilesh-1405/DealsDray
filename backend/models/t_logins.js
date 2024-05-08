const mongoose=require('mongoose')
const Schema = mongoose.Schema

const loginSchema = new Schema({
    username:{type:String},
    password:{type:String}
})

const Login_model = mongoose.model('t_logins',loginSchema)
module.exports = Login_model