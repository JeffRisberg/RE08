import { push } from 'react-router-redux'

import { SET_PAGE_NAME, SET_SELECTION } from '../constants/ActionTypes'

export const setPage = (pageName = 'Landing') => {
    return function (dispatch, getState) {
        if (pageName === getState().pageName) {
            console.log('pageName ' + pageName + ' not changed')
            Promise.resolve();
        } else {
            console.log('pageName ' + getState().pageName + ' changed to ' + pageName)
            dispatch({
                type: SET_PAGE_NAME,
                pageName: pageName
            });
        }
    }
};

export const displayDonate = (ein) => {
    return function (dispatch, getState) {
        const pageName = 'Donate';
        dispatch({
                type: SET_SELECTION,
                name: pageName,
                value: {ein: ein, donation: null}
            }
        );
        dispatch(displayPage(pageName));
    };
};

export const displayPage = (pageName) => {
    return function (dispatch, getState) {
        dispatch(setPage(pageName));
        dispatch(push('/' + pageName));
    }
};

export const displayUpdateDonation = (donation) => {
    return function (dispatch, getState) {
        const pageName = 'Donate';
        dispatch({
                type: SET_SELECTION,
                name: pageName,
                value: {ein: donation.charity.ein, donation: donation}
            }
        );
        dispatch(displayPage(pageName));
    };
};

export const displayGift = (donation) => {
    return function (dispatch) {
        const pageName = 'Gift';
        dispatch({
                type: SET_SELECTION,
                name: pageName,
                value: donation
            }
        );
        dispatch(displayPage(pageName));
    };
};

export const displaySearchPage = () => {

    return function (dispatch, getState) {

        dispatch(displayPage('Search'));
    }
};

export const displayLogin = () => {
    return function (dispatch, getState) {
        dispatch(displayPage('Login'));
    }
};

export const displayLanding = () => {
    return function (dispatch, getState) {
        dispatch(displayPage('Landing'));
    }
};

export const displayCheckout = () => {
    return function (dispatch, getState) {
        dispatch(displayPage('Checkout'));
    }
};

export const displayBasket = () => {
    return function (dispatch, getState) {
        dispatch(displayPage('Basket'));
    }
};

export const displayGivingHistory = () => {
    return function (dispatch, getState) {
        dispatch(displayPage('GivingHistory'));
    }
};
export const displayConfirmation = (orderId) => {
    return function (dispatch, getState) {
        var pageName = 'Confirmation';
        dispatch({
                type: SET_SELECTION,
                name: pageName,
                value: orderId
            }
        );
        console.log('selections ' + JSON.stringify(getState().selections, null, 2))
        dispatch(displayPage(pageName));
    };
};


