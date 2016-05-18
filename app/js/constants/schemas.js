import { Schema, arrayOf, normalize } from 'normalizr'

export const ORDER_SCHEMA = new Schema('orders')
const DONATION_SCHEMA = new Schema('donations')

ORDER_SCHEMA.define({
    donations: arrayOf(DONATION_SCHEMA)
})

DONATION_SCHEMA.define({
    charity: CHARITY_SCHEMA
})

export const CHARITY_SCHEMA = new Schema('charities', {idAttribute: 'ein'})
export const LIST_CHARITY_SCHEMA = new Schema('listCharities')

LIST_CHARITY_SCHEMA.define({
    charity: CHARITY_SCHEMA
})

export const normalizeCharities = (json) => {

    const normalized = normalize({charities: json}, {charities: arrayOf(CHARITY_SCHEMA)});
    return normalized.entities.charities;
}

