import { SET_PAGE_NAME } from '../constants/ActionTypes'

export const setPageName = (name) => {

    return function (dispatch, getState) {

        dispatch({
                type: SET_PAGE_NAME,
                name: name
            }
        );
    };
};