const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const login = async (username, password) => {
    try {
        var user = await Users.findOne({
            email: username
        });
        console.log("Found: ", user);
        if (user) {
            return new Promise((resolve, reject) => {
                user.comparePassword(password, (error, isMatch) => {
                    if (isMatch && !error) {
                        var token = jwt.sign(user.toObject(), config.JWT.secret, {
                            expiresIn: config.JWT.expire
                        });
                        user["password"] = "";
                        return resolve({
                            token: token,
                            user: user,
                            success: true
                        });
                    } else {
                        return resolve({
                            message: 'wrong password'
                        });
                    }
                });
            });
        } else {
            return {
                message: "User does not exists!"
            };
        }
    } catch (ex) {
        console.log(ex);
        return ex;
    }
}

const createUser = async (username, password) => {
    try{
        var user = new Users({
            email: username,
            password: password
        });
        await user.save();
        user["password"] = "";
        return {
            success: true,
            user: user
        }
    }catch(ex){
        console.log(ex);
        return ex;
    }
}

module.exports = {
    login,
    createUser,
}