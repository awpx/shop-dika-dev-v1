import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { generateToken } from '../utils/generateToken.js'


//@desc       Auth user & get token
//@route      POST /api/v1/users/login
//@access     private
export const authUser = asyncHandler( async (req, res) => {
  const { email, password } = req.body
 
  const user = await User.findOne({ email })

  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }
})


//@desc       register new user
//@route      POST /api/v1/users
//@access     public
export const registerUser = asyncHandler( async (req, res) => {
  const { name, email, password } = req.body
 
  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400)
    throw new Error('User already exist')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})


//@desc       update user profile
//@route      PUT /api/v1/users/profile
//@access     private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    
    if(req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
    
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


//@desc       get user profile
//@route      GET /api/v1/users/profile
//@access     private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc       Admin: get all user
//@route      GET /api/v1/users/
//@access     private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})

  res.json(users)
})

//@desc       Admin: delete user
//@route      GET /api/v1/users/:id
//@access     private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if(user) {
    await user.remove()
    res.json({ success: true, message: 'user removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }

})

//@desc       Admin: get user by ID
//@route      GET /api/v1/users/:id
//@access     private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if(user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }

})

//@desc       Admin: update user
//@route      PUT /api/v1/users/profile
//@access     private/admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if(user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
    
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})