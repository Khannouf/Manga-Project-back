import { List, ListTitle } from "../models/index.js"
import { genresRequest, mangaDetail, mangaGenres, searchRequest } from "../utils/title.js"

export const search = async (req, res) => {
  const query = req.query.q?.trim().toLowerCase()
  if (!query) return res.status(400).json({ type: "error", message: "Query is required" })

  const results = await searchRequest(query)
  res.json({ type: "success", data: results })
}

export const searchId = async (req, res) => {
  const id = req.params.id
  if (!id) return res.status(400).json({ type: "error", message: "Id is required" })

  const results = await mangaDetail(id)
  res.json({ type: "success", data: results })
}

export const recommendations = async (req, res) => {
  const lists = await List.findAll({
    where: { userId: req.user.id },
    include: ListTitle,
  })

  const results = await Promise.all(
    lists.flatMap(list => {
      return list.dataValues.list_titles.map(async ({ anilistId }) => {
        const detail = await mangaGenres(anilistId)
        return detail
      })
    })
  ).then(titles => titles.filter(Boolean))

  const resultsId = results.flatMap(array => array.flatMap(item => item.id))

  const genreCounts = results
    .flatMap(array => array.flatMap(item => item.genres))
    .reduce((acc, genre) => {
      if (!acc[genre]) {
        acc[genre] = 1
      } else {
        acc[genre]++
      }
      return acc
    }, {})

  console.log(genreCounts)

  const topGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(entry => entry[0])

  console.log(topGenres)

  const resultsGenres = await genresRequest(topGenres, resultsId)

  res.json({ type: "success", data: resultsGenres })
}
