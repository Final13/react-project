import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authentication';
import styles from './Login.module.scss'

class Login extends Component {

    state = {
        email: '',
        password: '',
        errors: {}
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.loginUser(user);
    };

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const {errors} = this.state;
        return(
            <div className={`container ${styles.container}`}>
                <h2 className={styles.loginHeader}>Login</h2>
                <form onSubmit={ this.handleSubmit }>
                    <div className={`form-group`}>
                        <input
                            type="email"
                            placeholder="Email"
                            className={`form-control form-control-lg ${ errors.email && 'is-invalid'}`}
                            name="email"
                            onChange={ this.handleInputChange }
                            value={ this.state.email }
                        />
                        {errors.email && (<div className={`invalid-feedback`}>{errors.email}</div>)}
                    </div>
                    <div className={`form-group`}>
                        <input
                            type="password"
                            placeholder="Password"
                            className={`form-control form-control-lg ${errors.password && 'is-invalid'}`}
                            name="password"
                            onChange={ this.handleInputChange }
                            value={ this.state.password }
                        />
                        {errors.password && (<div className={`invalid-feedback`}>{errors.password}</div>)}
                    </div>
                    <div className={`form-group`}>
                        <button type="submit" className={`btn btn-primary`}>
                            Login User
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export  default connect(mapStateToProps, { loginUser })(Login)