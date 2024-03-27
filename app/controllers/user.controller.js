import { compareSync, hashSync } from "bcrypt"

import { User } from "../models/index.js"
import { getToken } from "../utils/basic.js"
import {
  loginVerification,
  registerVerification,
} from "../utils/verifications/auth.verifications.js"

export const login = async (req, res) => {
  const errors = await loginVerification(req)
  if (errors.length) return res.status(400).json({ type: "error", message: errors[0] })

  const { username, password } = req.body

  const user = await User.findOne({ where: { username } })
  if (!user || !compareSync(password, user.password))
    return res
      .status(400)
      .json({ type: "error", message: "Username or password incorrect." })

  res.json({
    type: "success",
    data: getToken(user),
  })
}

export const register = async (req, res) => {
  const errors = await registerVerification(req)
  if (errors.length) return res.status(400).json({ type: "error", message: errors[0] })

  const username = req.body.username
  const password = req.body.password

  const user = await User.create({
    username,
    password: hashSync(password, 10),
  })

  res.json({
    type: "success",
    data: getToken(user),
  })
}

export const me = async (req, res) => {
  const username = req.user.username
  res.json({
    type: "success",
    data: {
      id: req.user.id,
      username,
    },
  })
}
