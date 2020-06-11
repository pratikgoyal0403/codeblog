const bcrypt = require('bcrypt');

const User = require('../model/users');



exports.getLoginPage = (req, res, next)=>{
    let msg = req.flash('error');
    if(msg.length > 0){
        msg = msg[0];
    }else{
        msg = null;
    }
    console.log(msg);
    res.render('auth/login', {pageTitle: 'login', path: '/login', msg: msg});
}

exports.postLoginPage = (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email}).then(user=>{
        if(!user){
            req.flash('error', 'user not found');
            return res.redirect('/login');
        }
        bcrypt.compare(password, user.password).then(result=>{
            if(!result){
                req.flash('error', 'password is incorrect');
                return res.redirect('/login');
            }
            req.session.isAuthenticated = true;
            req.session.user = user;
            res.redirect('/');
        });
    })
}

exports.getSignupPage = (req, res, next)=>{
    let msg = req.flash('error');
    if(msg.length > 0){
        msg = msg[0];
    }else{
        msg = null;
    }
    res.render('auth/signup', {pageTitle: 'signup', path: '/signup', msg: msg});
}

exports.postSignupPage = (req, res, next)=>{
    const username =  req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    // const confirmPassword = req.body.confirmpassword;
    User.findOne({email: email}).then(resultUser=>{
        if(resultUser){
            req.flash('error', 'email already exists please pick a different one');
            return res.redirect('/signup');
        
        }
        bcrypt.hash(password, 12).then(hashedPassword=>{
            const user = new User({
                username: username,
                email: email, 
                password: hashedPassword
            })
        return user.save().then(result=>{
            res.redirect('/login');
        })
        })

    })
}

exports.getLogoutPage = (req, res, next)=>{
    req.session.destroy((err)=>{
        res.redirect('/');
    })
    
}