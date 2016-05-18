/**
 * This is used for the donor's completed basket confirmation.
 */
import fetch from 'isomorphic-fetch';
import { normalize } from 'normalizr'

import { APPEND_ORDERS, APPEND_DONATIONS, APPEND_CURRENT_CHARITIES, SET_GIVING_HISTORY } from '../constants/ActionTypes'
import {ORDER_SCHEMA } from '../constants/schemas'

const shouldFetchOrder = (state, orderId) => {
    return !state().orders.idList[orderId];
};

export const queryOrderById = (orderId) => {

    return function (dispatch, getState) {

        if (shouldFetchOrder(getState(), orderId)) {
            return fetch('/ws/donors/' + getState().context.donor.Id + '/history/' + orderId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': getState().context.token
                }
            })
                .then((response) => {
                    console.log('got response: ' + JSON.stringify(response, null, 2))
                    return response.json()
                })
                .then((json) => {
                    console.log('got json: ' + JSON.stringify(json, null, 2))
                    const normalizedJson = normalize(json.data, ORDER_SCHEMA);
                    console.log('normalized json: ' + JSON.stringify(normalizedJson, null, 2))

                    const charitiesMap = normalizedJson.entities.charities;
                    const charities = [];

                    for (let key in charitiesMap) {
                        charities.push(charitiesMap[key]);
                    }

                    dispatch({
                        type: APPEND_CURRENT_CHARITIES,
                        charities: normalizedJson.entities.charities
                    });

                    dispatch({
                        type: APPEND_ORDERS,
                        orders: [json.data]
                    });
                });
        } else {
            Promise.resolve();
        }
    };
};

const shouldFetchOrderHistory = (state, year) => {
    console.log('state.orders.history[year] ' + state.orders.history[year]);
//    console.log('state.orders.history[year].length ' + state.orders.history[year].length);
    return state.orders.history[year] === undefined || state.orders.history[year].length == 0;
}

export const queryOrderHistory = (context, year = new Date().getFullYear()) => {
    return function (dispatch, getState) {

        if (shouldFetchOrderHistory(getState(), year)) {
            var url = "/ws/donors/" + context.donor.id + "/history?year=" + year;

            return fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': context.token
                }
            })
                .then(response => response.json())
                .then((json) => {
                    dispatch({
                        type: APPEND_ORDERS,
                        orders: json.data
                    });
                    dispatch({
                        type: SET_GIVING_HISTORY,
                        orders: json.data,
                        year: year
                    });
                });
        } else {
            Promise.resolve();
        }
    }
};

