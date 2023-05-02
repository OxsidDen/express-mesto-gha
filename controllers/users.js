const User = require('../models/user')
const {
    INCORRECT_DATA_ERROR_CODE,
    NOT_FOUND_ERROR_CODE,
    DEFAULT_ERROR_CODE,
    OK_STATUS_CODE,
    default_error_message
} = require ('../utils/utils')

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
    const {name, about, avatar } = req.body;
    User.create({name, about, avatar})
        .then(user => res.status(OK_STATUS_CODE).send({data: user}))
        .catch((e) => {
            if(e.name == "ValidationError"){
                return res.status(INCORRECT_DATA_ERROR_CODE).send({message: "Incorrect data was passed during user creation"});
            }
            res.status(DEFAULT_ERROR_CODE).send(default_error_message);
        })
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

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateProfile,
    updateAvatar
}