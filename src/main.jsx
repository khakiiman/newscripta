import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { myHistory } from './utils/router/history.js'
import HistoryRouter from './utils/router/HistoryRouter'
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HistoryRouter history={myHistory}>
      <Toaster richColors position='top-center'/>
      <App />
    </HistoryRouter>
  </React.StrictMode>,
)