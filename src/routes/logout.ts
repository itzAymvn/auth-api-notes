/**
 * Copyright (c) Aymvn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Router } from "express"
import Token from "../database/models/token"

const logoutRouter = Router()

logoutRouter.post("/", async (req, res) => {
	const token = req.token

	try {
		const deletedToken = await Token.findOneAndDelete({
			token: token,
		})

		if (!deletedToken) {
			return res.status(400).json({
				success: false,
				message: "Invalid token",
			})
		}

		return res.status(200).json({
			success: true,
			message: "Logged out successfully",
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		})
	}
})

export default logoutRouter
