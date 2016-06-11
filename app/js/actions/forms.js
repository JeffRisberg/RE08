import { SET_FORM, SET_FORM_FIELD, CLEAR_FORM } from '../constants/ActionTypes'

export const setForm = (name, formData = {}) => {
    return {
        type: SET_FORM,
        formName: name,
        formData: formData
    }
};

export const setFormField = (formName, fieldName, value) => {
    return {
        type: SET_FORM_FIELD,
        formName: formName,
        fieldName: fieldName,
        fieldValue: value
    }
};

export const handleFormFieldChange = (formName, event) => {
    const fieldName = event.target.name;
    const value = (event.target.type === 'checkbox') ? event.target.checked : (event.target.value != null) ? event.target.value.trim() : null;

    console.log("changing " + fieldName + " to " + value);
    return setFormField(formName, fieldName, value);
};


export const clearForm = (name) => {
    return {
        type: SET_FORM,
        formName: name
    }
};

export const submitForm = (event, name, callback) => {
    return function (dispatch, getState) {
        event.preventDefault();

        const form = getState().forms[name];
        for (let fieldName in form) {

            console.log(fieldName + ': ' + form[fieldName])
        }
        callback(form);

        Promise.resolve();
    }
};

