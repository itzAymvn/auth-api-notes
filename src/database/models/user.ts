/**
 * Copyright (c) Aymvn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mongoose, { Document, model, Schema } from "mongoose"

const UserSchema = new Schema(
	{
		name: String,
		email: String,
		password: String,
		tokens: [{ type: Schema.Types.ObjectId, ref: "Token" }],
	},
	{
		timestamps: true,
	}
)

export interface IUser extends Document {
	name: string
	email: string
	password: string
	tokens: Schema.Types.ObjectId[]
}

const User = model<IUser>("User", UserSchema)

export default User
