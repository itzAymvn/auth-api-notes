import jwt, { JwtPayload } from "jsonwebtoken"
import User, { IUser } from "../database/models/user"
import { NextFunction, Request, Response } from "express"
import Token from "../database/models/token"

const JWT_SECRET = process.env.JWT_SECRET

const authenticateToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization
	if (!token) {
		return res
			.status(401)
			.json({ success: false, message: "No token provided" })
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET!) as JwtPayload

		const foundToken = await Token.findOne({
			userId: decoded.id,
			token: token,
		})

		if (!foundToken) {
			throw new Error("Invalid token")
		}

		const user = await User.findById(decoded.id)
		if (!user) {
			throw new Error("User not found")
		}

		req.user = user
		req.token = token
		next()
	} catch (error: any) {
		res.status(401).json({
			success: false,
			message: error.message || "Invalid token",
		})
	}
}

export default authenticateToken
