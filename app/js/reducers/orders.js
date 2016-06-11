import { APPEND_ORDERS, SET_GIVING_HISTORY } from '../constants/ActionTypes'

const orders = (state = [], action = {}) => {
    switch (action.type) {
        case APPEND_ORDERS:
        {
            const updatedState = Object.assign({}, state);

            action.orders.forEach(order => {
                const id = order.id;

                if (updatedState.idList.indexOf(id) < 0) {
                    updatedState.idList.push(id);
                }
                updatedState.records[id] = order;
            });
            return updatedState;
        }
        case SET_GIVING_HISTORY:
        {
            const idList = [];

            action.orders.forEach(order => {
                idList.push(order.id);
            });

            return Object.assign({}, state, {history: {[action.year]: {idList: idList, pagination: action.pagination}}});
        }
        default:
            return state;
    }
};


export default orders;
