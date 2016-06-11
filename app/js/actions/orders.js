/**
 * This is used for the donor's completed basket confirmation.
 */
import fetch from 'isomorphic-fetch';
import { normalize } from 'normalizr'

import { APPEND_ORDERS, APPEND_DONATIONS, APPEND_CHARITIES, SET_GIVING_HISTORY } from '../constants/ActionTypes'
import {REQUEST, SUCCESS, ERROR} from '../constants/StateTypes'
import {ORDER_SCHEMA } from '../constants/schemas'

import {setBlockState } from '../actions/blockStates'

const shouldFetchOrder = (state, orderId) => {
    return !state.orders.idList[orderId];
};

export const fetchOrderById = (orderId) => {

    return function (dispatch, getState) {

        if (shouldFetchOrder(getState(), orderId)) {
            return fetch('/ws/donors/' + getState().context.donor.id + '/history/' + orderId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': getState().context.token
                }
            })
                .then((response) => {
                    return response.json()
                })
                .then((json) => {
                    const normalizedJson = normalize(json.data, ORDER_SCHEMA);

                    const charitiesMap = normalizedJson.entities.charities;
                    const charities = [];

                    for (let key in charitiesMap) {
                        charities.push(charitiesMap[key]);
                    }

                    dispatch({
                        type: APPEND_CHARITIES,
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

const shouldFetchOrderHistory = (state, year, offset, limit) => {
    console.log('state.orders.history[year] ' + state.orders.history[year]);
    return state.orders.history[year] === undefined || state.orders.history[year].length == 0
        || state.orders.history[year].pagination === undefined || state.orders.history[year].pagination == null
        || state.orders.history[year].pagination.currentPage != (offset / limit) + 1;
};

export const fetchOrderHistory = (blockId, year = new Date().getFullYear(), offset = 0, limit = 10) => {
    return function (dispatch, getState) {

        if (shouldFetchOrderHistory(getState(), year, offset, limit)) {
            dispatch(setBlockState(blockId, REQUEST));

            var url = "/ws/donors/" + getState().context.donor.id + "/history?year=" + year + "&offset=" + offset + "&limit=" + limit;

            return fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': getState().context.token
                }
            })
                .then(response => response.json())
                .then((json) => {
                    if (json.status === "success") {

                        dispatch({
                            type: APPEND_ORDERS,
                            orders: json.data
                        });
                        dispatch({
                            type: SET_GIVING_HISTORY,
                            orders: json.data,
                            year: year,
                            pagination: json.pagination
                        });

                        dispatch(setBlockState(blockId, SUCCESS));

                    } else {
                        dispatch(setBlockState(blockId, ERROR, json.messages[0]));
                    }
                })
                .catch((error) => {
                    console.log('failed: ' + error);
                    dispatch(setBlockState(blockId, ERROR));
                });

        } else {
            Promise.resolve();
        }
    }
};

