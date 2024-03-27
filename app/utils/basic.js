import jwt from "jsonwebtoken"

export const SIGNATURE = process.env.SIGNATURE

export const getToken = user => {
  return jwt.sign({ userId: user.id }, SIGNATURE)
}
