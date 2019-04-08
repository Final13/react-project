import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Contact.module.scss';
import { sendMail } from '../../actions/contact'
import EmailForm from './EmailForm';

class Contact extends Component {
    render() {
        return (
            <div className={`container ${styles.container}`}>
                <h2 className={styles.contactHeader}>Contact Us</h2>
                <div className={`row ${styles.info}`}>
                    <div className={`col-6`}>
                        <div className={`row`}>
                            <div className={`col-12 ${styles.infoBlock}`}>
                                <h4>Example Ltd.</h4>
                            </div>
                            <div className={`col-12 ${styles.infoBlock}`}>
                                <i className={`fas fa-map-marker-alt pr-3`} />
                                <span>Minsk, Belarus</span>
                            </div>
                            <div className={`col-12 ${styles.infoBlock}`}>
                                <i className={`fas fa-phone pr-3`} />
                                <a className={styles.customLink} href="tel:+375(29)175-21-14">123456</a>
                            </div>
                            <div className={`col-12 ${styles.infoBlock}`}>
                                <i className={`fas fa-envelope pr-3`} />
                                <a className={styles.customLink} href="mailto:example@gmail.com">example@gmail.com</a>
                            </div>
                        </div>
                    </div>
                    <div className={`col-6`}>
                        <EmailForm />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { sendMail })(Contact);