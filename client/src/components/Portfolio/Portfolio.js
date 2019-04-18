import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import { getAllWorks, getWorkById, searchWorks } from '../../actions/portfolio';
import styles from './Portfolio.module.scss';
import { uploadsUrl } from '../../config'
import Select, { components } from 'react-select';
import {colors, forms, types} from "../../SelectOptions";
import Pagination from "rc-pagination";
import {Helmet} from "react-helmet";

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
        currentPage: 1,
        pageSize: 12,
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

    handleChangePage = (page) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/portfolio?page=${page}`);
        this.setState({
            currentPage: page,
        });
    };

    handleSearch = (e) => {
        this.props.history.push(`/portfolio`);
        const query = {...this.state.query};
        query.search = e.target.value;
        this.setState({
            currentPage: 1,
            query: query
        }, () => {
            this.props.searchWorks(this.state.query)
        });

    };

    handleFilter = (event, type) => {
        this.props.history.push(`/portfolio`);
        const query = {...this.state.query};
        query[type] = event.value;
        this.setState({
            currentPage: 1,
            query: query,
            [type]: event
        }, () => {
            this.props.searchWorks(this.state.query);
        });
    };

    render() {
        const { query, color, form, type } = this.state;
        const modifiedColors = [
            {value: '', label: 'All colors'},
            ...colors
        ];
        const modifiedTypes = [
            {value: '', label: 'All types'},
            ...types
        ];
        const modifiedForms = [
            {value: '', label: 'All forms'},
            ...forms
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
        const indexOfLastWork = this.state.currentPage * this.state.pageSize;
        const indexOfFirstWork = indexOfLastWork - this.state.pageSize;
        const currentWorks = this.props.works.slice(indexOfFirstWork, indexOfLastWork);

        return (
            <div className={`container ${styles.container}`}>
                <Helmet>
                    <title>Portfolio page title | Brand Name</title>
                    <meta property="og:title" content="Portfolio page title" />
                    <meta property="description" content="Portfolio page description" />
                    <meta property="og:description" content="Portfolio page description" />
                    <meta property="og:url" content="https://website.com/portfolio" />
                </Helmet>
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
                            options={ modifiedColors }
                        />
                    </div>
                    <div className={`col-3`}>
                        <Select
                            placeholder="Type"
                            name="type"
                            onChange={ (event) => {this.handleFilter(event,'type')} }
                            value={ type }
                            options={ modifiedTypes }
                            components={{ Option: ImageOption }}
                        />
                    </div>
                    <div className={`col-3`}>
                        <Select
                            placeholder="Form"
                            name="form"
                            onChange={ (event) => {this.handleFilter(event,'form')} }
                            value={ form }
                            options={ modifiedForms }
                        />
                    </div>
                </div>
                <div className={`row`}>
                    {
                        currentWorks.map( (work) => (
                            <div key={work._id} className={`col-xs-12 col-lg-6 col-xl-4`}>
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
                {
                    this.props.works &&
                    <Pagination
                        className={styles.pagination}
                        total={this.props.works.length}
                        showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} items`}
                        onChange={this.handleChangePage}
                        current={this.state.currentPage}
                        defaultPageSize={this.state.pageSize}
                    />
                }
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