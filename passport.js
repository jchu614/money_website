const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/user');

const cookieExtractor = req => {
	let token = null;
	if(req && req.cookies){
		token = req.cookies["access_token"];
	}
	return token;
}


//AUTHORIZATION 
passport.use(new JwtStrategy({
	jwtFromRequest : cookieExtractor, 
	secretOrKey : "WhyIsThisCodeSoTough"
}, (payload, done) => {
	User.findById({_id: payload.sub}, (err, user) => {
		//Database Error
		if(err)
			return done(err, false);
		//User exists
		if(user) 
			return done(null, user);
		//User doesn't exist
		else
			return done(null, false);
	});
}));

//AUTHENTICATION LOCAL STRATEGY USING USERNAME AND PASSWORD
passport.use(new LocalStrategy((username, password, done) => {
	User.findOne({username},(err,user) => {
		//Database Error
		if(err)
			return done(err);
		//Database done, but no user exists
		if(!user)
			return done(null, false);
		//Check if password is correct
		user.comparePassword(password, done);
	});
}));