import { Router } from "express"

import { recommendations, search, searchId } from "../controllers/title.controller.js"
import AuthMiddleware from "../middlewares/auth.middleware.js"

const titleRoutes = () => {
  const router = Router()
  router.get("/titles/search", [AuthMiddleware], search)
  router.get("/titles/:id", [AuthMiddleware], searchId)
  router.get("/recommendations", [AuthMiddleware], recommendations)
  return router
}

export default titleRoutes
