import Axios from "axios"

export const searchRequest = async query => {
  const requestQuery = JSON.stringify({
    query: `query ($search: String) {
      Page {
        media(type: MANGA, search: $search, isAdult: false, sort: TRENDING_DESC) {
          id 
          title {
            romaji
            english
          }
          chapters
          genres
          averageScore
          coverImage {
              extraLarge
              large
              color
          }
          bannerImage
        }
      }
    }`,
    variables: { search: query.toLowerCase().trim() },
  })

  const unformatedTitles = await Axios.post("https://graphql.anilist.co", requestQuery, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => res.data.data.Page.media)
    .catch(() => [])

  const titles = unformatedTitles
    .map(title => ({
      id: title.id,
      title: title.title.romaji ?? title.title.english ?? null,
      chapterCount: title.chapters ?? null,
      genres: title.genres,
      score: title.averageScore,
      cover: title.coverImage.large,
      bannerImage: title.bannerImage,
    }))
    .filter(title => title.title !== null)
  return titles
}

export const mangaDetail = async id => {
  const requestQuery = JSON.stringify({
    query: `query ($id: Int) {
      Page {
        media(type: MANGA, id: $id, isAdult: false, sort: TRENDING_DESC) {
          id 
          title {
            romaji
            english
          }
          characters(sort: FAVOURITES_DESC) {
            edges {
              node {
                name {
                  full
                }
                image {
                  large
                }
              }
            }
          }
          chapters
          genres
          averageScore
          coverImage {
              extraLarge
              large
              color
          }
          bannerImage
          recommendations(perPage: 7, sort: [RATING_DESC, ID]) {
            nodes {
              mediaRecommendation {
                id
                title {
                  userPreferred
                }
                bannerImage
                coverImage {
                  extraLarge
                  large
                  color
                }
              }
            }
          }
        }
      }
    }`,
    variables: { id },
  })

  const unformatedTitles = await Axios.post("https://graphql.anilist.co", requestQuery, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => res.data.data.Page.media)
    .catch(() => [])

  const titles = unformatedTitles
    .map(title => ({
      id: title.id,
      title: title.title.romaji ?? title.title.english ?? null,
      chapterCount: title.chapters ?? null,
      genres: title.genres,
      score: title.averageScore,
      cover: title.coverImage.large,
      bannerImage: title.bannerImage,
      recommendations: title.recommendations.nodes.map(recommendation => ({
        id: recommendation.mediaRecommendation.id,
        title: recommendation.mediaRecommendation.title.userPreferred,
        cover: recommendation.mediaRecommendation.coverImage.large,
        bannerImage: recommendation.mediaRecommendation.bannerImage,
      })),
    }))
    .filter(title => title.title !== null)
  return titles
}

export const mangaGenres = async id => {
  const requestQuery = JSON.stringify({
    query: `query ($id: Int) {
      Page {
        media(type: MANGA, id: $id, isAdult: false, sort: TRENDING_DESC) {
          id 
          title {
            romaji
            english
          }
          characters(sort: FAVOURITES_DESC) {
            edges {
              node {
                name {
                  full
                }
                image {
                  large
                }
              }
            }
          }
          chapters
          genres
          averageScore
          coverImage {
              extraLarge
              large
              color
          }
          bannerImage
        }
      }
    }`,
    variables: { id },
  })

  const unformatedTitles = await Axios.post("https://graphql.anilist.co", requestQuery, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => res.data.data.Page.media)
    .catch(() => [])

  const titles = unformatedTitles
    .map(title => ({
      id: title.id,
      genres: title.genres,
    }))
    .filter(title => title.title !== null)
  return titles
}

export const genresRequest = async (genres, id) => {
  const requestQuery = JSON.stringify({
    query: `query ($genres: [String], $id: [Int]) {
      Page {
        media(type: MANGA, genre_in: $genres, isAdult: false, sort: TRENDING_DESC, id_not_in: $id) {
          id 
          title {
            romaji
            english
          }
          chapters
          genres
          averageScore
          coverImage {
              extraLarge
              large
              color
          }
          bannerImage
        }
      }
    }`,
    variables: { genres: genres.map(genre => genre.toLowerCase().trim()), id },
  })

  const unformatedTitles = await Axios.post("https://graphql.anilist.co", requestQuery, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => res.data.data.Page.media)
    .catch(() => [])

  const titles = unformatedTitles
    .map(title => ({
      id: title.id,
      title: title.title.romaji ?? title.title.english ?? null,
      chapterCount: title.chapters ?? null,
      genres: title.genres,
      score: title.averageScore,
      cover: title.coverImage.large,
      bannerImage: title.bannerImage,
    }))
    .filter(title => title.title !== null)
  return titles
}
