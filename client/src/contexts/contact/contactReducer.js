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
            return {
              ...state,
              contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact),
              current: null
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };  
        case CLEAR_FILTER:
            return {
                ...state,
                filter: null
            };    
        case FILTER_CONTACTS:
            return {
                ...state,
                filter: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi')
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            };
        default:
            return state;
    }

}

export default contactReducer