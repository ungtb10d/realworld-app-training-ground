import React from 'react'
import { useLocation } from 'react-router-dom'

import { getArticles } from './api-client'
import { useRequest } from './hooks/useRequest'

export function ArticleList() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const tag = queryParams.get('tag')
  const requestCallback = React.useCallback(() => getArticles({ tag }), [tag])
  const renderRequest = useRequest(requestCallback, [tag])

  return renderRequest({
    idle: () => <></>,
    pending: () => <span>Loading...</span>,
    failure: () => (
      <span>Sorry, the articles could not be loaded at this time.</span>
    ),
    success: (articles) =>
      articles.map((article) => {
        return (
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
        )
      }),
  })
}
