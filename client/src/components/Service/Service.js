import React from 'react';
import styles from './Service.module.scss';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

const Service = () => {
    return (
        <div>
            <Helmet>
                <title>Изготовление и установка памятников в Минске | Brand Name</title>
                <meta property="og:title" content="Изготовление и установка памятников в Минске | Brand Name" />
                <meta property="description" content="Наша компания предлагает Вам изготовление и установку памятников в Минске из натурального гранита. Низкая цена, гарантия на всю продукцию" />
                <meta property="og:description" content="Наша компания предлагает Вам изготовление и установку памятников в Минске из натурального гранита. Низкая цена, гарантия на всю продукцию" />
                <meta property="og:url" content="https://website.com/services" />
            </Helmet>
            <div className={`container`}>
                <div className={`row`}>
                    <div className={`${styles.cardEffects} col-xs-12 col-md-6 col-xl-4`}>
                        <Link className={styles.link} to="/services/production">
                            <div className={styles.cardWhite}>
                                <div className={styles.cardContent}>
                                    <i className={`fas fa-monument`} />
                                    <h5 className={styles.cardHeader}>
                                        Изготовление памятников
                                    </h5>
                                    <div className={styles.fourLineEllipsis}>
                                        У нас Вы можете заказать изготовление и дальнейший монтаж надгробий любой сложности и формы как из каталога, так и по индивидуальному эскизу!
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={`${styles.cardEffects} col-xs-12 col-md-6 col-xl-4`}>
                        <Link className={styles.link} to="/services/monument">
                            <div className={styles.cardWhite}>
                                <div className={styles.cardContent}>
                                    <i className={`fas fa-hammer`} />
                                    <h5 className={styles.cardHeader}>
                                        Установка памятников
                                    </h5>
                                    <div className={styles.fourLineEllipsis}>
                                        Мы предлагаем установку конструкций любого размера - как небольших памятников, так и сложных комплексов «под ключ».
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={`${styles.cardEffects} col-xs-12 col-md-6 col-xl-4`}>
                        <Link className={styles.link} to="/services/fence">
                            <div className={styles.cardWhite}>
                                <div className={styles.cardContent}>
                                    <i className={`fas fa-dungeon`} />
                                    <h5 className={styles.cardHeader}>
                                        Установка оград
                                    </h5>
                                    <div className={styles.fourLineEllipsis}>
                                        Ограждение надгробия позволяет обособить место захоронения, а также придать ему законченный и аккуратный вид.
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={`${styles.cardEffects} col-xs-12 col-md-6 col-xl-4`}>
                        <Link className={styles.link} to="/services/landscape">
                            <div className={styles.cardWhite}>
                                <div className={styles.cardContent}>
                                    <i className={`fas fa-image`} />
                                    <h5 className={styles.cardHeader}>
                                        Благоустройство могил
                                    </h5>
                                    <div className={styles.fourLineEllipsis}>
                                        Создание аккуратного и красивого места захоронения, устойчивого к любым погодным условиям.
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={`${styles.cardEffects} col-xs-12 col-md-6 col-xl-4`}>
                        <Link className={styles.link} to="/services/decoration">
                            <div className={styles.cardWhite}>
                                <div className={styles.cardContent}>
                                    <i className={`fas fa-paint-brush`} />
                                    <h5 className={styles.cardHeader}>
                                        Художественное оформление
                                    </h5>
                                    <div className={styles.fourLineEllipsis}>
                                        Ручная гравировка портрета выполненная опытными и талантливыми художниками. Нанесение текста, фотомедальоны.
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={`${styles.cardEffects} col-xs-12 col-md-6 col-xl-4`}>
                        <Link className={styles.link} to="/services/dismantling">
                            <div className={styles.cardWhite}>
                                <div className={styles.cardContent}>
                                    <i className={`fas fa-times`} />
                                    <h5 className={styles.cardHeader}>
                                        Демонтаж
                                    </h5>
                                    <div className={styles.fourLineEllipsis}>
                                        Демонтаж памятника нужен на старых захоронениях, если памятник уже практически разрушен и требуется заменить его.
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Service;