const passport = require('passport');
const User = require('../auth/User');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
//ID 332719739844-0atuhhqum86ptica2jb17dbj4ag4nimf.apps.googleusercontent.com
//SECRET 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
passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email, password, done){
        User.findOne({email}).then(user =>{
            if(user.password){
                bcrypt.compare(password, user.password, function(err, result){
                    if(err){return done(err)}
                    if(result) {return done(null, user)
                    }else {return done(null, false, { message: 'Incorrect password.' });}
                });
            }else{
                return done('Пользователь не найден')
            }
        }).catch(e =>{
            return done(e)
        })
    }
))

passport.use(new GoogleStrategy({
    clientID:     '332719739844-0atuhhqum86ptica2jb17dbj4ag4nimf.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8000/api/auth/google",
    scope: ['openid', 'email', 'profile']
    // passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const user = await User.find({googleId: profile.id});
    const newUser = await new User({
        googleId: profile.id,
        full_name: profile.displayName,
        email: profile.emails[0].value
    }).save()
    return done(null, newUser);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));

passport.serializeUser(function(user, done){
    done(null, user._id)
})

passport.deserializeUser(function(id, done){
    User.findById(id).then((user, err) =>{
        done(err, user)
    })
})