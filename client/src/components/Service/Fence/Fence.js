import React from 'react';
import styles from './Fence.module.scss';
import {Helmet} from "react-helmet";

const Fence = () => {
    return (
        <div className={styles.container}>
            <Helmet>
                <title>Установка оград на кладбище | Brand Name</title>
            </Helmet>
            <h1 className={`w-100 ${styles.header}`}>Установка оград на кладбище</h1>
        </div>
    );
};

export default Fence;
