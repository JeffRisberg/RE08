import { SET_BLOCK_STATE } from '../constants/ActionTypes'

export const setBlockState = (blockId, state) => {

    return function (dispatch, getState) {

        dispatch({
                type: SET_BLOCK_STATE,
                blockId: blockId,
                state: state
            }
        );
    };
};