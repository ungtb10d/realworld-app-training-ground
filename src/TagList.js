import React from "react";
import { Link } from 'react-router-dom'

import { IDLE, PENDING, SUCCESS, FAILURE, getTags } from "./api-client";

const doesWordContainEmptyChar = (word) =>
  word
    .split("")
    .every((stringCharacter) => stringCharacter.charCodeAt(0) !== 8204);

export function TagList() {
  const [requestState, setRequestState] = React.useState(IDLE);
  const [tags, setTags] = React.useState([]);

  React.useEffect(() => {
    setRequestState(PENDING);

    getTags()
      .then(setTags)
      .then(() => void setRequestState(SUCCESS))
      .catch((_error) => {
        setRequestState(FAILURE);
      });
  }, []);

  return (
    <>
      <p>Popular Tags</p>

      <div className="tag-list">
        {requestState === PENDING && <span>Loading...</span>}
        {requestState === FAILURE && <span>Could not load tags.</span>}
        {requestState === SUCCESS &&
          tags.filter(doesWordContainEmptyChar).map((tag) => (
            <Link to={`/?tag=${tag}`} className="tag-pill tag-default">
              {tag}
            </Link>
          ))}
      </div>
    </>
  );
}
