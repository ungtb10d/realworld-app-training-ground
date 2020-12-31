import React from "react"
import { Link } from "react-router-dom"

import { getTags } from "./api-client"
import { useRequest } from "./hooks/useRequest"

const doesWordContainEmptyChar = (word) =>
  word
    .split("")
    .every((stringCharacter) => stringCharacter.charCodeAt(0) !== 8204)

export function TagList() {
  const requestCallback = React.useCallback(() => getTags(), [])
  const renderRequest = useRequest(requestCallback)

  return (
    <>
      <p>Popular Tags</p>

      <div className="tag-list">
        {renderRequest({
          idle: () => <></>,
          pending: () => <span>Loading...</span>,
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
          failure: () => <span>Could not load tags.</span>,
        })}

        {/************************* Second evolution after seeing repitition in other components **********************/}
        {/* {matchRequestState(requestState)({ */}
        {/*   [IDLE]: () => <></>, */}
        {/*   [PENDING]: () => <span>Loading...</span>, */}
        {/*   [SUCCESS]: () => */}
        {/*     tags.filter(doesWordContainEmptyChar).map((tag) => ( */}
        {/*       <Link to={`/?tag=${tag}`} className="tag-pill tag-default"> */}
        {/*         {tag} */}
        {/*       </Link> */}
        {/*     )), */}
        {/*   [FAILURE]: () => <span>Could not load tags.</span>, */}
        {/* })} */}

        {/************************* First evolution done in class **********************/}
        {/* {requestState === PENDING && <span>Loading...</span>} */}
        {/* {requestState === FAILURE && <span>Could not load tags.</span>} */}
        {/* {requestState === SUCCESS && */}
        {/*   tags.filter(doesWordContainEmptyChar).map((tag) => ( */}
        {/*     <Link to={`/?tag=${tag}`} className="tag-pill tag-default"> */}
        {/*       {tag} */}
        {/*     </Link> */}
        {/*   ))} */}
      </div>
    </>
  )
}
