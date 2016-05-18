import { SET_GIVING_HISTORY } from '../constants/ActionTypes'

const orderHistory = (state = [], action = {}) => {
    switch (action.type) {
        case SET_GIVING_HISTORY: // clear prior giving history
        {
            const idList = [];

            action.orders.forEach(record => {
                idList.push(record.donationId);
            });

            return Object.assign({}, state, {[action.year]: idList});
        }
        default:
            return state;
    }
};

export default orderHistory;
