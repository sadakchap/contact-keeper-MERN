import React, { Fragment, useContext } from 'react';
import ContactContext from '../../contexts/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filter } = contactContext;

    if(contacts.length === 0)
        return (<h1>Please Add Contacts...</h1>);

    return (
      <Fragment>
        {filter !== null
          ? filter.map((contact) => (
              <ContactItem contact={contact} key={contact.id} />
            ))
          : contacts.map((contact) => (
              <ContactItem contact={contact} key={contact.id} />
            ))
        }
      </Fragment>
    );
}

export default Contacts
