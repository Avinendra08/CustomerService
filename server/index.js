require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");
const PORT = 6005;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./model/userSchema");

//////////////got from creation in google developer console
const clientid =
  "19133928433-a58gc1t7rv4iqnjg97tnfuta5o2qkq5o.apps.googleusercontent.com";
const clientsecret = "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";

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());

///////////setup session
app.use(
  session({
    secret: "hello1215bachchi0808qwerty",
    resave: false,
    saveUninitialized: true,
  })
);

////////////// setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: clientid,
      clientSecret: clientsecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
        // console.log("profile:",profile);
      try {
        let user = await userdb.findOne({ googleId: profile.id });
         //console.log mein saara data profile k andr dikhega after logging by google
        if (!user) {
          user = new userdb({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

////////////generating encrypted id with the help of session which will give all user data when decoded
passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});


////////////routes ....api endpoints....

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/options",
    failureRedirect:"http://localhost:3000/login"
}))

//...
app.get("/login/success",async(req,res)=>{
    //console.log("reqqq",req.user);
    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})
//logout
app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:3000");
    })
})






app.listen(PORT, () => {
  console.log(`server started at port no ${PORT}`);
});
