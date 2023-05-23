const userRouter = require('express').Router();
const { getUsers, getUserById, updateProfile, updateAvatar, getMyUser } = require('../controllers/users.js')

userRouter.get("/users", getUsers)

userRouter.get("/users/me", getMyUser)

userRouter.get("/users/:userId", getUserById)

userRouter.patch("/users/me", updateProfile)

userRouter.patch("/users/me/avatar", updateAvatar)




module.exports = userRouter;