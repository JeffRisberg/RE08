/**
 * This is used for the fundraiser display area
 */
import fetch from 'isomorphic-fetch';

import { FETCH_FUNDRAISERS } from '../constants/ActionTypes'

export const fetchFundraisers = () => {
    return function (dispatch) {
        return fetch('/ws/fundraiser/', {})
            .then(response => response.json())
            .then((json) => {

                dispatch({
                        type: FETCH_FUNDRAISERS,
                        fundraisers: json.data
                    }
                );
            });
    };
};
