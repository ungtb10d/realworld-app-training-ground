import React from "react"

export const IDLE = "idle"
export const PENDING = "pending"
export const SUCCESS = "success"
export const FAILURE = "failure"

export function useRequest(request) {
  const [state, setState] = React.useState(IDLE)
  const [error, setError] = React.useState(null)
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    setState(PENDING)

    request()
      .then(setData)
      .then(() => void setState(SUCCESS))
      .catch((e) => {
        setError(e)
        setState(FAILURE)
      })
  }, [request])

  return function returnMatchResult(matchers) {
    const { idle, pending, success, failure } = matchers

    switch (state) {
      case IDLE:
        return idle()
      case PENDING:
        return pending()
      case SUCCESS:
        return success(data)
      case FAILURE:
        return failure(error)
      default:
        return idle()
    }
  }
}
