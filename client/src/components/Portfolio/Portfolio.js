import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import { getAllWorks, getWorkById } from '../../actions/portfolio';
import styles from './Portfolio.module.scss';
import { uploadsUrl } from '../../config'

class Portfolio extends Component {
    componentDidMount() {
        this.props.getAllWorks();
    }

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
        return (
            <div className={`container ${styles.container}`}>
                <h2 className={styles.workHeader}>Works</h2>
                <div className={`row`}>
                    {
                        this.props.works.map( (work) => (
                            <div key={work._id} className={`col-4`}>
                                <div className={styles.cardWhite}>
                                    <div className={styles.cardContent}>
                                        <h4 className={`pb-3 ${styles.workTitle}`}>{work.title}</h4>
                                        <Slider {...settings}>
                                            {
                                                work.images.map( image => (
                                                    <div key={image}>
                                                        <img
                                                            className={styles.sliderImage}
                                                            alt={image}
                                                            src={uploadsUrl + image}
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </Slider>
                                        <div className={styles.description}>
                                            {work.description}
                                        </div>
                                        <Link
                                            to={`/portfolio/${work._id}`}
                                            className={`btn btn-outline-primary mt-2`}
                                        >
                                            Details
                                        </Link>
                                    </div>
                                </div>


                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

Portfolio.propTypes = {
    works: PropTypes.array,
    getAllWorks: PropTypes.func.isRequired,
    getWorkById: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    works: state.work.works,
    errors: state.errors
});

export default connect(mapStateToProps,{ getAllWorks, getWorkById })(withRouter(Portfolio));