const express = require('express');
const router = express.Router();
const db = require("../models/index");


router.get('/', function(req, res){
	db.Money.find()
	.then(function(data){
		res.json(data);
	})
	.catch(function(err){
		res.send(err);
	})
});

router.post('/', function(req, res){
	db.Money.create(req.body)
	.then(function(newAmount){
	res.json(newAmount);
	})
	.catch(function(err){
		res.send(err);
	})
});

router.get('/:moneyId', function(req, res){
	db.Money.findById(req.params.moneyId)
	.then(function(foundData){
		res.json(foundData);
	})
	.catch(function(err){
		res.send(err);
	});
})

router.put('/:moneyId', function(req, res){
	db.Money.findOneAndUpdate({_id: req.params.moneyId}, req.body, {new: true})
	.then(function(data){
		res.json(data);
	})
	.catch(function(err){
		res.send(err);
	})
});

router.delete('/:moneyId', function(req, res){
	db.Money.remove({_id: req.params.moneyId})
	.then(function(){
		res.json({message: 'Deleted!'})
	})
	.catch(function(err){
		res.send(err);
	})
});

module.exports = router;