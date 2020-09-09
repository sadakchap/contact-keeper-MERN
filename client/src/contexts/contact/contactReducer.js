import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, SET_CURRENT, CLEAR_CURRENT, FILTER_CONTACTS, CLEAR_FILTER } from '../types';

const contactReducer = (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return { 
                ...state,
                contacts: [...state.contacts, action.payload] 
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            };
        case UPDATE_CONTACT:
            return ;
        case SET_CURRENT:
            return;    
        default:
            return state;
    }

}

export default contactReducer