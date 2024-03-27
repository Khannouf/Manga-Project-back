import { Router } from "express"

import {
  addToList,
  createList,
  getAllList,
  getAllListDetail,
  getList,
  removeFromList,
  removeList,
} from "../controllers/list.controller.js"
import AuthMiddleware from "../middlewares/auth.middleware.js"

const listRoutes = () => {
  const router = Router()
  router.get("/lists", [AuthMiddleware], getAllList)
  router.get("/lists/details", [AuthMiddleware], getAllListDetail)
  router.post("/lists", [AuthMiddleware], createList)
  router.get("/lists/:id", [AuthMiddleware], getList)
  router.delete("/lists/:id", [AuthMiddleware], removeList)

  router.post("/lists/:id/titles/:anilistId", [AuthMiddleware], addToList)
  router.delete("/lists/:listId/titles/:anilistId", [AuthMiddleware], removeFromList)

  return router
}

export default listRoutes
