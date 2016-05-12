/**
 * This is used for the vendor area
 */
import fetch from 'isomorphic-fetch';

import { SET_VENDOR } from '../constants/ActionTypes'

export const fetchVendor = () => {
    return function (dispatch, getState) {

        const vendorId = getState().context.vendorId;

        return fetch('/ws/vendors/' + vendorId, {})
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
