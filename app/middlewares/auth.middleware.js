import jwt from "jsonwebtoken"

import { User } from "../models/index.js"
import { SIGNATURE } from "../utils/basic.js"

const AuthMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  if (!authorizationHeader) return res.status(401).json({ error: "Unauthorized" })

  const bearerToken = authorizationHeader.replace("Bearer ", "")

  try {
    const data = jwt.verify(bearerToken, SIGNATURE)
    const user = await User.findByPk(data.userId)

    if (!user) return res.status(401).json({ error: "Unauthorized" })
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" })
  }
}

export default AuthMiddleware
