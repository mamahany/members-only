const {generatePassword} = require('../utils/password');
const User = require('../models/user');
const passport = require('passport');
const {body, validationResult} = require('express-validator');


const validateUser = [
  body('firstName').trim().notEmpty().withMessage('First name is required').bail()
  .isAlpha().withMessage('First name must only contain letters')
  .isLength({min:1, max:100}).withMessage('First name must be between 1 and 100 characters'),
  
  body('lastName').trim().optional({checkFalsy:true}).bail()
  .isAlpha().withMessage('Last name must only contain letters')
  .isLength({min:1, max:100}).withMessage('Last name must be between 1 and 100 characters'),

  body('email').trim().notEmpty().withMessage('email is required').bail()
  .custom(async (value) => {
    const user = await User.getUserByEmail(value);
    if (user) {
      return Promise.reject(); 
    }
    return true;
  })
  .withMessage("Email is already registered")
  .isEmail().withMessage("Enter a valid email address e.g john@gmail.com")
  .isLength({min:1, max:100}).withMessage('Email must be between 1 and 100 characters'),

  body('password').trim().notEmpty().withMessage('Password is required').bail()
  .isLength({min:6}).withMessage("Password must be at least 6 characters long"),
  
  body("confirmPassword")
  .custom((value, { req }) => value === req.body.password)
  .withMessage("Passwords do not match")
]


const signUpGet = (req, res)=>{
    res.render('form/signUpForm');
}

const signUpPost = [
  validateUser,
  async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      res.render('form/signUpForm', {errors:errors.array()})
    }
    try{
        const {firstName, lastName, email, password} = req.body;
        const hashed = await generatePassword(password);
        await User.addUser(firstName, lastName, email, hashed);
        res.redirect('/auth/login');
    }catch(error){
        console.log(error);
    }
}
]

const loginGet = async (req,res)=>{
    res.render('form/loginForm');
}

const loginPost = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.render("form/loginForm", { errors:[{msg:info?.message || "Invalid credentials"}] });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      console.log(req.user)
      return res.redirect("/");
    });
  })(req, res, next);
};

const logout = async (req, res, next)=>{
  req.logout((error)=>{
    if(error) return next(error);
    res.redirect('/');
  });
}

const joinCommunityGet = async (req, res)=>{
  res.render('form/joinCommunityForm');
}

const joinCommunityPost = async (req,res)=>{
  const {secret} = req.body;
  if(secret === process.env.COMMUNITY_SECRET){
    await User.addUserToCommunity(req.user.id);
    res.redirect('/');
  }else{
    return res.render("form/joinCommunityForm", { error: "Wrong secret" });
  }
}

const addAdminGet = async (req, res)=>{
  res.render('form/becomeAdminForm');
}

const addAdminPost = async (req,res)=>{
  const {secret} = req.body;
  if(secret === process.env.ADMIN_SECRET){
    await User.addAdmin(req.user.id);
    res.redirect('/');
  }else{
    return res.render("form/becomeAdminForm", { error: "Wrong secret" });
  }
}


module.exports = {
    signUpGet,
    signUpPost,
    loginGet,
    loginPost,
    logout,
    joinCommunityGet,
    joinCommunityPost,
    addAdminGet,
    addAdminPost
}