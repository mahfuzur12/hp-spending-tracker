import React from 'react';
import { Link, useContext } from 'react-router-dom'
import { UserContext } from '../App';

const Navbar = () => {

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Spending tracker</h1>
                </Link>
                <nav>
                    <div>
                        <Link to="/signin">Signin</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Navbar