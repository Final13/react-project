import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleNavbar } from '../../actions/navbar';
import { logoutUser } from '../../actions/authentication';
import styles from './Header.module.scss';

class Header extends Component {
    onLogout = (e) => {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    };

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {navbarClasses} = this.props.nav;
        const authLinks = (
            <button className={`btn btn-secondary ${styles.logoutBtn}`} onClick={this.onLogout}>
                <img src={user.avatar}
                     alt={user.name}
                     title={user.name}
                     className={`rounded-circle ${styles.logoutImg}`}
                />
                Logout
            </button>
        );

        const guestLinks = (
            <React.Fragment>
                <Link className={styles.register} to="/register">Sign Up</Link>
                <Link className={styles.login} to="/login">Sign In</Link>
            </React.Fragment>
        );

        return (
            <div className={`${styles.header}`}>
                <nav className={`navbar navbar-expand-lg navbar-dark bg-dark`}>
                    <Link to='/' className={`navbar-brand`}>Navbar</Link>
                    <button
                        className={`navbar-toggler`}
                        onClick={ this.props.toggleNavbar }
                        type="button"
                        aria-label="Toggle navigation"
                    >
                        <span className={`navbar-toggler-icon`} />
                    </button>
                    <div className={`collapse navbar-collapse ${navbarClasses}`} id="navbarNavAltMarkup">
                        <div className={`navbar-nav ml-auto`}>
                            <Link className={styles.link} to='/services'>Services</Link>
                            <div className={`d-flex`}>
                                <Link className={styles.link} to='/portfolio'>Portfolio</Link>
                                {
                                    this.props.auth.user.role === 'admin' ?
                                        <React.Fragment>
                                            <Link className={styles.addLink} to='/portfolio-form'>
                                                <i className={`fas fa-plus-circle`} />
                                            </Link>
                                            <Link className={styles.link} to='/contract'>
                                                Contracts
                                            </Link>
                                            <Link className={styles.addLink} to='/contract-form'>
                                                <i className={`fas fa-plus-circle`} />
                                            </Link>
                                        </React.Fragment>
                                        : null
                                }
                            </div>
                            <Link className={styles.link} to='/contacts'>Contacts</Link>
                            {isAuthenticated ? authLinks : guestLinks}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        nav: state.nav
    };
};

export default connect(mapStateToProps, { toggleNavbar, logoutUser })(withRouter(Header));