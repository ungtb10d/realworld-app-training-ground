import React from "react"
import { useLocation } from "react-router-dom"

import {
  /* IDLE, PENDING, SUCCESS, FAILURE, */ getArticles,
} from "./api-client"
import { useRequest } from "./hooks/useRequest"

export function ArticleList() {
  // const [requestState, setRequestState] = React.useState(IDLE)
  // const [articles, setArticles] = React.useState([])
  // const queryParams = useQueryParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const tag = queryParams.get("tag")
  const requestCallback = React.useCallback(() => getArticles({ tag }), [tag])
  const renderRequest = useRequest(requestCallback, [tag])

  return renderRequest({
    idle: () => <></>,
    pending: () => <span>Loading...</span>,
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
    failure: <span>Sorry, the articles could not be loaded at this time.</span>,
  })

  // React.useEffect(() => {
  //   setRequestState(PENDING)
  //
  //   getArticles({ tag })
  //     .then(setArticles)
  //     .then(() => void setRequestState(SUCCESS))
  //     .catch((_error) => {
  //       setRequestState(FAILURE)
  //     })
  // }, [tag])
  //
  // if (requestState === PENDING) {
  //   return <span>Loading...</span>
  // }
  //
  // if (requestState === FAILURE) {
  //   return <span>Sorry, your articles could not be loaded at this time.</span>
  // }
  //
  // return (
  //   requestState === SUCCESS &&
  //   articles.map((article) => {
  //     return (
  //       <div className="article-preview">
  //         <div className="article-meta">
  //           <a href="profile.html">
  //             <img src={article.author.image} />
  //           </a>
  //           <div className="info">
  //             <a href="" className="author">
  //               {article.author.username}
  //             </a>
  //             <span className="date">{article.createdAt}</span>
  //           </div>
  //           <button className="btn btn-outline-primary btn-sm pull-xs-right">
  //             <i className="ion-heart"></i> {article.favoritesCount}
  //           </button>
  //         </div>
  //         <a href="" className="preview-link">
  //           <h1>{article.title}</h1>
  //           <p>{article.description}</p>
  //           <span>Read more...</span>
  //         </a>
  //       </div>
  //     )
  //   })
  // )
}
