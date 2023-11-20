const mongoose = require('mongoose')
const { stringify } = require('querystring')
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username : {type : String  , unique: true,require : true},
    password :{ type :String , required :true },
    email:{type : String ,unique : true ,required : true},
    role :  { type: String, enum: ['user', 'admin'], default: 'user' },
    name : {type : String , require : true},
    isActive: { type: Boolean, default: false },
    activationToken: { type: String }
})

userSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    bcrypt.hash(user.password,10 , (err,hash)=>{
        if(err) return next(err);
        user.password = hash
        next()
    })
})

userSchema.methods.comparePassword = function(condidatePassword , callback){
    bcrypt.compare(condidatePassword,this.password,(err,isMatch)=>{
        if (err) return callback(err)
        callback(null,isMatch)
    })
}
module.exports= mongoose.model("User",userSchema)