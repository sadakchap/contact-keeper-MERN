import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import { 
  GET_CONTACTS,
  CLEAR_CONTACTS,
  ADD_CONTACT, 
  UPDATE_CONTACT, 
  SET_CURRENT, 
  CLEAR_CURRENT, 
  FILTER_CONTACTS, 
  DELETE_CONTACT, 
  CLEAR_FILTER, 
  CONTACT_ERROR 
} from '../types';
import axios from 'axios';

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filter: null,
    loading: true
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contact');
      dispatch({ type: GET_CONTACTS, payload: res.data.contacts });
    } catch (err) {
      console.log(err);
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  }

  // Add Contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/contact', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });  
    }
  };
  // Delete Contact
  const deleteContact = async (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      await axios.delete(`/api/contact/${id}`, config);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Set Current
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // CLEAR Current
  const clearCurrent = (id) => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update Contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put(`/api/contact/${contact.id}`, contact, config);
      dispatch({ type: UPDATE_CONTACT, payload: res.data.contact });
    } catch (err) {
      
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Filter Contact
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // CLEAR Filter
  const clearFilter = (id) => {
    dispatch({ type: CLEAR_FILTER });
  };

  // clear contacts
  const clearContacts = () => dispatch({ type: CLEAR_CONTACTS });

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filter: state.filter,
        getContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
}

export default ContactState;
