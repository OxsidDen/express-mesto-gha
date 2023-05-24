const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    INCORRECT_DATA_ERROR_CODE,
    NOT_FOUND_ERROR_CODE,
    DEFAULT_ERROR_CODE,
    OK_STATUS_CODE,
    default_error_message
} = require ('../utils/utils');
const { NotFoundError , IncorrectDataError} = require('../error/error');
const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req,res, next) => {
    User.find()
        .then(users => res.status(OK_STATUS_CODE).send({data: users}))
        .catch(next)
}

const getUserById = (req,res, next) => {
    const { userId } = req.params;
    User.findById(userId)
        .then((user) => {
            if(!user){
                throw new NotFoundError("User by specified _id not found")
            }
            return res.status(OK_STATUS_CODE).send({data: user})
        })
        .catch(next)
}

const createUser = (req,res, next) => {
    const {name, about, avatar, email, password} = req.body;
    bcrypt.hash(password,10)
        .then(hash => User.create({name, about, avatar, email, password: hash}))
        .then(user => res.status(OK_STATUS_CODE).send({data: user}))
        .catch(next);
}

const updateProfile = (req,res, next) => {
    const {name, about} = req.body;
    User.findByIdAndUpdate(req.user._id, {name,about},{new:true, runValidators: true})
        .then(user => res.status(OK_STATUS_CODE).send({data: user}))
        .catch(next)
}

const updateAvatar = (req,res, next) => {
    const {avatar} = req.body;
    User.findByIdAndUpdate(req.user._id, {avatar},{new: true, runValidators: true})
        .then(avatar => res.status(OK_STATUS_CODE).send({data: avatar}))
        .catch(next)
}
const login = (req,res, next) => { 
    const {email, password} = req.body;
    User.findUserByCredentials(email, password)
        .then((user) => {
            if(!user){
                throw new NotFoundError('User is not found');
            }
            const token = jwt.sign({ _id: user._id },  NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret' , { expiresIn: "7d" });
            res.cookie('jwt', token, {maxAge: 3600000 * 24 * 7, httpOnly: true }); 
            res.status(OK_STATUS_CODE).send({_id: token})
        })
        .catch(next)
}

const getMyUser =  (req, res, next) => {
    const ownerId = req.user._id;
    if(!ownerId){
        throw new  NotFoundError('User is not found');
    }
    User.findById(ownerId)
        .then((user)=> {
            res.status(OK_STATUS_CODE).send({user})
        })
        .catch(next)
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateProfile,
    updateAvatar,
    login,
    getMyUser
}