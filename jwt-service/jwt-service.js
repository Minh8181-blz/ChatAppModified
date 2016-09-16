var jwt = require('jsonwebtoken');
var config = require('../config');
var JWT_KEY = config.JWT_KEY;

var jwtservice = {};

jwtservice.generateJWT = function(user){
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate()+60);

	//1st argument will be accessed in req.payload
	return jwt.sign({
		id: user.id,
		username:user.name,
		useremail:user.email,
		exp: parseInt(exp.getTime()/1000)
	},JWT_KEY);
};

jwtservice.getPayload = function(tokenString, callback){
	var token = tokenString.substr("Bearer ".length);

	jwt.verify(token, JWT_KEY, function(err, decoded){
		if(err){
			callback(false);
		}
		else{
			callback(decoded);
		}
	})
}

module.exports = jwtservice;