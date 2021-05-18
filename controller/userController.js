const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require ('bcryptjs');


router.get('/login', (req,res) => res.render('login'));

router.get('/register', (req,res) => res.render('register'));

//register handle
router.post('/register', (req,res)=>{
    const {name, email, password} = req.body;
    let errors =[];
    //check required fields
    if(!name || !email || !password){
        errors.push({msg: 'Please fill in all fields'});
    }

    //check pass length
    if(password.length < 6){
        errors.push({msg: 'Password have to be more than 6 letters'})
    }

    if(errors.length > 0){
        res.render('register', {errors, name, email, password})
    }
    else{
        User.findOne({email:email})
            .then(user =>{
                if(user){
                    //user exist
                    errors.push({msg: 'Already registered.'})
                    res.render('register', {errors, name, email, password})
                }
                else{
                    const newUser = new User({
                        name,
                        email,
                        password
                    })
                    //hash password
                    bcrypt.genSalt(10,(err, salt)=>
                        bcrypt.hash(newUser.password, salt, (err,hash)=>{
                            if(err){
                                throw err;
                            }
                            //set password to hash
                            newUser.password = hash;
                            newUser.save()
                                .then(user =>{
                                    req.flash('success_msg', 'You are registered and can log in.');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err))
                        }))
                }
            });

    }

})

module.exports = router;