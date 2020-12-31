import React from 'react'
import { Link } from 'react-router-dom'

import { getTags } from './api-client'
import { useRequest } from './hooks/useRequest'

const doesWordContainEmptyChar = (word) =>
  word
    .split('')
    .every((stringCharacter) => stringCharacter.charCodeAt(0) !== 8204)

export function TagList() {
  const requestCallback = React.useCallback(() => getTags(), [])
  const cata = useRequest(requestCallback)

  return (
    <>
      <p>Popular Tags</p>

      <div className="tag-list">
        {cata({
          idle: () => <></>,
          pending: () => <span>Loading...</span>,
          failure: () => <span>Could not load tags.</span>,
          success: (tags) =>
            tags.filter(doesWordContainEmptyChar).map((tag) => (
              <Link
                to={`/?tag=${tag}`}
                className="tag-pill tag-default"
                key={tag}
              >
                {tag}
              </Link>
            )),
        })}
      </div>
    </>
  )
}
