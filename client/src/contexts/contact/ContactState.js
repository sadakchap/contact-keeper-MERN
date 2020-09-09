import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import { ADD_CONTACT, UPDATE_CONTACT, SET_CURRENT, CLEAR_CONTACT, FILTER_CONTACTS, DELETE_CONTACT } from '../types';
import uuid from 'uuid';

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
        ]
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    return <ContactContext.Provider value={{contacts: state.contacts}}>
        {props.children}
    </ContactContext.Provider>
}

export default ContactState;
