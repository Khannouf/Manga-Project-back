import { DataTypes, Sequelize } from "sequelize"

/**
 *
 * @param {Sequelize} sequelize
 * @returns {typeof import('sequelize').Model}
 */
const setupUser = sequelize => {
  const User = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  })
  return User
}

export default setupUser
