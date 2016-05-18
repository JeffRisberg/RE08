/**
 * This is used for the portal area
 */
import fetch from 'isomorphic-fetch';

import { SET_PORTAL } from '../constants/ActionTypes'

export const fetchPortal = () => {
    return function (dispatch, getState) {

        const portalId = getState().context.portalId;

        return fetch('/ws/portals/' + portalId, {})
            .then(response => response.json())
            .then((json) => {

                dispatch({
                        type: SET_PORTAL,
                        portal: json.data[0]
                    }
                );
            });
    };
};
