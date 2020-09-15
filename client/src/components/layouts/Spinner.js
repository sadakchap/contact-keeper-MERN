import { header } from 'express-validator';
import React, { Fragment } from 'react';
import spinner from './loader.gif';

const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner} alt="Spinner" style={{ width: '50px', margin: '0 auto', display: 'block'}} />
        </Fragment>
    )
}

export default Spinner
