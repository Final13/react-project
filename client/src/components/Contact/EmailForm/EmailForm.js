import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './EmailForm.module.scss';
import { sendMail } from '../../../actions/contact';
import PropTypes from 'prop-types';
import State from '../../../reducers/state.js';

class EmailForm extends Component {
    state = {
        mail: State.mail(),
        errors: {}
    };

    handleInputChange = (e) => {
        const mail = {...this.state.mail};
        mail[e.target.name] = e.target.value;
        this.setState({
            mail: mail
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.sendMail(this.state.mail, this.props.history);
    };

    componentWillReceiveProps(nextProps, ) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    render() {
        const { errors, mail } = this.state;
        return (
            <React.Fragment>
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
                                    value={ mail.name }
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
                                    value={ mail.phone }
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
                                    value={ mail.email }
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
                                    value={ mail.message }
                                />
                                {errors.message && (<div className={`invalid-feedback`}>{errors.message}</div>)}
                            </div>
                        </div>
                    </div>
                    <div className={`form-group text-right`}>
                        <button type="submit" className={`btn btn-primary btn-lg`}>
                            Send Email
                        </button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

EmailForm.propTypes = {
    sendMail: PropTypes.func.isRequired,
    errors: PropTypes.object,
};

const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps, { sendMail })(withRouter(EmailForm));