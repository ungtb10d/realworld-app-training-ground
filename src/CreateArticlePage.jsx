import React, { useState } from "react"
import { useHistory } from "react-router-dom"

import { createArticle } from "./api-client"

export const CreateArticlePage = () => {
  const history = useHistory()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState("")

  const [formErrorMessage, setFormErrorMessage] = useState("")

  function handleSubmit(event) {
    event.preventDefault()

    if (title === "") {
      setFormErrorMessage("Title is required.")
    }

    if (title !== "") {
      createArticle({
        title,
        description,
        body,
        tagList: tags.split(" "),
      }).then(() => history.push("/"))
    }
  }

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form onSubmit={handleSubmit}>
              {formErrorMessage !== "" && formErrorMessage}
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    onChange={(event) => setBody(event.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    onChange={(event) => setTags(event.target.value)}
                  />
                  <div className="tag-list"></div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="submit"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
