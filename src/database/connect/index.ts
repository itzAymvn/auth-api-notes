/**
 * Copyright (c) Aymvn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { connect } from "mongoose"

export default async function connectDB() {
	const MONGO_URI = process.env.MONGO_URI!

	try {
		await connect(MONGO_URI)
	} catch (error: any) {
		throw new Error(`Error connecting to database: ${error}`)
	}
}
