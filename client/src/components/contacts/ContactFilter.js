import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../contexts/contact/contactContext';

const ContactFilter = () => {
    const { filterContacts, clearFilter, filter } = useContext(ContactContext);
    const text = useRef('');

    const onChange = (e) => {
        if(text.current.value !== ''){
            filterContacts(e.target.value);
        }else{
            clearFilter();
        }
    }

    useEffect(() => {
        if(filter === ''){
            text.current.value = '';
        }
        
    }, [filter]);

    return (
        <form>
            <input ref={text} type="text" name="text" id="text" placeholder="filter Contacts" onChange={onChange}  />
        </form>
    )
}

export default ContactFilter
