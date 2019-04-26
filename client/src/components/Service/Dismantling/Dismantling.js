import React from 'react';
import styles from './Dismantling.module.scss';
import {Helmet} from "react-helmet";

const Dismantling = () => {
    return (
        <div className={styles.container}>
            <Helmet>
                <title>Демонтаж памятников и оград | Brand Name</title>
            </Helmet>
            <h1 className={`w-100 ${styles.header}`}>Демонтаж памятников и оград</h1>
        </div>
    );
};

export default Dismantling;
