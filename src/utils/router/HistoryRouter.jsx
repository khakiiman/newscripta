import { useLayoutEffect, useState } from "react"
import { Router } from "react-router-dom"


const HistoryRouter = ({ basename, children, history }) => {
  let [state, setState] = useState({
    action: history.action,
    location: history.location
  })

  useLayoutEffect(() => history.listen(setState), [history])

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}>
      {children}
    </Router>
  )
}

export default HistoryRouter