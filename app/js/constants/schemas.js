import { Schema, arrayOf, normalize } from 'normalizr'

export const ORDER_SCHEMA = new Schema('orders')
const DONATION_SCHEMA = new Schema('donations')
export const CHARITY_SCHEMA = new Schema('charities', {idAttribute: 'ein'})
export const LIST_CHARITY_SCHEMA = new Schema('listCharities')
export const CONTEXT_SCHEMA = new Schema('context', {idAttribute: 'token'})

ORDER_SCHEMA.define({
    donations: arrayOf(DONATION_SCHEMA)
})

DONATION_SCHEMA.define({
    charity: CHARITY_SCHEMA
})


LIST_CHARITY_SCHEMA.define({
    charity: CHARITY_SCHEMA
})

export const normalizeCharities = (json) => {

    const normalized = normalize({charities: json}, {charities: arrayOf(CHARITY_SCHEMA)});
    return normalized.entities.charities;
}

export const normalizeContext = (json) => {

    console.log(JSON.stringify({context: json}, null, 2))
    const normalized = normalize({context: json}, CONTEXT_SCHEMA);
    console.log(JSON.stringify(normalized, null, 2))
    return normalized.entities.context;
}

