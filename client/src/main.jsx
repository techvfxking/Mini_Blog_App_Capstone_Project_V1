import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { legacy_createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducers } from './reducers'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)))
const dotenv = import.meta.env;

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <GoogleOAuthProvider clientId={dotenv.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
)
