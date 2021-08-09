const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys')

const User = mongoose.model('users');

passport.serializeUser((user, done) =>{
    console.log("user id created for cookie " +user.id);
    done(null, user.id);
});

passport.deserializeUser((ClientId, done)=>{
    //pull out the user from mongoDb
    console.log('deserialize user id  '+ClientId);
    User.findById(ClientId)
    .then(user => {
        if( user ){
            console.log('found the user id '+ user);
        }else{
            console.log('did not find the user id '+ user);
        }

        done(null, user);
    })
});


passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    },
    (accessToeken, refreshToken, profile, done) => {
        User.findOne({googleId:profile.id})
            .then((existingUser)=>{
                if( existingUser){
                    console.log("user already exists");
                    //we already have the record for this profile id
                    done(null, existingUser);
                }else{
                    //we dont have the user with this id, create new
                    console.log("adding new user now");
                    new User({googleId: profile.id})
                        .save()
                        .then(user => done(null, user))
                }
            })            
    }
  )
);
