import "dotenv/config"

import cors from "cors"
import express from "express"

import sequelize from "./models/index.js"
import listRoutes from "./routes/list.routes.js"
import titleRoutes from "./routes/title.routes.js"
import userRoutes from "./routes/user.routes.js"

const PORT = process.env.SERVER_PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(userRoutes())
app.use(titleRoutes())
app.use(listRoutes())

sequelize.sync().then(() => console.log("Database connection OK"))

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
