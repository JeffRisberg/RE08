import { APPEND_ORDERS, SET_GIVING_HISTORY } from '../constants/ActionTypes'

const orders = (state = [], action = {}) => {
    switch (action.type) {
        case APPEND_ORDERS:
        {
            const updatedState = Object.assign({}, state);

            action.orders.forEach(order => {
                const id = order.id;
                console.log(JSON.stringify(order, null, 2))
                console.log('order ID ' + id)

                if (updatedState.idList.indexOf(id) < 0) {
                    updatedState.idList.push(id);
                    console.log('added ' + id + ' to orders.idList')
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

            var updatedState = Object.assign({}, state, {history: {[action.year]: {idList: idList}}});
            console.log('set giving history: ' + JSON.stringify(updatedState, null, 2))
            return updatedState;
        }
        default:
            return state;
    }
};


export default orders;
