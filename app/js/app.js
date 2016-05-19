import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter'

import categories from './reducers/categories';
import charities from './reducers/charities';
import context from './reducers/context';
import orders from './reducers/orders';
import pageName from './reducers/pageName';
import portal from './reducers/portal';
import selections from './reducers/selections';
import vendor from './reducers/vendor';

import AppRoot from './components/AppRoot.js';
import Page from './components/Page.js';

var initialContent = {
    categories: null,
    charities: {idLists: {}, records: {}},
    context: null,
    orders: {idList: [], records: {}, history: {}},
    pageName: 'Landing',
    portal: null,
    selections: {},
    vendor: null
};

const reducers = combineReducers({
    categories,
    charities,
    context,
    orders,
    pageName,
    portal,
    selections,
    vendor,
    routing: routerReducer
});

//only store the context data for now to keep user logged in when there
//is a hard refresh
const storageEngine = filter(createEngine('justgive'), ['context','orders']);
const storageMiddleware = storage.createMiddleware(storageEngine);

const store = createStore(
    reducers,
    initialContent,
    applyMiddleware(routerMiddleware(hashHistory), thunkMiddleware, storageMiddleware)
);

const load = storage.createLoader(storageEngine);
load(store)
    .then((newState) => {
        ReactDOM.render(
            <Provider store={store}>
                <Router history={hashHistory}>
                    <Route path="/" component={AppRoot}>
                        <IndexRoute component={Page}/>
                    </Route>
                </Router>
            </Provider>,
            document.getElementById('app-root')
        );

    })
    .catch(() => console.log('Failed to load previous state'));

