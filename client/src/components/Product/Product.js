import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import { getAllProducts, getProductById, searchProducts } from '../../actions/product';
import styles from './Product.module.scss';
import { imagesUrl } from '../../config'
import Select, { components } from 'react-select';
import {colors, forms, types, categories} from "../../SelectOptions";
import Pagination from "rc-pagination";
import {Helmet} from "react-helmet";

const { Option } = components;

const ImageOption = (props) => {
    return (
        <Option {...props}>
            <div>
                {
                    props.data.href &&
                    <img className={styles.optionImage} src={imagesUrl + props.data.href} alt={props.data.label} />
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
                    <div className={`col-2`}>
                        <Select
                            placeholder="Category"
                            name="category"
                            onChange={ (event) => {this.handleFilter(event,'category')} }
                            value={ category }
                            options={ modifiedCategories }
                        />
                    </div>
                </div>
                <div className={`row`}>
                    {
                        currentProducts.map( (product) => (
                            <div key={product._id} className={`col-xs-12 col-lg-6 col-xl-4`}>
                                <div className={styles.cardWhite}>
                                    <div className={styles.cardContent}>
                                        <h4 className={`pb-3 ${styles.workTitle}`}>{product.title}</h4>
                                        {
                                            product.image &&
                                            <img
                                                className={styles.cardImage}
                                                alt={product.image}
                                                src={imagesUrl + product.image}
                                            />
                                        }
                                        <div className={styles.description}>
                                            {
                                                product.price ? `Цена от: ${product.price}` : 'Цена по запросу'
                                            }
                                        </div>
                                        <Link
                                            to={`/portfolio/${product._id}`}
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
};

const mapStateToProps = state => ({
    products: state.product.products,
    errors: state.errors
});

export default connect(mapStateToProps,{ getAllProducts, getProductById, searchProducts })(withRouter(Product));