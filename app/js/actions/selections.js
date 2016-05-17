
import { SET_SELECTION } from '../constants/ActionTypes'

export const setSelection = (name, value) => {

    return function (dispatch, getState) {

        dispatch({
                type: SET_SELECTION,
                name: name,
                value: value
            }
        );
    };
};