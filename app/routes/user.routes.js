import { Router } from "express"

import { login, me, register } from "../controllers/user.controller.js"
import AuthMiddleware from "../middlewares/auth.middleware.js"

const userRoutes = () => {
  const router = Router()

  router.post("/auth/login", login)
  router.post("/auth/register", register)

  router.get("/auth/me", [AuthMiddleware], me)

  return router
}

export default userRoutes
