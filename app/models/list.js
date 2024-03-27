import { DataTypes, Sequelize } from "sequelize"

/**
 *
 * @param {Sequelize} sequelize
 * @returns {typeof import('sequelize').Model}
 */

const setupList = sequelize => {
  const List = sequelize.define("list", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  })
  return List
}

export default setupList
