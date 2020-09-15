import { GET_CONTACTS ,ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, SET_CURRENT, CLEAR_CURRENT, FILTER_CONTACTS, CLEAR_FILTER, CONTACT_ERROR, CLEAR_CONTACTS } from '../types';

const contactReducer = (state, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false,
            };
        case ADD_CONTACT:
            return { 
                ...state,
                contacts: [action.payload, ...state.contacts],
                loading: false
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload),
                loading: false
            };
        case UPDATE_CONTACT:
            return {
              ...state,
              contacts: state.contacts.map((contact) =>
                contact._id === action.payload._id
                  ? action.payload
                  : contact
              ),
              current: null,
              loading: false,
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
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_CONTACTS:
            return {
              ...state,
              contacts: null,
              current: null,
              filter: null,
              loading: true,
            };
        default:
            return state;
    }

}

export default contactReducer