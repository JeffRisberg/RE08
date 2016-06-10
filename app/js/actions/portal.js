import fetch from 'isomorphic-fetch';

import { SET_PORTAL } from '../constants/ActionTypes'
import { fetchVendor } from '../actions/vendor'

export const fetchPortal = (portalId) => {
    return function (dispatch) {
        return fetch('/ws/portal/' + portalId, {})
            .then(response => response.json())
            .then((json) => {

                dispatch({
                        type: SET_PORTAL,
                        portal: json.data
                    }
                );
                console.log('fetching vendor for portal ' + json.data.id)
                dispatch(fetchVendor(json.data.id));
            });
    };
};
