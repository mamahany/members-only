const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./pool');
const { validatePassword } = require('../utils/password');

const verifyCallback = async function(email, password, done){
    try{
        const {rows} = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        const user = rows[0]
        if(!user) return done(null, false, { message: "No user with that email" });
    
        const isValid = await validatePassword(password, user.password);
    
        if(isValid){
            return done(null, user);
        }else{
            return done(null, false, { message: "Incorrect password" });
        }
    }catch(err){
        return done(err);
    }
}

const strategy = new LocalStrategy({ usernameField: 'email' }, verifyCallback);

passport.use(strategy);


passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      const user = rows[0];
  
      done(null, user);
    } catch(err) {
      done(err);
    }
  });