import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import { ADD_CONTACT, UPDATE_CONTACT, SET_CURRENT, CLEAR_CURRENT, FILTER_CONTACTS, DELETE_CONTACT } from '../types';
import { v4 as uuidv4 } from 'uuid';

const ContactState = (props) => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Kani Shete',
                email: 'kani26@gmail.com',
                phone: '903-214-2567',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Aayush Manker',
                email: 'aayush@gmail.com',
                phone: '123-214-2567',
                type: 'work'
            },
            {
                id: 3,
                name: 'Tanay Pratap',
                email: 'tanaypratap@gmail.com',
                phone: '903-214-4678',
                type: 'personal'
            }
        ],
        current: null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add Contact
    const addContact = (contact) => {
        contact.id = uuidv4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    }
    // Delete Contact
    const deleteContact = (id) => {
        dispatch({ type: DELETE_CONTACT, payload: id})
    }

    // Set Current
    const setCurrent = (contact) => {
        dispatch({type: SET_CURRENT, payload: contact});
    }

    // CLEAR Current
    const clearCurrent = (id) => {
        dispatch({type: CLEAR_CURRENT });
    }

    return <ContactContext.Provider value={{
        contacts: state.contacts, 
        current: state.current,
        addContact, 
        deleteContact, 
        setCurrent,
        clearCurrent,
    }}>
        {props.children}
    </ContactContext.Provider>
}

export default ContactState;
