import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import {
    legacy_createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import { reducers } from "./reducers"

const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(
    document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)
