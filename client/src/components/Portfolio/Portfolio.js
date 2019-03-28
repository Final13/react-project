import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import { getAllWorks, getWorkById, searchWorks } from '../../actions/portfolio';
import styles from './Portfolio.module.scss';
import { uploadsUrl } from '../../config'
import Select, { components } from 'react-select';

const { Option } = components;

const ImageOption = (props) => {
    return (
        <Option {...props}>
            <div>
                {
                    props.data.href &&
                    <img className={styles.optionImage} src={props.data.href} alt={props.data.label} />
                }
                {props.data.label}
            </div>
        </Option>
    );
};

class Portfolio extends Component {
    state = {
        query: {
            search: '',
            color: '',
            type: '',
            form: ''
        },
        color: '',
        type: '',
        form: ''
    };

    componentDidMount() {
        this.props.getAllWorks();
    }

    handleSearch = (e) => {
        const query = {...this.state.query};
        query.search = e.target.value;
        this.setState({
            query: query
        }, () => {
            this.props.searchWorks(this.state.query)
        });

    };

    handleFilter = (event, type) => {
        const query = {...this.state.query};
        query[type] = event.value;
        this.setState({
            query: query,
            [type]: event
        }, () => {
            this.props.searchWorks(this.state.query);
        });
    };

    render() {
        const { query, color, form, type } = this.state;
        const colors = [
            {value: '', label: 'All colors'},
            {value: 'black', label: 'Black'},
            {value: 'white', label: 'White'},
            {value: 'red', label: 'Red'},
            {value: 'green', label: 'Green'}
        ];
        const types = [
            {value: '', label: 'All types'},
            {value: 'square', label: 'square', href: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/1200px-Square_-_black_simple.svg.png'},
            {value: 'triangle', label: 'Triangle', href: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Regular_triangle.svg/1024px-Regular_triangle.svg.png'}
        ];
        const forms = [
            {value: '', label: 'All forms'},
            {value: 'single', label: 'Single'},
            {value: 'double', label: 'Double'}
        ];
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
                <div className={`row text-left pb-3 pt-3`}>
                    <div className={`col-3`}>
                        <input
                            type="text"
                            placeholder="Search"
                            className={`form-control`}
                            name="search"
                            onChange={ this.handleSearch }
                            value={ query.search }
                        />
                    </div>
                    <div className={`col-3`}>
                        <Select
                            placeholder="Color"
                            name="color"
                            onChange={ (event) => {this.handleFilter(event,'color')} }
                            value={ color }
                            options={colors}
                        />
                    </div>
                    <div className={`col-3`}>
                        <Select
                            placeholder="Type"
                            name="type"
                            onChange={ (event) => {this.handleFilter(event,'type')} }
                            value={ type }
                            options={types}
                            components={{ Option: ImageOption }}
                        />
                    </div>
                    <div className={`col-3`}>
                        <Select
                            placeholder="Form"
                            name="form"
                            onChange={ (event) => {this.handleFilter(event,'form')} }
                            value={ form }
                            options={forms}
                        />
                    </div>
                </div>
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
    searchWorks: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    works: state.work.works,
    errors: state.errors
});

export default connect(mapStateToProps,{ getAllWorks, getWorkById, searchWorks })(withRouter(Portfolio));