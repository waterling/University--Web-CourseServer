const express = require('express');
const Users = require('../utils/Users');
const bodyParser = require('body-parser');
const config = require("nconf");
const passport = require('passport');
const AuthLocalStrategy = require('passport-local').Strategy;
const AuthFacebookStrategy = require('passport-facebook').Strategy;
const AuthVKStrategy = require('passport-vkontakte').Strategy;

let router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
//for fun:)
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


passport.use('local', new AuthLocalStrategy(
    function (username, password, done) {
        if (username === "admin" && password === "admin") {
            return done(null, {
                username: "admin",
                photoUrl: "url_to_avatar",
                profileUrl: "url_to_profile"
            });
        }

        return done(null, false, {
            message: 'Неверный логин или пароль'
        });
    }
));

passport.use('facebook', new AuthFacebookStrategy({
        clientID: config.get("auth:fb:app_id"),
        clientSecret: config.get("auth:fb:secret"),
        callbackURL: config.get("app:url") + "/auth/fb/callback",
        profileFields: [
            'id',
            'displayName',
            'profileUrl',
            "username",
            "link",
            "gender",
            "photos"
        ]
    },
    function (accessToken, refreshToken, profile, done) {

        //console.log("facebook auth: ", profile);

        return done(null, {
            username: profile.displayName,
            photoUrl: profile.photos[0].value,
            profileUrl: profile.profileUrl
        });
    }
));

passport.use('vk', new AuthVKStrategy({
        clientID: config.get("auth:vk:app_id"),
        clientSecret: config.get("auth:vk:secret"),
        callbackURL: config.get("app:url") + "/auth/vk/callback"
    },
    function (accessToken, refreshToken, profile, done) {

        //console.log("facebook auth: ", profile);

        return done(null, {
            username: profile.displayName,
            photoUrl: profile.photos[0].value,
            profileUrl: profile.profileUrl
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, JSON.stringify(user));
});


passport.deserializeUser(function (data, done) {
    try {
        done(null, JSON.parse(data));
    } catch (e) {
        done(err)
    }
});

module.exports = function (app) {
    const passport = require('passport');

    module.exports = function (app) {

        app.get('/auth', function (req, res) {

            if (req.isAuthenticated()) {
                res.redirect('/');
                return;
            }

            res.render('auth', {
                error: req.flash('error')
            });
        });

        app.get('/sign-out', function (req, res) {
            req.logout();
            res.redirect('/');
        });

        app.post('/auth', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth',
            failureFlash: true })
        );

        app.get('/auth/fb',
            passport.authenticate('facebook', {
                scope: 'read_stream'
            })
        );

        app.get('/auth/fb/callback',
            passport.authenticate('facebook', {
                successRedirect: '/',
                failureRedirect: '/auth' })
        );

        app.get('/auth/vk',
            passport.authenticate('vk', {
                scope: ['friends']
            }),
            function (req, res) {
                // The request will be redirected to vk.com
                // for authentication, so
                // this function will not be called.
            });

        app.get('/auth/vk/callback',
            passport.authenticate('vk', {
                failureRedirect: '/auth'
            }),
            function (req, res) {
                // Successful authentication
                //, redirect home.
                res.redirect('/');
            });
    }
};