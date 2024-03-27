import { DataTypes, Sequelize } from "sequelize"

/**
 *
 * @param {Sequelize} sequelize
 * @returns {typeof import('sequelize').Model}
 */

const setupListTitle = sequelize => {
  const ListTitle = sequelize.define("list_title", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    anilistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  })
  return ListTitle
}

export default setupListTitle
