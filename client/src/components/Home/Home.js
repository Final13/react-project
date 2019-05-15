import React, {Component} from 'react';
import Slider from "react-slick";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import {getAllWorks} from '../../actions/portfolio';
import {workUrl} from '../../config'
import styles from './Home.module.scss';
import {Helmet} from "react-helmet";

class Home extends Component {
    componentDidMount() {
        this.props.getAllWorks();
    }

    render() {
        const mainSettings = {
            className: styles.mainSlider,
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        const settings = {
            className: styles.slider,
            arrows: false,
            dots: true,
            infinite: false,
            autoplay: false,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className={`container`}>
                <Helmet>
                    <title>Home page title | Brand Name</title>
                    <meta property="og:title" content="Home page title" />
                    <meta property="description" content="Home page description" />
                    <meta property="og:description" content="Home page description" />
                    <meta property="og:url" content="https://website.com" />
                </Helmet>
                <div className={`row`}>
                    <div className={`col-12 ${styles.h2}`}>About</div>
                    <div className={`col-sm-12 col-lg-4 ${styles.block}`}>
                        <h3>First block</h3>
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam animi culpa cum
                            deleniti dolor doloremque est et iure, maxime nam optio perferendis praesentium provident
                            reiciendis sequi similique tempora voluptatibus!
                        </div>
                    </div>
                    <div className={`col-sm-12 col-lg-4 ${styles.block}`}>
                        <h3>Second block</h3>
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi aspernatur atque
                            beatae cum deserunt, doloremque, eum impedit inventore ipsum natus nihil nostrum praesentium
                            provident quas, quisquam repellendus sint voluptates?
                        </div>
                    </div>
                    <div className={`col-sm-12 col-lg-4 ${styles.block}`}>
                        <h3>Third block</h3>
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores in non quod. Commodi
                            cumque laudantium magnam maxime nisi omnis repellendus! Culpa eius et expedita impedit
                            molestiae nobis optio sapiente temporibus?
                        </div>
                    </div>
                </div>
                <div className={`row ${styles.row}`}>
                    <div className={`col-12 ${styles.h2}`}>Works</div>
                    <div className={`col-12 ${styles.sliderWrapper}`}>
                        <Slider {...mainSettings}>
                            {
                                this.props.works.map( (work) => (
                                    <div key={work._id}>
                                        <h4 className={`pb-3 ${styles.workTitle}`}>{work.title}</h4>
                                        <div className={`row`}>
                                            <div className={`col-6`}>
                                                <Slider {...settings}>
                                                    {
                                                        work.images.map(image => (
                                                            <div key={image}>
                                                                <img
                                                                    className={styles.sliderImage}
                                                                    alt={image}
                                                                    src={workUrl + image}
                                                                />
                                                            </div>
                                                        ))
                                                    }
                                                </Slider>
                                            </div>
                                            <div className={`col-6`}>
                                                <div className={styles.description}>
                                                    {work.description}
                                                </div>
                                                <Link
                                                    to={`/portfolio/${work._id}`}
                                                    className={`btn btn-outline-primary mt-4`}
                                                >
                                                    Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    getAllWorks: PropTypes.func.isRequired,
    works: PropTypes.array,
};

const mapStateToProps = state => ({
    works: state.work.works,
    errors: state.errors
});

export default connect(mapStateToProps, {getAllWorks})(withRouter(Home));