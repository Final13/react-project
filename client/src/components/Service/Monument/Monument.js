import React from 'react';
import styles from './Monument.module.scss';
import {Helmet} from "react-helmet";

const Monument = () => {
    return (
        <div className={styles.container}>
            <Helmet>
                <title>Установка памятников в Минске | Brand Name</title>
            </Helmet>
            <h1 className={`w-100 ${styles.header}`}>Установка памятников в Минске</h1>
        </div>
    );
};

export default Monument;
