/**
 * This is used for login and logout.
 */
import fetch from 'isomorphic-fetch';

import { push } from 'react-router-redux'

import { SET_CONTEXT, CLEAR_CONTEXT, SET_PAGE_NAME, APPEND_ORDERS } from '../constants/ActionTypes'

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
        console.log('raw context: ' + JSON.stringify(data))
        const order = Object.assign({}, data.order);
        if (data.order != null && data.order != undefined) {
            delete order['activeItem'];
            dispatch({
                    type: APPEND_ORDERS,
                    orders: [order]
                }
            );
        }

        const context = Object.assign({}, data)
        if (data.order != null && data.order != undefined) {
            content.orderId = data.order.id;
        }
        delete context['order'];
        dispatch({
                type: SET_CONTEXT,
                context: context
            }
        );
    }
}

export const toLogin = () => {
    return function (dispatch, getState) {
        dispatch({
                type: SET_PAGE_NAME,
                pageName: 'Login'
            }
        );
    };
};

export const login = (login, password) => {
    return function (dispatch, getState) {

        console.log('logging in ' + login);
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
                dispatch(setContext(json.data));

                dispatch({
                        type: SET_PAGE_NAME,
                        pageName: 'Landing'
                    }
                );
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
                dispatch(setContext(json.data))

                afterDonation(json.data.order.activeItem.donation, dispatch);
            });
    };
};

function afterDonation(donation, dispatch) {
    if (donation && donation.gift) {
        console.log('donation ' + donation.id + ' gift: ' + JSON.stringify(donation.gift));
        console.log('forwarding to gift');
        dispatch(push('/giftMessage/' + donation.id));
    } else {
        console.log('forwarding to basket');
        dispatch(push('/basket'));
    }
}

export const updateDonation = (id, formData) => {
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
                dispatch(push('/basket'));
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
            .then(response => {
                console.log('donations ' + donationIds + ' added');
                dispatch(setContext(json.data))
                dispatch(push('/basket'));
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

export const checkout = (formData) => {
    return function (dispatch, getState) {

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
                var nextUrl = '/confirmation/' + getState().context.orderId;

                dispatch(setContext(json.data))

                dispatch(push(nextUrl));
            });
    };
};

