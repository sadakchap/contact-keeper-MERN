import React, { Fragment, useContext } from 'react';
import ContactContext from '../../contexts/contact/contactContext';
import ContactItem from './ContactItem';
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filter } = contactContext;

    if(contacts.length === 0)
        return (<h1>Please Add Contacts...</h1>);

    return (
      <Fragment>
        <TransitionGroup>
          {filter !== null
            ? filter.map((contact) => (
                <CSSTransition key={contact.id} timeout={500} classNames="item">
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map((contact) => (
                <CSSTransition key={contact.id} timeout={500} classNames="item">
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      </Fragment>
    );
}

export default Contacts
