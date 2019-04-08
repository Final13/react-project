import React from 'react';
import {Link} from 'react-router-dom';
import styles from './ErrorPage.module.scss'

const ErrorPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={`w-100 ${styles.header}`}>Page Not Found</h1>
            <p className={styles.paragraph}>
                The page you are looking for can't be found.
            </p>
            <p className={styles.paragraphLinks}>
                Visit
                <Link className={`p-1 ${styles.customLink}`} to="/">
                    homepage
                </Link>
                or
                <Link className={`p-1 ${styles.customLink}`} to="/contacts">
                    contact us
                </Link>
                about the problem.
            </p>
        </div>
    );
};

export default ErrorPage;