import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">
            <Link to='/socket'>Socket page</Link>
        </div>
    )
};

export default Footer;