/**
 * Copyright (c) Aymvn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Router } from "express"
import bcrypt from "bcrypt"
import User from "../database/models/user"

const signupRouter = Router()

signupRouter.post("/", async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		return res.status(400).json({
			success: false,
			message: "Please provide an email and a password",
		})
	}

	const user = await User.findOne({ email })

	if (user) {
		return res.status(400).json({
			success: false,
			message: "User with that email already exists",
		})
	}

	const hashedPassword = await bcrypt.hash(password.trim(), 10)
	const newUser = new User({
		name: (
			req.body.name ||
			email.split("@")[0] ||
			email ||
			"User"
		).toLowerCase(),
		email: email.toLowerCase(),
		password: hashedPassword,
	})

	await newUser.save()
	res.status(201).json({
		success: true,
		message: "User created successfully",
	})
})

export default signupRouter
