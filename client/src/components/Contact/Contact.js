import React, { Component } from 'react';
import { connect } from "react-redux";
import styles from './Contact.module.scss';
import { sendMail } from '../../actions/contact'
import PropTypes from "prop-types";

class Contact extends Component {
    state = {
        name: '',
        phone: '',
        email: '',
        website: '',
        message: '',
        errors: {}
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const email = {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            message: this.state.message,
        };
        this.props.sendMail(email);
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

        if(nextProps.work) {
            this.setState({
                work: nextProps.work
            });
        }
    };

    render() {
        const { errors } = this.state;
        return (
            <div className={`container ${styles.container}`}>
                <h2 className={styles.mailHeader}>Send email</h2>
                <form onSubmit={ this.handleSubmit }>
                    <div className={`row`}>
                        <div className={`col-sm-12`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Name:</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className={`form-control ${errors.name && 'is-invalid'}`}
                                    name="name"
                                    onChange={ this.handleInputChange }
                                    value={ this.state.name }
                                />
                                {errors.name && (<div className={`invalid-feedback`}>{errors.name}</div>)}
                            </div>
                        </div>
                        <div className={`col-sm-12`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Phone:</label>
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    className={`form-control ${errors.phone && 'is-invalid'}`}
                                    name="phone"
                                    onChange={ this.handleInputChange }
                                    value={ this.state.phone }
                                />
                                {errors.phone && (<div className={`invalid-feedback`}>{errors.phone}</div>)}
                            </div>
                        </div>
                        <div className={`col-sm-12`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Email:</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className={`form-control ${errors.email && 'is-invalid'}`}
                                    name="email"
                                    onChange={ this.handleInputChange }
                                    value={ this.state.email }
                                />
                                {errors.email && (<div className={`invalid-feedback`}>{errors.email}</div>)}
                            </div>
                        </div>
                        <div className={`col-sm-12`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Message:</label>
                                <textarea
                                    placeholder="Message"
                                    className={`form-control ${errors.message && 'is-invalid'}`}
                                    name="message"
                                    onChange={ this.handleInputChange }
                                    value={ this.state.message }
                                />
                                {errors.message && (<div className={`invalid-feedback`}>{errors.message}</div>)}
                            </div>
                        </div>
                    </div>
                    <div className={`form-group text-right`}>
                        <button type="submit" className={`btn btn-primary btn-lg`}>
                            Send
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

Contact.propTypes = {
    sendMail: PropTypes.func.isRequired,
    errors: PropTypes.object,
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, { sendMail })(Contact);