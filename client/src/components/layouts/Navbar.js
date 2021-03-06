import React,{ Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/auth/authContext';
import ContactContext from '../../contexts/contact/contactContext';


const Navbar = ({ title, icon }) => {

    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const { clearContacts } = useContext(ContactContext);

    const onLogOut = (e) => {
        e.preventDefault();
        logout();
        clearContacts();
    }

    const authLinks = (
        <Fragment>
            <li>Hello, {user && user.name}</li>
            <li>
                <a onClick={onLogOut} href="#!">
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </Fragment>
    );


    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} />
                {title}
            </h1>
            <ul>
                <li><Link to="/about">About</Link></li>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>            
        </div>
    )
}
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}
Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
}

export default Navbar
