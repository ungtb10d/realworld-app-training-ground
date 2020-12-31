import axios from 'axios'

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://conduit.productionready.io/api'
    : 'http://localhost:5100/api'

const jwt = window.localStorage.getItem('jwt')

const client = axios.create({
  baseURL: BASE_URL,
  headers: jwt
    ? {
        Authorization: 'Token ' + jwt,
      }
    : {},
})

export const getCurrentUser = () =>
  client.get('/user').then((response) => response.data.user)

export const registerUser = (newUserData) =>
  client
    .post('/users/', { user: newUserData })
    .then((response) => response.data.user)

export const loginUser = (credentials) =>
  client.post('/users/login', { user: credentials }).then((response) => {
    window.localStorage.setItem('jwt', response.data.user.token)

    return response.data.user
  })

export const getArticles = (params) =>
  client.get('/articles', { params }).then((response) => response.data.articles)

export const getTags = () =>
  client.get('/tags').then((response) => response.data.tags)

export const createArticle = (article) =>
  client
    .post('/articles', { article })
    .then((response) => response.data.article)

export const editArticle = (newArticleDetails, slug) =>
  client.post(`/articles/${slug}`, { newArticleDetails })
