import React, { useState, useContext } from 'react';
import ContactContext from '../../contexts/contact/contactContext';

const ContactForm = () => {

    const contactContext = useContext(ContactContext);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;

    const onChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        contactContext.addContact(contact);
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        });
    }

    return (
        <div>
            <form method="post" onSubmit={onSubmit}>
                <h2 className="text-primary">Add Contact</h2>
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
                    type="radio" name="type" id="type" value="personal" checked={type === 'personal'} 
                /> Personal {' '}
                <input 
                    type="radio" name="type" id="type" value="work" checked={type === 'work'}
                /> Work {' '}

            <input type="submit" value="Add Contact" className="btn btn-primary btn-block" />

            </form>
        </div>
    )
}

export default ContactForm
