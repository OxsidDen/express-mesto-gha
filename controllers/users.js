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
const { trusted } = require('mongoose');
const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req,res) => {
    User.find()
        .then(users => res.status(OK_STATUS_CODE).send({data: users}))
        .catch(e => res.status(DEFAULT_ERROR_CODE).send(default_error_message))
}

const getUserById = (req,res) => {
    const { userId } = req.params;
    User.findById(userId)
        .then((user) => {
            if(!user){
                return res.status(NOT_FOUND_ERROR_CODE).send({message: "User by specified _id not found"});
            }
            return res.status(OK_STATUS_CODE).send({data: user})
        })
        .catch((e) => {
            if(e.name == "CastError"){
                return res.status(INCORRECT_DATA_ERROR_CODE).send({message: "User by specified _id not found"});
            }
            res.status(DEFAULT_ERROR_CODE).send(default_error_message)
        })
}

const createUser = (req,res) => {
    const {name, about, avatar, email, password} = req.body;
    bcrypt.hash(password,10)
        .then(hash => User.create({name, about, avatar, email, password: hash}))
        .then(user => res.status(OK_STATUS_CODE).send({data: user}))
        .catch((e) => {
            if(e.name == "ValidationError"){
                return res.status(INCORRECT_DATA_ERROR_CODE).send({message: "Incorrect data was passed during user creation"});
            }
            res.status(DEFAULT_ERROR_CODE).send(default_error_message);
        })
        .catch((err) => res.status(400).send(err));
            
}

const updateProfile = (req,res) => {
    const {name, about} = req.body;
    User.findByIdAndUpdate(req.user._id, {name,about},{new:true, runValidators: true})
        .then(user => res.status(OK_STATUS_CODE).send({data: user}))
        .catch((e) => {
            if(e.name == "CastError"){
                return res.status(NOT_FOUND_ERROR_CODE).send({message: "User by specified _id not found"});
            }
            if(e.name == "ValidationError"){
                return res.status(INCORRECT_DATA_ERROR_CODE).send({message: "Incorrect data was sent when updating the profile"});
            }
            res.status(DEFAULT_ERROR_CODE).send(default_error_message);
        })
}

const updateAvatar = (req,res) => {
    const {avatar} = req.body;
    User.findByIdAndUpdate(req.user._id, {avatar},{new: true, runValidators: true})
        .then(avatar => res.status(OK_STATUS_CODE).send({data: avatar}))
        .catch((e) => {
            if(e.name == "CastError"){
                return res.status(NOT_FOUND_ERROR_CODE).send({message: "User by specified _id not found"});
            }
            if(e.name == "ValidationError"){
                return res.status(INCORRECT_DATA_ERROR_CODE).send({message: "Incorrect data was sent when updating the avatar"});
            }
            res.status(DEFAULT_ERROR_CODE).send(default_error_message);
        })
}
const login = async (req,res) => { 
    if(!req.body){
       return res.status(DEFAULT_ERROR_CODE).send(default_error_message);
    }
    const {email, password} = req.body;
    
    if(!email || !password){
        return res.status(DEFAULT_ERROR_CODE).send(default_error_message);
    }
    try{
        const  user = await User.findOne({email}).select('+password')
        
        if(!user){
           return res.status(DEFAULT_ERROR_CODE).send({message:"Incorrect email or password"});
        }
        const result =  bcrypt.compare(password, user.password);
        if(!result){
            return res.status(DEFAULT_ERROR_CODE).send({message:"Incorrect email or password"});
        }
        const token = jwt.sign({ _id: user._id },  NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret' , { expiresIn: "7d" }); 
        res.cookie('jwt', token, {maxAge: 3600000 * 24 * 7, httpOnly: true }); 
        res.status(OK_STATUS_CODE).send({_id: token})
    }
    catch(e){
        res.status(DEFAULT_ERROR_CODE).send({message: "no ok"});
    }

}

const getMyUser = async (req, res) => {
    const ownerId = req.user._id;
    if(!ownerId){
        return res.status(NOT_FOUND_ERROR_CODE).send({message: "User by specified _id not found"});
    }
    try {
        const owner = await User.findById(ownerId);
        res.status(OK_STATUS_CODE).send({owner})
    } catch (error) {
        return res.status(NOT_FOUND_ERROR_CODE).send({message: "User not found"});
    }
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