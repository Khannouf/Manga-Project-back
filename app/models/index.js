import { Sequelize } from "sequelize"

import setupList from "./list.js"
import setupListTitle from "./list.title.js"
import setupUser from "./user.js"

const sequelize = new Sequelize({
  dialect: "mysql",
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  logging: false,
})

export const User = (sequelize.user = setupUser(sequelize))
export const List = (sequelize.list = setupList(sequelize))
export const ListTitle = (sequelize.list_title = setupListTitle(sequelize))

User.hasMany(List)
List.belongsTo(User, { onDelete: "CASCADE" })

List.hasMany(ListTitle)
ListTitle.belongsTo(List, { onDelete: "CASCADE" })

export default sequelize
