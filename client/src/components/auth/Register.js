import React, { useState, useContext } from 'react';
import AlertContext from '../../contexts/alert/alertContext';

const Register = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { setAlert } = useContext(AlertContext);

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(name === '' || email === '' || password === ''){
            setAlert('Please fill in all fields', 'danger');
        }else if(password !== password2){
            setAlert('Password do not match', 'danger');
        }
        console.log('register display');
    }

    const { name, email, password, password2 } = user;

    return (
      <div className="form-container">
        <h1>
          Account <span className="text-primary">Register</span>
        </h1>
        <form method="post" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              required
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Password Confirm</label>
            <input
              type="password"
              name="password2"
              id="password2"
              value={password2}
              onChange={onChange}
              minLength="6"
              required
            />
          </div>
          <input
            type="submit"
            value="Register"
            className="btn btn-primary btn-block"
          />
        </form>
      </div>
    );
}

export default Register