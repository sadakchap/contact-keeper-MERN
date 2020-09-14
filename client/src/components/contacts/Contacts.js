import React, { Fragment, useContext } from 'react';
import ContactContext from '../../contexts/contact/contactContext';
import ContactItem from './ContactItem';
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filter } = contactContext;

    if(contacts.length === 0)
        return (<h5 className="lead">Please Add Contacts...</h5>);

    return (
      <Fragment>
        <TransitionGroup>
          {filter !== null
            ? filter.map((contact) => (
                <CSSTransition key={contact._id} timeout={500} classNames="item">
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map((contact) => (
                <CSSTransition key={contact._id} timeout={500} classNames="item">
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      </Fragment>
    );
}

export default Contacts
