import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={`footer ${styles.footer}`}>
            <div className={`container`}>
                <div className={`row`}>
                    <div className={`col-12`}>
                        <p className={styles.contacts}>
                            Email: <a href="mailto:example@gmail.com">example@gmail.com</a> <br/>
                            Phone: <a href="tel:+123456789">+123456789</a> <br/>
                            Belarus, Minsk
                        </p>
                        <p>Company, 2019</p>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;