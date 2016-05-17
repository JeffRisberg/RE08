import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import categories from './reducers/categories';
import charities from './reducers/charities';
import context from './reducers/context';
import portal from './reducers/portal';
import selections from './reducers/selections';
import vendor from './reducers/vendor';

import AppRoot from './components/AppRoot.js';
import Home from './components/Home.js';

var initialContent = {
    categories: null,
    charities: {idLists: {}, records: {}},
    context: null,
    portal: null,
    selections: {},
    vendor: null
};

const reducers = combineReducers({
    categories,
    charities,
    context,
    portal,
    selections,
    vendor,
    routing: routerReducer
});

const store = createStore(
    reducers,
    initialContent,
    applyMiddleware(routerMiddleware(hashHistory), thunkMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={AppRoot}>
                <IndexRoute component={Home}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app-root')
);
