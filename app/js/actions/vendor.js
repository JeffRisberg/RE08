/**
 * This is used for the vendor area
 */
import fetch from 'isomorphic-fetch';

import { SET_VENDOR } from '../constants/ActionTypes'

export const fetchVendor = (vendorId) => {
    return function (dispatch) {

        return fetch('/ws/vendor/' + vendorId, {})
            .then(response => response.json())
            .then((json) => {

                console.log('fetched vendor ' + JSON.stringify(json.data, null, 2))

                dispatch({
                        type: SET_VENDOR,
                        vendor: json.data
                    }
                );
            });
    };
};
