import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authentication';
import styles from './Register.module.scss';

class Register extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        password_confirm: '',
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        };
        this.props.registerUser(user, this.props.history);
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    };

    render() {
        const { errors } = this.state;
        return(
            <div className={`container ${styles.container}`}>
                <h2 className={styles.regHeader}>Registration</h2>
                <form onSubmit={ this.handleSubmit }>
                    <div className={`form-group`}>
                        <input
                            type="text"
                            placeholder="Name"
                            className={`form-control form-control-lg ${errors.name && 'is-invalid'}`}
                            name="name"
                            onChange={ this.handleInputChange }
                            value={ this.state.name }
                        />
                        {errors.name && (<div className={`invalid-feedback`}>{errors.name}</div>)}
                    </div>
                    <div className={`form-group`}>
                        <input
                            type="email"
                            placeholder="Email"
                            className={`form-control form-control-lg ${errors.email && 'is-invalid'}`}
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
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={`form-control form-control-lg ${errors.password_confirm && 'is-invalid'}`}
                            name="password_confirm"
                            onChange={ this.handleInputChange }
                            value={ this.state.password_confirm }
                        />
                        {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                    </div>
                    <div className={`form-group`}>
                        <button type="submit" className={`btn btn-primary`}>
                            Register User
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register))