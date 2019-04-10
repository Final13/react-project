import React from 'react';
import styles from './Service.module.scss';
import {Helmet} from "react-helmet";

const Service = () => {
    return (
        <div>
            <Helmet>
                <title>Services page title | Brand Name</title>
                <meta property="og:title" content="Services page title" />
                <meta property="description" content="Services page description" />
                <meta property="og:description" content="Services page description" />
                <meta property="og:url" content="https://website.com/service" />
            </Helmet>
            <div className={`container`}>
                <div className={`row`}>
                    <div className={`col-xs-12 col-md-6 col-xl-4`}>
                        <div className={styles.cardWhite}>
                            <div className={styles.cardContent}>
                                <i className={`fas fa-code`} />
                                <h5 className={styles.cardHeader}>
                                    First Service
                                </h5>
                                <div className={styles.threeLineEllipsis}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dicta ducimus eligendi et explicabo fuga inventore itaque labore maiores minus modi natus numquam placeat possimus quas quo, sed tempore temporibus?
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-xs-12 col-md-6 col-xl-4`}>
                        <div className={styles.cardWhite}>
                            <div className={styles.cardContent}>
                                <i className={`far fa-edit`} />
                                <h5 className={styles.cardHeader}>
                                    Second Service
                                </h5>
                                <div className={styles.threeLineEllipsis}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur cumque debitis, distinctio enim eum, ipsam iusto minima necessitatibus obcaecati placeat qui quis quisquam quo repudiandae saepe soluta unde ut voluptates.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-xs-12 col-md-6 col-xl-4`}>
                        <div className={styles.cardWhite}>
                            <div className={styles.cardContent}>
                                <i className={`fas fa-chart-line`} />
                                <h5 className={styles.cardHeader}>
                                    Third Service
                                </h5>
                                <div className={styles.threeLineEllipsis}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid animi beatae cum dolor earum fugiat incidunt inventore labore laboriosam modi nesciunt, nulla odio provident quidem recusandae sint totam ullam.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-xs-12 col-md-6 col-xl-4`}>
                        <div className={styles.cardWhite}>
                            <div className={styles.cardContent}>
                                <i className={`far fa-gem`} />
                                <h5 className={styles.cardHeader}>
                                    Fourth Service
                                </h5>
                                <div className={styles.threeLineEllipsis}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, animi blanditiis culpa dolore doloribus eligendi iusto laborum magnam mollitia necessitatibus, nesciunt non nostrum nulla qui quod repellendus, repudiandae sit tempora!
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-xs-12 col-md-6 col-xl-4`}>
                        <div className={styles.cardWhite}>
                            <div className={styles.cardContent}>
                                <i className={`fas fa-cloud-upload-alt`} />
                                <h5 className={styles.cardHeader}>
                                    Fifth Service
                                </h5>
                                <div className={styles.threeLineEllipsis}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus accusantium aliquam aperiam, distinctio illum molestias necessitatibus nesciunt nostrum, placeat repellendus sed sit sunt tempore veniam vitae voluptate! Repellat, sunt.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-xs-12 col-md-6 col-xl-4`}>
                        <div className={styles.cardWhite}>
                            <div className={styles.cardContent}>
                                <i className={`fas fa-headset`} />
                                <h5 className={styles.cardHeader}>
                                    Sixth Service
                                </h5>
                                <div className={styles.threeLineEllipsis}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dicta, distinctio excepturi exercitationem expedita ipsam laborum magni nam natus numquam omnis, quaerat quibusdam quisquam ratione saepe similique totam voluptate voluptatibus!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Service;