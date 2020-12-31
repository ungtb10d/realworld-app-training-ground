import React from 'react'

import { getArticles } from './api-client'
import { useRequest } from './hooks/useRequest'
import { useQueryParams } from './hooks/useQueryParams'
import { isEmptyArray, renderConditional } from './utilities.js'

const renderEmptyArticlesMessage = () => (
  <div className="article-preview">Nobody has written any articles yet!</div>
)

const renderArticles = (articles) =>
  articles.map((article) => (
    <div className="article-preview" key={article.slug}>
      <div className="article-meta">
        <a href="profile.html">
          <img
            src={article.author.image}
            alt={`${article.author.username}'s avatar']`}
          />
        </a>
        <div className="info">
          <a href="" className="author">
            {article.author.username}
          </a>
          <span className="date">{article.createdAt}</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>
      <a href="" className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </a>
    </div>
  ))

export function ArticleList() {
  const queryParams = useQueryParams()
  const tag = queryParams.get('tag')
  const requestCallback = React.useCallback(() => getArticles({ tag }), [tag])
  const matchRequestState = useRequest(requestCallback, [tag])

  return matchRequestState({
    idle: () => <></>,
    pending: () => <span>Loading...</span>,
    failure: () => (
      <span>Sorry, the articles could not be loaded at this time.</span>
    ),
    success: renderConditional(isEmptyArray)(
      renderEmptyArticlesMessage,
      renderArticles,
    ),
  })
}
