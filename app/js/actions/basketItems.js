/**
 * This is used for the donor's current basket.
 */
import fetch from 'isomorphic-fetch';
import { APPEND_ORDERS, SET_CONTEXT } from '../constants/ActionTypes'

import { push } from 'react-router-redux'

export const fetchContext = () => {
    return function (dispatch, getState) {

        var token = (getState().context == null) ? '' : getState().context.token;
        return fetch('/ws/basket/context', {
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

export const queryBasket = () => {
    return function (dispatch, getState) {

        return fetch('/ws/basket', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': getState().context.token
            }
        })
            .then(response => response.json())
            .then((json) => {
                dispatch({
                    type: APPEND_ORDERS,
                    orders: [json.data]
                });
            });
    };
};

export const addToBasket = (formData, ein) => {
    return function (dispatch, getState) {

        console.log('adding donation: ' + JSON.stringify(formData))
        return fetch('/ws/basket/donations/' + ein, {
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
                dispatch(queryBasket()).then(() => {
                        afterDonation(json.data, dispatch);
                    }
                )
            });
    };
};

function afterDonation(donation, dispatch) {
    console.log('donation ' + donation.id + ' gift: ' + JSON.stringify(donation.gift));
    if (donation.gift) {
        console.log('forwarding to gift');
        dispatch(push('/giftMessage/' + donation.id));
    } else {
        console.log('forwarding to basket');
        dispatch(push('/basket'));
    }
}

export const updateDonation = (id, formData) => {
    return function (dispatch, getState) {

        return fetch('/ws/basket/donations/' + id, {
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
                afterDonation(json.data, dispatch);
            });
    };
};

export const updateGift = (donationId, giftId, formData) => {
    return function (dispatch, getState) {

        console.log('updating donation ' + donationId + ' gift ' + giftId);
        return fetch('/ws/basket/donations/' + donationId + '/gift/' + giftId, {
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
                dispatch(push('/basket'));
            });
    };
};

export const removeDonation = (donationId) => {
    return function (dispatch, getState) {

        return fetch("/ws/basket/donations/" + donationId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': getState().context.token
            }
        })
            .then(response => {
                console.log('donation ' + donationId + ' removed');
                dispatch(queryBasket());
            })
    };
};

export const addDonationHistory = (donationIds) => {
    return function (dispatch, getState) {

        return fetch("/ws/basket/donations/history", {
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
                dispatch(push('/basket'));
            })
    };
};

export const clearBasket = (token) => {
    return function (dispatch, getState) {

        return fetch('/ws/basket/clear', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': getState().context.token
            }
        })
            .then(response => response.json())
            .then((json) => {
                dispatch({
                    type: APPEND_ORDERS,
                    orders: [json.data]
                });
            });
    };
};

export const checkout = (formData) => {
    return function (dispatch, getState) {

        return fetch('/ws/basket/checkout', {
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

                dispatch({
                    type: SET_CONTEXT,
                    context: json.data
                });

                dispatch(push(nextUrl));
            });
    };
};

