/**
 * Implements almost all user-related activity, such as login, logout, donate, view order history, checkout.
 */
import fetch from 'isomorphic-fetch';

import {setBlockState } from '../actions/blockStates'
import {displayBasket, displayConfirmation, displayGift, displayLanding } from '../actions/pageName'

import { SET_SELECTION, SET_PAGE_NAME, SET_CONTEXT, CLEAR_CONTEXT, APPEND_ORDERS } from '../constants/ActionTypes'
import { SUCCESS, ERROR, REQUEST } from '../constants/StateTypes'

export const getDonation = (donationId) => {
    return function (dispatch, getState) {
        const state = getState();
        const order = state.orders.records[state.context.orderId];
        console.log('props.params.donationId: ' + donationId)
        return order.donations.find((donation) => {
            if (donation.id == donationId) {
                return donation;
            }
        })
    }
};

export const fetchContext = () => {
    return function (dispatch, getState) {

        var token = (getState().context == null) ? '' : getState().context.token;
        return fetch('/ws/context/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
            .then(response => response.json())
            .then((json) => {
                dispatch(setContext(json.data));
            });
    };
};

export const setContext = (data) => {
    return function (dispatch, getState) {

        const order = Object.assign({}, data.order);
        delete order['activeItem'];
        dispatch({
                type: APPEND_ORDERS,
                orders: [order]
            }
        );

        const context = Object.assign({}, data, {orderId: data.order.id})
        delete context['order'];
        dispatch({
                type: SET_CONTEXT,
                context: context
            }
        );
    }
};

export const login = (blockId, login, password) => {
    return function (dispatch, getState) {

        console.log('logging in ' + login);

        dispatch(setBlockState(blockId, REQUEST));

        return fetch('/ws/context/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': getState().context.token
            },
            contentType: "application/json",
            dataType: 'json',
            body: JSON.stringify({login: login, password: password})
        })
            .then(response => response.json())
            .then((json) => {
                if (json.status === "success") {
                    dispatch(setContext(json.data));
                    dispatch(setBlockState(blockId, SUCCESS));
                    dispatch(displayLanding());
                } else {
                    dispatch(setBlockState(blockId, ERROR, json.messages[0]));
                }
            })
            .catch((error) => {
                console.log('failed: ' + error);
                dispatch(setBlockState(blockId, ERROR, error));
            });
    };
};

export const loginNewAccount = (blockId, formData) => {
    return function (dispatch, getState) {

        dispatch(setBlockState(blockId, REQUEST));

        console.log('logging in ' + formData.login);
        return fetch('/ws/context/loginNewAccount', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': getState().context.token
            },
            contentType: "application/json",
            dataType: 'json',
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then((json) => {
                if (json.status === "success") {
                    dispatch(setContext(json.data));
                    dispatch(setBlockState(blockId, SUCCESS));
                    dispatch(displayLanding());
                } else {
                    dispatch(setBlockState(blockId, ERROR, json.messages[0]));
                }
            })
            .catch((error) => {
                console.log('failed: ' + error);
                dispatch(setBlockState(blockId, ERROR, error));
            });
    };
};

export const logout = () => {
    return function (dispatch, getState) {

        return fetch('/ws/context/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': getState().context.token
            }
        })
            .then(response => response.json())
            .then((json) => {
                console.log('logged out');
                dispatch(setContext(json.data));
            });
    };
};

export const addDonation = (formData, ein) => {
    return function (dispatch, getState) {

        console.log('adding donation: ' + JSON.stringify(formData))

        return fetch('/ws/context/donations/' + ein, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': getState().context.token
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then((json) => {
                dispatch(setContext(json.data));

                afterDonation(json.data.order.activeItem.donation, dispatch);
            });
    };
};

function afterDonation(donation, dispatch) {
    if (donation && donation.gift) {
        console.log('donation ' + donation.id + ' gift: ' + JSON.stringify(donation.gift));
        console.log('forwarding to gift');
        dispatch(displayGift(donation));
    } else {
        console.log('forwarding to basket');
        dispatch(displayBasket());
    }
}

export const updateDonation = (formData, id) => {
    return function (dispatch, getState) {

        return fetch('/ws/context/donations/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': getState().context.token
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then((json) => {
                dispatch(setContext(json.data))
                afterDonation(json.data.order.activeItem.donation, dispatch);
            });
    };
};

export const updateGift = (donationId, giftId, formData) => {
    return function (dispatch, getState) {

        console.log('updating donation ' + donationId + ' gift ' + giftId);
        return fetch('/ws/context/donations/' + donationId + '/gift/' + giftId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': getState().context.token
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then((json) => {
                dispatch(setContext(json.data))
                dispatch(displayBasket());
            });
    };
};

export const removeDonation = (donationId) => {
    return function (dispatch, getState) {

        return fetch("/ws/context/donations/" + donationId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': getState().context.token
            }
        })
            .then(response => response.json())
            .then((json) => {
                console.log('donation ' + donationId + ' removed');
                dispatch(setContext(json.data));
            })
    };
};

export const addDonationHistory = (donationIds) => {
    return function (dispatch, getState) {

        return fetch("/ws/context/donations/history", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': getState().context.token
            },
            body: JSON.stringify(donationIds)
        })
            .then(response => response.json())
            .then((json) => {
                console.log('donations ' + donationIds + ' added');
                dispatch(setContext(json.data))
                dispatch(displayBasket());
            })
    };
};

export const clearBasket = (token) => {
    return function (dispatch, getState) {

        return fetch('/ws/context/clear', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': getState().context.token
            }
        })
            .then(response => response.json())
            .then((json) => {
                dispatch(setContext(json.data))
            });
    };
};

export const checkout = (event, formData) => {
    return function (dispatch, getState) {
        event.preventDefault();

        return fetch('/ws/context/checkout', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': getState().context.token
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())

            .then((json) => {
                var confOrderId = getState().context.orderId;

                dispatch(setContext(json.data));

                dispatch(displayConfirmation(confOrderId));
            });
    };
};

