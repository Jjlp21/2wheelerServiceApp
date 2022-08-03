const mongoose = require('mongoose')
// const validator = require('validator')

// var bookingSchema = new mongoose.Schema(
//     {   
//         // addedBy:{type: mongoose.Schema.ObjectId,ref:'users', required:false},
//         mobile:{type:Number,required:true,min:[1000000000,"enter 10 digit mobile number"],max:[9999999999,"enter 10 digit mobilr number"]},
//         bikeManufacturer:{type:String},
//         plateNumber:{type:String},
//         serviceDate:{type:Date},
//         zipCode:{type:Number,min:[100000,"enter 10 digit mobile number"],max:[999999,"enter 6 digit pin-code"]},
//         fullAddress:{type:String},
//         bookedAt:{type:Date,defualt:Date.now},

        
//     }
// )
// const bookingDetails = mongoose.model('bookings',bookingSchema)

var userSchema = new mongoose.Schema(
    {
        name:{type:String,default:"user"},
        email:{type:String,required:true,lowercase:true,},
        password:{type:String,default:"****"},
        // booking:[bookingSchema]

    }
)
const userDetails = mongoose.model('users',userSchema)

module.exports={userDetails}