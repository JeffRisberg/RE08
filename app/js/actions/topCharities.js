/**
 * This is used for the top charities display area
 */
import fetch from 'isomorphic-fetch';
import { arrayOf, normalize } from 'normalizr'

import { SET_TOP_CHARITIES, APPEND_CURRENT_CHARITIES } from '../constants/ActionTypes'
import {LIST_CHARITY_SCHEMA } from '../constants/schemas'

export const getTopCharities = () => {
    return function (dispatch) {

        return fetch('/ws/topCharities', {})
            .then(response => response.json())
            .then((json) => {

                dispatch({
                        type: SET_TOP_CHARITIES,
                        topCharities: json.data
                    }
                );
                const normalizedJson = normalize({listCharities: json.data}, {listCharities: arrayOf(LIST_CHARITY_SCHEMA)});

                const charitiesMap = normalizedJson.entities.charities;
                const charities = [];

                for (let key in charitiesMap) {
                    charities.push(charitiesMap[key]);
                }

                dispatch({
                        type: APPEND_CURRENT_CHARITIES,
                        charities: normalizedJson.entities.charities
                    }
                );
            });
    };
};
