const mongoose = require('mongoose');
const validation = require('validator')
const bcrypt = require('bcrypt');
const {regex} = require('../utils/utils')
const userSchema = new mongoose.Schema({
    name:{
        type: String, 
        minlength: 2, 
        maxlength: 30, 
        default: "Жак-Ив Кусто"
    },
    about:{
        type: String, 
        minlength: 2, 
        maxlength: 30, 
        default: "Исследователь",
    },
    avatar:{
        type: String,
        default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
        validate:{
            validator: function(avatar){
                regex.test(avatar);
            },
            message: 'Link is not a valid'
        }
    },
    email:{
        type: String,
        unique: true,
        require: [true, 'User email required'],
        validate: {
            validator: function(email){
                validation.isEmail(email);
            },
            message:'Email is not a valid'
        }
    },
    password:{
        type: String,
        require: [true, 'User password required'],
        select: false
    }
});
userSchema.statics.findUserByCredentials = function (email, password) {
    return this.findOne({ email }).select('+password')
        .then((user) => {
            if (!user) {
                return Promise.reject(new Error('Неправильные почта или пароль'));
            }
            return bcrypt.compare(password, user.password)
                .then((matched) => {
                if (!matched) {
                    return Promise.reject(new Error('Неправильные почта или пароль'));
                }
                return user;
                });
        });
};


module.exports = mongoose.model('users', userSchema); 
