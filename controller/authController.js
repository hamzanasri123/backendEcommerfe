const jwt = require('jsonwebtoken')
const User = require('../models/User')
const emailService  = require ('../emailService')
const SECRET_KEY = "mysecretkey"


exports.signUp = async (req, res) => {

    try {
        const user = new User(req.body)
        await user.save()
        emailService.sendActivationEmail(user.email, user.activationToken);
        res.status(201).json({ message: "Utilisateur creé" })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

exports.signIn = async(req,res)=>{
    try{
       const user = User.findOne({username  : req.body.username} );
            console.log(user);
            if(!user) return res.status(401).json({error:"Wrong username or password"})
            // compare passwords
            user.compa(req.body.password,(err,isMatch)=>{
                if (!isMatch) return res.status(401).json({error : 'Wrong username or password '})
                const token  = jwt.sign({userId:user._id},SECRET_KEY ,{expiresIn : "1h"})
                res.json({token,user})
            })  
    }catch(error){
        res.status(400).json({ error: error.message })
        
    }
}