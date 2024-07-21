/**
 * Copyright (c) Aymvn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import connectDB from "./database/connect"
import Express from "express"
import cors from "cors"
import "dotenv/config"

import { loginRouter, noteRouter, signupRouter, userRouter } from "./routes"
import authenticateToken from "./middlewares/authenticateToken"

const app = Express()
const PORT = process.env.PORT || 3000

const validateEnv = async () => {
	console.log(`Validating environment variables...`)
	return new Promise((resolve, reject) => {
		if (!process.env?.JWT_SECRET) {
			return reject(
				"You need to provide a JWT_SECRET environment variable"
			)
		}

		if (!process.env?.MONGO_URI) {
			return reject(
				"You need to provide a MONGO_URI environment variable"
			)
		}

		if (!process.env?.TOKEN_EXPIRATION_IN_SECONDS) {
			return reject(
				"You need to provide a TOKEN_EXPIRATION_IN_SECONDS environment variable"
			)
		}

		if (!process.env?.PORT) {
			console.log(
				`PORT environment variable not provided. Using default port: 3000`
			)
			resolve(true)
		}

		if (!process.env?.NOTES_PER_PAGE) {
			console.log(
				`NOTES_PER_PAGE environment variable not provided. Using default value: 5`
			)
			resolve(true)
		}

		console.log(`Environment variables are valid`)
		return resolve(true)
	})
}

const main = async () => {
	app.use(Express.json())
	app.use(cors())

	app.use("/signup", signupRouter)
	app.use("/login", loginRouter)

	app.use("/user", authenticateToken, userRouter)
	app.use("/note", authenticateToken, noteRouter)

	app.listen(PORT, () => {
		console.log(`Server listening on http://localhost:${PORT}`)
	})
}

validateEnv()
	.then(() => {
		connectDB()
	})
	.then(() => {
		main()
	})
	.catch((error) => console.error(error))
