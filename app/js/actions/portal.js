/**
 * This is used for the portal area
 */
import fetch from 'isomorphic-fetch';

import { SET_PORTAL } from '../constants/ActionTypes'

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
            });
    };
};
