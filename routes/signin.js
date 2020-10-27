const express = require('express');
const router = express.Router();
const passport = require('passport');
const JWT = require('jsonwebtoken');
const passportConfig = require('../passport');
const db = require('../models/index');

//JWT TOKEN
const signToken = userID => {
	return JWT.sign({
		iss: "Jason",
		sub: userID
	}, "WhyIsThisCodeSoTough");
}

//LIST OF USERS
router.get('/', function(req, res){
	db.User.find()
	.then(function(data){
		res.json(data);
	})
	.catch(function(err){
		res.send(err);
	})
});

//CREATING NEW USERS
router.post('/register', (req, res) => {
	const {username, password} = req.body;
	db.User.findOne({username}, (err,user)=>{
		if(err)
			res.status(500).json({message: {msgBody : "Error has occured!", msgError: true}});
		if(user)
			res.status(400).json({message: {msgBody : "Username is already taken!", msgError: true}});
		else {
			const newUser = new db.User({username, password});
			console.log(newUser)
			newUser.save(err => {
				if(err)
					res.status(500).json({message: {msgBody : "Error has occured!", msgError: true}});
				else
					res.status(201).json({message: {msgBody : "Account created!", msgError: false}});
			});
		}
	});
});

//LOGIN USERS
router.post('/login', passport.authenticate('local', {session: false}), (req, res) =>{ 
	if(req.isAuthenticated()){
		const {_id, username} = req.user;
		const token = signToken(_id);
		res.cookie('access_token', token, {httpOnly: true, sameSite: true});
		res.status(200).json({isAuthenticated: true, user: {username}});
	}
});

//LOGOUT USERS
router.get('/logout', passport.authenticate('jwt', {session: false}), (req, res) =>{ 
	res.clearCookie('access_token');
	res.json({user: {username: ''}, success: true});
});


//PUSHING DATA INTO USERS
router.post('/money', passport.authenticate('jwt', {session: false}), (req, res) =>{ 
	const data = new db.Money(req.body);
	data.save(err => {
		if(err)
			res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
		else {
			req.user.data.push(data);
			req.user.save(err=> {
				if(err)
					res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
				else
					res.status(200).json({message: {msgBody: "Successfully saved!", msgError: false}});
			});
		}
	})
});

//GETTING THE MONEY DATA FROM CURRENT USER
router.get('/money', passport.authenticate('jwt', {session: false}), (req, res) =>{ 
	db.User.findById({_id : req.user._id}).populate('data').exec((err,doc)=> {
		if(err)
			res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
		else {
			res.status(200).json({data: doc.data, authenticated: true});
		}
	});
});


//IS AUTHENTICATED
router.get('/authenticated', passport.authenticate('jwt', {session: false}), (req, res) =>{ 
	const {username, data} = req.user;
	res.status(200).json({isAuthenticated : true, user: {username, data}});
});

//DELETE USERS
router.delete('/:id', function(req, res){
	db.User.remove({_id: req.params.id})
	.then(function(){
		res.json({message: 'Deleted!'})
	})
	.catch(function(err){
		res.send(err);
	})
});

module.exports = router;