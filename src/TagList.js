import React from 'react'
import { Link } from 'react-router-dom'

import { getTags } from './api-client'
import { useRequest } from './hooks/useRequest'
import {
  isEveryCharacterZeroWidthNonJoiner,
  isEmptyArray,
  renderConditional,
} from './utilities.js'

const renderEmptyTagsMessage = () => (
  <span>
    None of the articles have tags. You can tag an article during creation or
    editing!
  </span>
)

const renderTags = (tags) =>
  tags.filter(isEveryCharacterZeroWidthNonJoiner).map((tag) => (
    <Link to={`/?tag=${tag}`} className="tag-pill tag-default" key={tag}>
      {tag}
    </Link>
  ))

export function TagList() {
  const requestCallback = React.useCallback(() => getTags(), [])
  const matchRequestState = useRequest(requestCallback)

  return (
    <>
      <h3>Popular Tags</h3>
      <div className="tag-list">
        {matchRequestState({
          idle: () => <></>,
          pending: () => <span>Loading...</span>,
          failure: () => <span>Could not load tags.</span>,
          success: renderConditional(isEmptyArray)(
            renderEmptyTagsMessage,
            renderTags,
          ),
        })}
      </div>
    </>
  )
}
