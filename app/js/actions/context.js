/**
 * This is used for login and logout.
 */
import fetch from 'isomorphic-fetch';

import { push } from 'react-router-redux'

import { SET_CONTEXT, CLEAR_CONTEXT } from '../constants/ActionTypes'

export const fetchContext = (pathname) => {
    return function (dispatch, getState) {

        if (pathname === '') pathname = "justgive";
        var token = (getState().context == null) ? '' : getState().context.token;
        return fetch('/ws/contexts/' + pathname, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
            .then(response => response.json())
            .then((json) => {
                dispatch({
                    type: SET_CONTEXT,
                    context: json.data
                });
            });
    };
};

export const login = (login, password) => {
    return function (dispatch) {

        return fetch('/ws/donors/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            contentType: "application/json",
            dataType: 'json',
            body: JSON.stringify({login: login, password: password})
        })
            .then(response => response.json())
            .then((json) => {
                dispatch({
                        type: SET_DONOR,
                        donor: json.data
                    }
                );
                dispatch(push("/"));
            });
    };
};

export const logout = (token) => {
    return function (dispatch) {

        return fetch('/ws/donors/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
            .then((response) => {
                console.log('logged out');
                dispatch({
                        type: CLEAR_DONOR,
                        donor: null
                    }
                );
            });
    };
};

