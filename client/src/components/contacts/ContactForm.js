import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../contexts/contact/contactContext';

const ContactForm = () => {

    const { addContact, current, clearCurrent, updateContact } = useContext(ContactContext);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;

    useEffect(() => {
        if(current !== null){
            setContact(current);
        }else{
            setContact({
              name: "",
              email: "",
              phone: "",
              type: "personal",
            });
        }
    }, [current]);

    const onChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(current){
            // update contact
            updateContact(contact);
        }else{
            // add Contact
            addContact(contact);
        }
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        });
    }

    const clearAll = (e) => {
        clearCurrent();
    }

    return (
        <div>
            <form method="post" onSubmit={onSubmit}>
                <h2 className="text-primary">{current ? 'Update' : 'Add'} Contact</h2>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={name} 
                    onChange={onChange} 
                    placeholder="Name"
                />
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={email} 
                    onChange={onChange} 
                    placeholder="Email"
                />
                <input 
                    type="text" 
                    name="phone" 
                    id="phone" 
                    value={phone} 
                    onChange={onChange} 
                    placeholder="Phone"
                />
                <h5>Contact Type</h5>
                <input 
                    type="radio" name="type" id="type" value="personal" checked={type === 'personal'} onChange={onChange}
                /> Personal {' '}
                <input 
                    type="radio" name="type" id="type" value="work" checked={type === 'work'} onChange={onChange}
                /> Work {' '}

                <input type="submit" value={(current ? `Update` : 'Add')+ ' Contact'} className="btn btn-primary btn-block" />

                {current && (
                    <div>
                        <button className="btn btn-block btn-light" onClick={clearAll}>Clear</button>
                    </div>
                )}

            </form>
        </div>
    )
}

export default ContactForm
