const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	data: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Money'
	}],
	isDeleted: {
		type: Boolean,
		default: false
	}
});

//Middleware to see if password is encrypted
userSchema.pre('save', function(next){
	if(!this.isModified('password'))
		return next();
	bcrypt.hash(this.password, 10, (err, passwordHash) => {
		if(err)
			return next(err);
		this.password = passwordHash;
		next();
	})
});

userSchema.methods.comparePassword = function(password, cb) {
	bcrypt.compare(password, this.password, (err, isMatch) => {
		if(err)
			return cb(err);
		else {
			if(!isMatch)
				return cb(null, isMatch);
			return cb(null, this);
		}
	});
}

const User = mongoose.model('User', userSchema);

module.exports = User;