import React from 'react';
import styles from './Decoration.module.scss';
import {Helmet} from "react-helmet";

const Decoration = () => {
    return (
        <div className={styles.container}>
            <Helmet>
                <title>Художественное оформление памятников | Brand Name</title>
            </Helmet>
            <h1 className={`w-100 ${styles.header}`}>Художественное оформление памятников</h1>
        </div>
    );
};

export default Decoration;
