/**
 * Copyright (c) Aymvn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Router } from "express"
import User from "../database/models/user"
import Token from "../database/models/token"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const loginRouter = Router()
const JWT_SECRET = process.env.JWT_SECRET!
const TOKEN_EXPIRATION_IN_SECONDS = parseInt(
	process.env.TOKEN_EXPIRATION_IN_SECONDS!
)

loginRouter.post("/", async (req, res) => {
	try {
		const { email, password } = req.body
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Please provide an email and a password",
			})
		}

		// Check if user exists
		const user = await User.findOne({ email: email.toLowerCase() })
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "User with that email does not exist",
			})
		}

		// Check if password is correct
		const passwordMatch = await bcrypt.compare(
			password.trim(),
			user.password!
		)
		if (!passwordMatch) {
			return res.status(400).json({
				success: false,
				message: "Incorrect password",
			})
		}

		// Generate token
		const token = jwt.sign({ id: user._id }, JWT_SECRET, {
			expiresIn: TOKEN_EXPIRATION_IN_SECONDS,
		})

		// Create a new token document
		const newToken = new Token({
			userId: user._id,
			token: token,
			createdAt: new Date(),
			expiresAt: new Date(Date.now() + TOKEN_EXPIRATION_IN_SECONDS),
		})

		await newToken.save().catch(console.error)

		res.status(200).json({
			success: true,
			token: token,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			success: false,
			message: "An error occurred while processing your request",
		})
	}
})

export default loginRouter
