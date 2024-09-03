const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const Joi = require("joi");
const passwordComplexity = require('joi-password-complexity')
const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    verified: {type: Boolean, required: true, default: false},
});

userSchema.methods.generateAuthToken = function(){
    const payload = {
        _id: this._id,
        firstName: "May",
        email: this.email,  // Add any other fields you need
      };
    const token = jwt.sign(payload, process.env.JWTPRIVATEKEY,{
        expiresIn: "1d"
    });

    console.log("Generate payload",token)
    return token;
}

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };
