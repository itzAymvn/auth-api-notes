/**
 * Copyright (c) Aymvn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mongoose, { Document, model, Schema } from "mongoose"

const NoteSchema = new Schema(
	{
		title: String,
		content: String,
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
)

export interface INote extends Document {
	title: string
	content: string
	user: mongoose.Types.ObjectId
}

const Note = model("Note", NoteSchema)

export default Note
