import { IUser } from "../../database/models/user"
import { Request, Express } from "express"

declare global {
	namespace Express {
		interface Request {
			token?: string
			user?: IUser
		}
	}
}
