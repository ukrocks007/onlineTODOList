const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: "Email id already registered!",
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (pass, cb) {
    Users.findOne({
            _id: this._id
        })
        .exec()
        .then(data => {
            bcrypt.compare(pass, data.password, function (err, isMatch) {
                if (err) {
                    return cb(err);
                }
                return cb(null, isMatch);
            });
        })
        .catch(error => {
            return cb(error);
        });
};

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;