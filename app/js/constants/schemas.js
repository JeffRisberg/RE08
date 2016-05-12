import { Schema, arrayOf } from 'normalizr'

/*
export const ORDER_SCHEMA = new Schema('orders')
export const DONATION_SCHEMA = new Schema('donations')

ORDER_SCHEMA.define({
    donations: arrayOf(DONATION_SCHEMA)
})

DONATION_SCHEMA.define({
    charity: CHARITY_SCHEMA
})
*/
export const CHARITY_SCHEMA = new Schema('charities', {idAttribute: 'ein'})
export const LIST_CHARITY_SCHEMA = new Schema('listCharities')

LIST_CHARITY_SCHEMA.define({
    charity: CHARITY_SCHEMA
})

