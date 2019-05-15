import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import { withRouter, Link } from 'react-router-dom';
import { getWorkById, deleteWork } from '../../../actions/portfolio';
import styles from './PortfolioDetails.module.scss';
import {workUrl} from "../../../config";
import {Helmet} from "react-helmet";
import { defaultDescription, defaultTitle } from '../../../defaultMeta';

class PortfolioDetails extends Component {
    componentDidMount() {
        this.props.getWorkById(this.props.match.params.id);
    }

    handleDelete = () => {
        this.props.deleteWork(this.props.match.params.id, this.props.history);
    };

    render() {
        const settings = {
            className: styles.slider,
            dots: true,
            infinite: true,
            autoplay: true,
            speed: 1000,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        const { work } = this.props;
        const { role } = this.props.auth.user;
        return(
            <div className={`${styles.container}`}>
                <Helmet>
                    <title>{work.title} | Brand Name</title>
                    <meta property="og:title" content={`${ work.title || defaultTitle } | Brand Name`} />
                    <meta property="description" content={ work.description ? work.description.slice(0, 150) : defaultDescription } />
                    <meta property="og:description" content={ work.description ? work.description.slice(0, 150) : defaultDescription } />
                    <meta property="og:url" content={`https://website.com/portfolio/${work._id}`} />
                </Helmet>
                {
                    role === 'admin' ? (
                        <React.Fragment>
                            <Link
                                to={`/portfolio/edit/${work._id}`}
                                className={`btn btn-primary ${styles.editButton}`}
                            >
                                Edit
                            </Link>
                            <button
                                onClick={this.handleDelete}
                                className={`btn btn-danger ${styles.deleteButton}`}
                            >
                                Delete
                            </button>
                        </React.Fragment>
                    ) : null
                }
                <h2 className={styles.workHeader}>{ work.title }</h2>
                <div className={`row`}>
                    <div className={`col-sm-12 col-lg-6`}>
                        <Slider {...settings}>
                            {
                                work.images.map( (image,index) => (
                                    <div key={image}>
                                        <img
                                            className={styles.sliderImage}
                                            alt={`${work.title || 'Work'} ${index+1}`}
                                            src={workUrl + image}
                                        />
                                    </div>
                                ))
                            }
                        </Slider>
                    </div>
                    <div className={`col-sm-12 col-lg-6 ${styles.rightBlock}`}>
                        <div className={`mb-2`}>
                            <h6 className={`m-0`}>Description:</h6>
                            {work.description}
                        </div>
                        <div className={`mb-2`}>
                            <h6 className={`m-0`}>Color:</h6>
                            {work.color.label}
                        </div>
                        <div className={`mb-2`}>
                            <h6 className={`m-0`}>Type:</h6>
                            {work.type.label}
                        </div>
                        <div className={`mb-2`}>
                            <h6 className={`m-0`}>Form:</h6>
                            {work.form.label}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

PortfolioDetails.propTypes = {
    getWorkById: PropTypes.func.isRequired,
    deleteWork: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    work: state.work.work,
    auth: state.auth
});

export default connect(mapStateToProps,{ getWorkById, deleteWork })(withRouter(PortfolioDetails));