import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import { withRouter, Link } from 'react-router-dom';
import { getWorkById } from '../../../actions/portfolio';
import styles from './PortfolioDetails.module.scss';
import {uploadsUrl} from "../../../config";

class PortfolioDetails extends Component {
    componentDidMount() {
        this.props.getWorkById(this.props.match.params.id);
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
        const { work } = this.props;
        return(
            <div className={`${styles.container}`}>
                <Link
                    to={`/portfolio/edit/${work._id}`}
                    className={`btn btn-primary ${styles.editButton}`}
                >
                    Edit
                </Link>
                <h2 className={styles.workHeader}>{ work.title }</h2>
                <div className={`row`}>
                    <div className={`col-sm-12 col-lg-6`}>
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
                    </div>
                    <div className={`col-sm-12 col-lg-6 ${styles.rightBlock}`}>
                        <div>Description: {work.description}</div>
                        <div>Color: {work.color.label}</div>
                        <div>Type: {work.type.label}</div>
                        <div>Form: {work.form.label}</div>
                    </div>
                </div>
            </div>
        )
    }
}

PortfolioDetails.propTypes = {
    getWorkById: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    work: state.work.work
});

export default connect(mapStateToProps,{ getWorkById })(withRouter(PortfolioDetails));