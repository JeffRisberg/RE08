import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import categories from './reducers/categories';
import currentCharities from './reducers/currentCharities';
import context from './reducers/context';
import portal from './reducers/portal';
import selections from './reducers/selections';
import topCharities from './reducers/topCharities';
import vendor from './reducers/vendor';

import AppRoot from './components/AppRoot.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import CharityList from './components/CharityList.js';
import DonationList from './components/DonationList.js';

var initialContent = {
    categories: {idList: [], records: {}, selected: null},
    currentCharities: {idList: [], records: {}, searchResults: {charityEins: [], pagination: null}},
    context: null,
    portal: null,
    selections: {},
    topCharities: {idList: [], records: {}},
    vendor: null
};

const reducers = combineReducers({
    categories,
    currentCharities,
    context,
    portal,
    selections,
    topCharities,
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
                <Route path="login" component={Login}/>
                <Route path="charityList" component={CharityList}/>
                <Route path="DonationList" component={DonationList}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app-root')
);
