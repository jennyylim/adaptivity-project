const express = require('express');
const router = express.Router();
const User = require('../model/user');


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
        errors.push({msg: 'Password have to be more than 6 letters.git'})
    }

    if(errors.length > 0){
        res.render('register', {errors, name, email, password})
    }
    else{
        res.send('pass');
    }

})

module.exports = router;