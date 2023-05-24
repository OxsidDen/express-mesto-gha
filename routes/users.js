const userRouter = require('express').Router();
const { getUsers, getUserById, updateProfile, updateAvatar, getMyUser } = require('../controllers/users.js');
const {idValidator, profileValidator, avatarValidator} = require('../middlewares/userValidator')

userRouter.get("/users", getUsers)

userRouter.get("/users/me", getMyUser)

userRouter.get("/users/:userId",idValidator, getUserById)

userRouter.patch("/users/me", profileValidator, updateProfile)

userRouter.patch("/users/me/avatar", avatarValidator, updateAvatar)




module.exports = userRouter;