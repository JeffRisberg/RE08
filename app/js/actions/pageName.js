import { SET_PAGE_NAME, SET_SELECTION } from '../constants/ActionTypes'

export const setPage = (pageName) =>  {
    return {
        type: SET_PAGE_NAME,
        pageName: pageName
    }
};

export const displayDonate = (ein) => {
    return function (dispatch, getState) {
        const pageName = 'Donate';
        dispatch({
                type: SET_SELECTION,
                name: pageName,
                value: {ein: ein, donation:null}
            }
        );
        dispatch(setPage(pageName));
    };
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
        dispatch(setPage(pageName));
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
        dispatch(setPage(pageName));
    };
};

export const displaySearchPage = () => {

    return function (dispatch, getState) {

        dispatch(setPage('Search'))
    }
};

export const displayLogin = () => {
    return function (dispatch, getState) {
        dispatch(setPage('Login'))
    }
};

export const displayLanding = () => {
    return function (dispatch, getState) {
        dispatch(setPage('Landing'))
    }
};

export const displayCheckout = () => {
    return function (dispatch, getState) {
        dispatch(setPage('Checkout'))
    }
};

export const displayBasket = () => {
    return function (dispatch, getState) {
        dispatch(setPage('Basket'))
    }
};

export const displayGivingHistory = () => {
    return function (dispatch, getState) {
        dispatch(setPage('GivingHistory'))
    }
};
export const displayConfirmation = (orderId) => {
    return function (dispatch, getState) {
        dispatch({
                type: SET_SELECTION,
                name: 'Confirmation',
                value: orderId
            }
        );
        dispatch(setPage('Confirmation'));
    };
};


