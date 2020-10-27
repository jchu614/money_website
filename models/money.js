const mongoose = require('mongoose');

const moneySchema = new mongoose.Schema({
	moneyStart: {
		type: Number
	},
	moneyLeft: {
		type: Number
	},
	currency: {
		type: String, 
		default: 'USD'
	}
});

const Money = mongoose.model('Money', moneySchema);

module.exports = Money;