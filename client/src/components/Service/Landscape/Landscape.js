import React from 'react';
import styles from './Landscape.module.scss';
import {Helmet} from "react-helmet";

const Landscape = () => {
    return (
        <div className={styles.container}>
            <Helmet>
                <title>Благоустройство могил в Минске | Brand Name</title>
            </Helmet>
            <h1 className={`w-100 ${styles.header}`}>Благоустройство могил в Минске</h1>
        </div>
    );
};

export default Landscape;
