import React, { Fragment, useContext, useEffect } from 'react';
import ContactContext from '../../contexts/contact/contactContext';
import ContactItem from './ContactItem';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Spinner from '../layouts/Spinner';


const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filter, getContacts, loading } = contactContext;

    useEffect(() => {
      getContacts();
      // eslint-disable-next-line
    }, []);

    if(contacts !== null && contacts.length === 0 && !loading)
        return (<h5 className="lead">Please Add Contacts...</h5>);

    return (
      <Fragment>
        {contacts !== null && !loading ? (
          <TransitionGroup>
            {filter !== null
              ? filter.map((contact) => (
                  <CSSTransition
                    key={contact._id}
                    timeout={500}
                    classNames="item"
                  >
                    <ContactItem contact={contact} />
                  </CSSTransition>
                ))
              : contacts.map((contact) => (
                  <CSSTransition
                    key={contact._id}
                    timeout={500}
                    classNames="item"
                  >
                    <ContactItem contact={contact} />
                  </CSSTransition>
                ))}
          </TransitionGroup>
        ) : (
          <Spinner />
        )}
      </Fragment>
    );
}

export default Contacts
