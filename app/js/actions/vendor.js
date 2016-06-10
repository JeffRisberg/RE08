/**
 * This is used for the top charities display area
 */
import fetch from 'isomorphic-fetch';

import { SET_VENDOR } from '../constants/ActionTypes'

export const fetchVendor = (portalId) => {
    return function (dispatch) {

        return fetch('/ws/portal/' + portalId + '/vendor', {})
            .then(response => response.json())
            .then((json) => {

                dispatch({
                        type: SET_VENDOR,
                        vendor: json.data
                    }
                );
            });
    };
};
