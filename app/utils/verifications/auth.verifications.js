import { User } from "../../models/index.js"

export const generateToken = size => {
  if (size <= 0) return ""
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    .repeat(64)
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("")
    .slice(0, size - 1)
}

export const registerVerification = async req => {
  const errors = []

  if (!req.body.username) errors.push("Username is required.")
  else if (typeof req.body.username !== "string")
    errors.push("Username must be a string.")
  else if (req.body.username.length < 2)
    errors.push("Username must contains at least 2 characters.")
  else if (req.body.username.length > 64)
    errors.push("Username must contains at most 64 characters.")
  else if (await User.findOne({ where: { username: req.body.username } }))
    errors.push("Username already used.")

  if (!req.body.password) errors.push("Password is required.")
  else if (typeof req.body.password !== "string")
    errors.push("Password must be a string.")
  else if (req.body.password.length < 6)
    errors.push("Password must contains at least 6 characters.")

  return errors
}
export const loginVerification = async req => {
  const errors = []

  if (!req.body.username) errors.push("Username is required.")
  else if (typeof req.body.username !== "string")
    errors.push("Username must be a string.")

  if (!req.body.password) errors.push("Password is required.")
  else if (typeof req.body.password !== "string")
    errors.push("Password must be a string.")

  return errors
}
