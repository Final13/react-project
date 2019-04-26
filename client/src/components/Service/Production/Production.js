import React from 'react';
import styles from './Production.module.scss';
import {Helmet} from "react-helmet";

const Production = () => {
    return (
        <div className={styles.container}>
            <Helmet>
                <title>Изготовление памятников в Минске | Brand Name</title>
            </Helmet>
            <h1 className={`w-100 ${styles.header}`}>Изготовление памятников в Минске</h1>
        </div>
    );
};

export default Production;