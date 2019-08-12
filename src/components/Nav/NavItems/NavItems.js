import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import classes from './NavItems.css';
import { connect } from 'react-redux';

const MyLink = props => <NavLink exact {...props} />

const navItems = props => {

    // Initialize classes array - there will be NavUl class for every case
    let navClasses = [classes.NavUl];

    // Add MobileNav if it's a mobile menu
    if(props.mobileNav) {
        navClasses.push(classes.MobileNav);
    }

    return (
        <ul className={navClasses.join(' ')}>
            <li><Button onClick={props.onLinkClick} component={MyLink} to='/' color="inherit">Squad Builder</Button></li>
            {props.isLoggedIn ? <li><Button onClick={props.onLinkClick} component={MyLink} to='/my-squads' color="inherit">My Squads</Button></li> : null}
            {props.isLoggedIn ? <li><Button onClick={props.onLinkClick} component={MyLink} to='/logout' color="inherit">Logout</Button></li> : <li><Button onClick={props.onLinkClick} component={MyLink} to='sign-in' color="inherit">Sign In</Button></li>}
        </ul>
    );
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(navItems);