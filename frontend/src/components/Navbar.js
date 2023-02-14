import React,{useContext} from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../App';

const Navbar = () => {
    const {state,dispatch} = useContext(UserContext)
    const renderList = ()=>{
        if(state){
            //logout
            return [
                <li><Link to="/signin">Signin</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
        else{
            return [
                <li><Link to="/signin">Signin</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }

    return (
        <header>
            <div className="container">
                <Link to={state?"/":"/signin"}>
                    <h1>Spending tracker</h1>
                </Link>
                <nav>
                    <div>
                        {renderList()}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Navbar