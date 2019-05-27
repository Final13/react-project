import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import { getAllProducts, getProductById, searchProducts } from '../../actions/product';
import { getSettings } from '../../actions/settings';
import styles from './Product.module.scss';
import { productUrl, defaultImage } from '../../config'
import Select, { components } from 'react-select';
import {colors, forms, types, categories} from "../../SelectOptions";
import Pagination from "rc-pagination";
import {Helmet} from "react-helmet";
import Tippy from '@tippy.js/react'

const { Option } = components;

const ImageOption = (props) => {
    return (
        <Option {...props}>
            <div>
                {
                    props.data.href &&
                    <img className={styles.optionImage} src={productUrl + props.data.href} alt={props.data.label} />
                }
                {props.data.label}
            </div>
        </Option>
    );
};

class Product extends Component {
    state = {
        currentPage: 1,
        pageSize: 12,
        query: {
            search: '',
            color: '',
            type: '',
            form: '',
            category: '',
        },
        color: '',
        type: '',
        form: '',
        category: '',
    };

    componentDidMount() {
        this.props.getAllProducts();
        this.props.getSettings();
    }

    handleChangePage = (page) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/product?page=${page}`);
        this.setState({
            currentPage: page,
        });
    };

    handleSearch = (e) => {
        this.props.history.push(`/product`);
        const query = {...this.state.query};
        query.search = e.target.value;
        this.setState({
            currentPage: 1,
            query: query
        }, () => {
            this.props.searchProducts(this.state.query)
        });

    };

    handleFilter = (event, type) => {
        this.props.history.push(`/product`);
        const query = {...this.state.query};
        query[type] = event.value;
        this.setState({
            currentPage: 1,
            query: query,
            [type]: event
        }, () => {
            this.props.searchProducts(this.state.query);
        });
    };

    render() {
        const { rate, monumentPrice} = this.props.settings;
        const { query, color, form, type, category } = this.state;
        const modifiedColors = [
            {value: '', label: 'Все цвета'},
            ...colors
        ];
        const modifiedTypes = [
            {value: '', label: 'Все типы'},
            ...types
        ];
        const modifiedForms = [
            {value: '', label: 'Все формы'},
            ...forms
        ];
        const modifiedCategories = [
            {value: '', label: 'Все категории'},
            ...categories
        ];
        const indexOfLastProduct = this.state.currentPage * this.state.pageSize;
        const indexOfFirstProduct = indexOfLastProduct - this.state.pageSize;
        const currentProducts = this.props.products.slice(indexOfFirstProduct, indexOfLastProduct);

        return (
            <div className={`container ${styles.container}`}>
                <Helmet>
                    <title>Product page title | Brand Name</title>
                    <meta property="og:title" content="Product page title" />
                    <meta property="description" content="Product page description" />
                    <meta property="og:description" content="Product page description" />
                    <meta property="og:url" content="https://website.com/product" />
                </Helmet>
                <h2 className={styles.workHeader}>Product</h2>
                <div className={`row text-left pb-3 pt-3`}>
                    <div className={'col-4'}>
                        <input
                            type="text"
                            placeholder="Search"
                            className={`form-control`}
                            name="search"
                            onChange={ this.handleSearch }
                            value={ query.search }
                        />
                    </div>
                    <div className={`col-2`}>
                        <Select
                            placeholder="Category"
                            name="category"
                            onChange={ (event) => {this.handleFilter(event,'category')} }
                            value={ category }
                            options={ modifiedCategories }
                        />
                    </div>
                    <div className={`col-2`}>
                        <Select
                            placeholder="Color"
                            name="color"
                            onChange={ (event) => {this.handleFilter(event,'color')} }
                            value={ color }
                            options={ modifiedColors }
                        />
                    </div>
                    <div className={`col-2`}>
                        <Select
                            placeholder="Type"
                            name="type"
                            onChange={ (event) => {this.handleFilter(event,'type')} }
                            value={ type }
                            options={ modifiedTypes }
                        />
                    </div>
                    <div className={`col-2`}>
                        <Select
                            placeholder="Form"
                            name="form"
                            onChange={ (event) => {this.handleFilter(event,'form')} }
                            value={ form }
                            options={ modifiedForms }
                            components={{ Option: ImageOption }}
                        />
                    </div>
                </div>
                <div className={`row`}>
                    {
                        currentProducts.map( (product) => (
                            <Tippy
                                key={product._id}
                                content='Click for details'
                                arrow={true}
                                animation="scale"
                                className={`bg-dark`}
                                duration={100}
                                delay={[0, 50]}
                            >
                                <div className={`${styles.cardEffects} col-xs-12 col-lg-6 col-xl-4`}>
                                    <Link className={styles.link} to={`/product/${product._id}`}>
                                        <div className={styles.cardWhite}>
                                            <div className={styles.cardContent}>
                                                <h4 className={`pb-3 ${styles.workTitle}`}>{product.title}</h4>
                                                <img
                                                    className={styles.cardImage}
                                                    alt={ product.title || 'Product image' }
                                                    src={ product.image && product.image !== 'default.png' ? productUrl + product.image : defaultImage }
                                                />
                                                <div className={styles.description}>
                                                    {
                                                        product.price && monumentPrice && rate && product.price !== 0 ?
                                                            `Цена от: ${(product.price * monumentPrice * rate).toFixed()} бел.руб.` :
                                                            'Цена по запросу'
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </Tippy>

                        ))
                    }
                </div>
                {
                    this.props.products &&
                    <Pagination
                        className={styles.pagination}
                        total={this.props.products.length}
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

Product.propTypes = {
    products: PropTypes.array,
    getAllProducts: PropTypes.func.isRequired,
    getProductById: PropTypes.func.isRequired,
    searchProducts: PropTypes.func.isRequired,
    getSettings: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    products: state.product.products,
    settings: state.settings,
    errors: state.errors
});

export default connect(mapStateToProps,{ getAllProducts, getProductById, searchProducts, getSettings })(withRouter(Product));