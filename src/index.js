import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'

import reducers from './redux/index.reducer'
import App from './views/App'

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/cnode/">
      <App />
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
)
