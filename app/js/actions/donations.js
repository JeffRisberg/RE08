import fetch from 'isomorphic-fetch';

import { SET_DONATIONS } from '../constants/ActionTypes'

export const getDonations = () => {
    return function (dispatch, getState) {

        return fetch('/ws/donations', {})
            .then(response => response.json())
            .then((json) => {

                dispatch({
                    type: SET_DONATIONS,
                    categories: json.data
                });
            });
    }
};