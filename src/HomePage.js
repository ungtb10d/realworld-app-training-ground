import React from 'react'
import axios from 'axios'

const possibleRequestStates = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILURE: 'failure',
}

export function HomePage() {
  const [requestState, setRequestState] = React.useState(possibleRequestStates.IDLE)
  const [articles, setArticles] = React.useState([])

  React.useEffect(() => {
    setRequestState(possibleRequestStates.PENDING)

    axios
      .get('https://conduit.productionready.io/api/articles?limit=10')
      .then((response) => {
        setRequestState(possibleRequestStates.SUCCESS)
        setArticles(response.data.articles)
      })
      .catch((error) => {
        setRequestState(possibleRequestStates.FAILURE)
        console.error(error)
      })
      
  }, [])

  return (
    <React.Fragment>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link disabled" href="">
                      Your Feed
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              {requestState === possibleRequestStates.PENDING && <span>Loading...</span>}

              {requestState === possibleRequestStates.FAILURE && (
                <span>
                  Sorry, your articles could not be loaded at this time.
                </span>
              )}

              {requestState === possibleRequestStates.SUCCESS &&
                articles.map((article) => {
                  return (
                    <div className="article-preview">
                      <div className="article-meta">
                        <a href="profile.html">
                          <img src={article.author.image} />
                        </a>
                        <div className="info">
                          <a href="" className="author">
                            {article.author.username}
                          </a>
                          <span className="date">January 20th</span>
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
                })}
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                  <a href="" className="tag-pill tag-default">
                    programming
                  </a>
                  <a href="" className="tag-pill tag-default">
                    javascript
                  </a>
                  <a href="" className="tag-pill tag-default">
                    emberjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    angularjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    react
                  </a>
                  <a href="" className="tag-pill tag-default">
                    mean
                  </a>
                  <a href="" className="tag-pill tag-default">
                    node
                  </a>
                  <a href="" className="tag-pill tag-default">
                    rails
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
