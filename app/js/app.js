import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger';
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter'

import blockStates from './reducers/blockStates';
import orders from './reducers/orders';
import categories from './reducers/categories';
import charities from './reducers/charities';
import context from './reducers/context';
import vendor from './reducers/vendor';
import portal from './reducers/portal';
import topCharities from './reducers/topCharities';
import pageName from './reducers/pageName';
import selections from './reducers/selections';
import forms from './reducers/forms';

import AppRoot from './components/AppRoot.js';
import Page from './components/Page.js';

import {SET_CONTEXT, CLEAR_CONTEXT} from './constants/ActionTypes.js';

var initialContent = {
    blockStates: {},
    categories: null,
    charities: {
        idLists: {},
        records: {},
        searchResults: {charityEins: null, pagination: null, loading: false, error: null}
    },
    context: null,
    forms: {},
    topCharities: {idList: [], records: {}, loading: false, error: null},
    orders: {idList: [], records: {}, history: {}},
    pageName: 'Landing',
    portal: null,
    selections: {},
    vendor: null
};

const reducers = combineReducers({
    blockStates,
    categories,
    charities,
    context,
    forms,
    topCharities,
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

const logger = createLogger();
const store = createStore(
    reducers,
    initialContent,
    applyMiddleware(routerMiddleware(hashHistory), thunkMiddleware, logger, storageMiddleware)
);

const load = storage.createLoader(storageEngine);
load(store)
    .then((newState) => {
        ReactDOM.render(
            <Provider store={store}>
                <Router history={hashHistory}>
                    <Route path="/" component={AppRoot}>
                        <IndexRoute component={Page}/>
                        <Route path="page/:name" component={Page}/>
                    </Route>
                </Router>
            </Provider>,
            document.getElementById('app-root')
        );
    })
    .catch((error) => console.log('Failed to load previous state: ' + error));
