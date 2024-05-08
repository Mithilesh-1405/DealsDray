const mongoose = require('mongoose')
const Schema = mongoose.Schema


const employeeSchema = new Schema({
    name: String,
    email: String,
    mobileNumber: String,
    designation: String,
    gender: String,
    course: [String],
    // imageData: {
    //     data: Buffer,
    //     contentType: String
    // },
    createDate: String

})

const Employees = mongoose.model('Employees', employeeSchema)
module.exports = Employees