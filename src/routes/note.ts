/**
 * Copyright (c) Aymvn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Router } from "express"
import Note from "../database/models/note"
import mongoose from "mongoose"

const noteRouter = Router()
const NOTES_PER_PAGE = parseInt(process.env.NOTES_PER_PAGE as string) || 5

// Get user notes
noteRouter.get("/", async (req, res) => {
	if (!req.user) {
		return res.status(401).json({
			success: false,
			message: "You need to provide a authorization token",
		})
	}

	const user = req.user

	if (!req.query.page) {
		const notes = await Note.find({ user: user._id }, { __v: 0, user: 0 })
		return res.json({
			success: true,
			user_id: user._id,
			notes: notes,
		})
	}

	const page = parseInt(req.query.page as string) || 1
	const totalDocuments = await Note.countDocuments({ user: user._id })
	const totalPages = Math.ceil(totalDocuments / NOTES_PER_PAGE)

	if (isNaN(page)) {
		return res.status(400).json({
			success: false,
			message: "Invalid page number",
		})
	}

	if (page > totalPages) {
		return res.status(400).json({
			success: false,
			message: "Page number exceeds the total number of pages",
		})
	}

	const notes = await Note.find({ user: user._id }, { __v: 0, user: 0 })
		.skip((page - 1) * NOTES_PER_PAGE)
		.limit(NOTES_PER_PAGE)

	return res.json({
		success: true,
		total_pages: totalPages,
		current_page: page,
		user_id: user._id,
		notes: notes,
	})
})

// Create a new note
noteRouter.post("/", async (req, res) => {
	if (!req.user) {
		return res.status(401).json({
			success: false,
			message: "You need to provide a authorization token",
		})
	}

	const user = req.user

	const { title, content } = req.body
	try {
		const note = new Note({
			title,
			content,
			user: user._id,
		})

		await note.save()
		return res.json({
			success: true,
			message: "Note created",
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		})
	}
})

// Update a note
noteRouter.put("/:id", async (req, res) => {
	if (!req.user) {
		return res.status(401).json({
			success: false,
			message: "You need to provide a authorization token",
		})
	}

	const user = req.user
	const { title, content } = req.body
	const { id } = req.params

	if (!title || !content) {
		return res.status(400).json({
			success: false,
			message: "You need to provide new title and content",
		})
	}

	if (!id) {
		return res.status(400).json({
			success: false,
			message: "You need to provide the id of the note to update",
		})
	}

	// if id is not instance of ObjectId
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({
			success: false,
			message: "Invalid id",
		})
	}

	try {
		const note = await Note.findOne({ _id: id, user: user._id })
		if (!note) {
			return res.status(404).json({
				success: false,
				message: "User has no note with that id",
			})
		}

		note.title = title
		note.content = content

		await note.save()
		return res.json({
			success: true,
			message: "Note updated",
		})
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		})
	}
})

// Delete a note
noteRouter.delete("/:ids", async (req, res) => {
	if (!req.user) {
		return res.status(401).json({
			success: false,
			message: "You need to provide a authorization token",
		})
	}

	const user = req.user
	const { ids } = req.params

	if (!ids) {
		return res.status(400).json({
			success: false,
			message: "No notes to delete",
		})
	}

	const idsArray = ids.split(",")
	const [validIds, invalidIds] = idsArray.reduce(
		(acc: [string[], string[]], id: string) => {
			if (mongoose.Types.ObjectId.isValid(id)) {
				acc[0].push(id)
			} else {
				acc[1].push(id)
			}
			return acc
		},
		[[], []]
	)

	try {
		await Note.deleteMany({
			_id: { $in: validIds },
			user: user._id,
		})

		return res.json({
			success: true,
			message: "Notes deleted",
		})
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		})
	}
})

export default noteRouter
