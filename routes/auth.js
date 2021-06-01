const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')

const User = require('../models/User')


//Kiem tra user da login?
//Access public
router.get('/', verifyToken, async(req, res) =>{
	try {
		const user = await User.findById(req.userId).select('-password')
		if(!user)
		return res
			.status(400)
			.json({success: false, message: 'User not found'})
		res.json({success: true, user})
		
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})


//Router register
router.post('/register', async (req, res) => {
	const { username, password } = req.body

	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Username or password is missing' })

	try {
		// Kiem tra username
		const user = await User.findOne({ username })

		if (user)
			return res
				.status(400)
				.json({ success: false, message: 'Username already taken' })

		//Ham bam password
		const hashedPassword = await argon2.hash(password)
		const newUser = new User({ username, password: hashedPassword })
		await newUser.save()

		// Tra ve token
		const accessToken = jwt.sign(
			{ userId: newUser._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User created successfully',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Server error found' })
	}
})


// Router Login 
router.post('/login', async (req, res) => {
	const { username, password } = req.body

	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Username or password is missing' })

	try {
		//Find username
		const user = await User.findOne({ username })
		if (!user)
			return res
				.status(400)
				.json({ success: false, message: 'Username or password is incorrect' })

		// Username found
		const passwordValid = await argon2.verify(user.password, password)
		if (!passwordValid)
			return res
				.status(400)
				.json({ success: false, message: 'Username or password is incorrect' })

		// Tra ve token
		const accessToken = jwt.sign(
			{ userId: user._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'Logged in successfully',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Server error found' })
	}
})

module.exports = router
