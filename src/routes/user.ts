/**
 * Copyright (c) Aymvn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Request, Response, Router } from "express"

const userRouter = Router()

userRouter.post("/", async (req: Request, res: Response) => {
	if (!req?.user) {
		return res.status(401).json({
			success: false,
			message: "You need to provide a authorization token",
		})
	}

	const user = req.user

	res.status(200).json({
		success: true,
		user: {
			id: user._id,
			email: user.email,
			name: user.name,
		},
	})
})

export default userRouter
