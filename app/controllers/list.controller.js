import { List } from "../models/index.js"
import { ListTitle } from "../models/index.js"
import { mangaDetail } from "../utils/title.js"

export const createList = async (req, res) => {
  const name = req.body.name
  if (!name) return res.status(400).json({ type: "error", message: "Name is required" })

  const list = await List.create({ name, userId: req.user.id })

  res.json({ type: "success", data: list })
}

export const getList = async (req, res) => {
  const id = req.params.id
  if (!id) return res.status(400).json({ type: "error", message: "Id is required" })

  const list = await List.findOne({
    where: { id, userId: req.user.id },
    include: ListTitle,
  })
  if (!list) return res.status(400).json({ type: "error", message: "List is undefined" })

  console.log(list)

  const titles = await Promise.all(
    list.list_titles.map(async ({ anilistId }) => {
      console.log(anilistId)
      const detail = await mangaDetail(anilistId)
      return detail
    })
  ).then(titles => titles.filter(Boolean))

  const response = {
    id: list.id,
    name: list.name,
    titles,
  }

  res.json({ type: "success", data: response })
}

export const getAllList = async (req, res) => {
  const lists = await List.findAll({ where: { userId: req.user.id } })
  console.log(lists)

  res.json({ type: "success", data: lists })
}

export const addToList = async (req, res) => {
  const listId = req.params.id
  const anilistId = req.params.anilistId
  if (!listId || !anilistId)
    return res.status(400).json({ type: "error", message: "Id is required" })

  const list = await List.findOne({ where: { id: listId, userId: req.user.id } })
  if (!list) return res.status(400).json({ type: "error", message: "List is undefined" })

  const listTitle = await ListTitle.findOne({ where: { anilistId, listId } })
  if (listTitle)
    return res
      .status(400)
      .json({ type: "error", message: "Title has already been added" })

  await ListTitle.create({
    listId,
    anilistId,
  })
  res.json({ type: "success", data: "Title added successfully." })
}

export const removeFromList = async (req, res) => {
  const listId = req.params.listId
  const anilistId = req.params.anilistId
  if (!listId || !anilistId)
    return res.status(400).json({ type: "error", message: "Id is required" })

  const list = await List.findOne({ where: { id: listId, userId: req.user.id } })
  if (!list) return res.status(400).json({ type: "error", message: "List is undefined" })

  await ListTitle.destroy({ where: { anilistId, listId } })
  res.json({ type: "success", message: "Title removed successfully." })
}

export const removeList = async (req, res) => {
  const id = req.params.id
  if (!id) return res.status(400).json({ type: "error", message: "Id is required" })

  const list = await List.findOne({
    where: { id, userId: req.user.id },
    include: ListTitle,
  })
  if (!list) return res.status(400).json({ type: "error", message: "List is undefined" })

  await List.destroy({ where: { id, userId: req.user.id }, include: ListTitle })
  res.json({ type: "success", message: "List removed successfully." })
}

export const getAllListDetail = async (req, res) => {
  const unformatedLists = await List.findAll({
    where: { userId: req.user.id },
    include: ListTitle,
  })

  const lists = unformatedLists.map(list => ({
    id: list.id,
    name:list.name,
    list_titles: list.list_titles.map(list_title => ({
      id: list_title.anilistId,
    })),
  }))

  res.json({ type: "success", data: lists })
}
