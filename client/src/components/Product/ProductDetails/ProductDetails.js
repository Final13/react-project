import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { getProductById, deleteProduct } from '../../../actions/product';
import { getSettings } from '../../../actions/settings';
import styles from './ProductDetails.module.scss';
import { productUrl, regularUrl } from "../../../config";
import {Helmet} from "react-helmet";
import { defaultDescription, defaultTitle } from '../../../defaultMeta';

class ProductDetails extends Component {
    state = {
        errors: {},
        settings: {},
        material: {
            value: 1,
            label: '"Карельский" - чёрный гранит'
        },
        size: {
            value: 1,
            label: "80x40x5",
            stand: "50x10x15",
            flowerGarden: "100x50x8x5"
        },
        decoration: 0,
    };

    componentDidMount() {
        this.props.getProductById(this.props.match.params.id);
        this.props.getSettings();
    }

    handleDelete = () => {
        this.props.deleteProduct(this.props.match.params.id, this.props.history);
    };

    handleMaterialChange = (event, material) => {
        this.setState({
            material: material,
        });
    };

    handleSizeChange = (event, size) => {
        this.setState({
            size: size,
        });
    };

    handleDecorationChange = (event, value) => {
        this.setState({
            decoration: value,
        });
    };


    render() {
        const { product, settings } = this.props;
        const { material, size, decoration } = this.state;
        const { role } = this.props.auth.user;
        const totalPrice = ((( settings.monumentPrice * product.price * material.value * size.value ) + decoration) * settings.rate ).toFixed();
        return(
            <div className={`${styles.container}`}>
                <Helmet>
                    <title>{ product.title || defaultTitle } | Brand Name</title>
                    <meta property="og:title" content={`${product.title} | Brand Name`} />
                    <meta property="description" content={product.description ? product.description.slice(0, 150) : defaultDescription } />
                    <meta property="og:description" content={product.description ? product.description.slice(0, 150) : defaultDescription } />
                    <meta property="og:url" content={`https://website.com/product/${product._id}`} />
                </Helmet>
                {
                    role === 'admin' ? (
                        <React.Fragment>
                            <Link
                                to={`/product/edit/${product._id}`}
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
                <h2 className={styles.productHeader}>{ product.title }</h2>
                <div className={`${styles.row} row`}>
                    <div className={`col-sm-5`}>
                        <div className={`col-sm-12 pb-3`}>
                            {
                                product.image &&
                                <img
                                    className={styles.image}
                                    alt={product.title || 'Product Image'}
                                    src={productUrl + product.image}
                                />
                            }
                        </div>
                        <div className={`col-sm-12`}>

                        </div>
                    </div>
                    <div className={`col-sm-7`}>
                        <div className={`row`}>
                            <div className={`col-sm-12 mb-2`}>
                                {
                                    product.price ? (
                                        <React.Fragment>
                                            <span className={`pr-2`}>Цена от:</span>
                                            <h5 className={`m-0 d-inline`}>{totalPrice} руб.</h5>
                                        </React.Fragment>
                                    ) : <h5>Цена по запросу</h5>
                                }
                            </div>
                            <div className={`col-sm-6 mb-2 text-left`}>
                                <div className={`col-sm-12 mb-2 border-bottom`}>
                                    <h6 className={`m-0`}>Description:</h6>
                                    {product.description}
                                </div>
                                <div className={`col-sm-12 mb-2 border-bottom`}>
                                    <h6>Monument size:</h6>
                                    {
                                        settings.sizeCoefficient &&
                                        settings.sizeCoefficient.map((size, index) => (
                                            <div className={`radio`}  key={index}>
                                                <label>
                                                    <input
                                                        type='radio'
                                                        name='size'
                                                        defaultChecked={size.name === '80405'}
                                                        onClick={event => {this.handleSizeChange(event, size)}}
                                                    />
                                                    <div className={`pl-1 d-inline`}>
                                                        {size.label}
                                                    </div>
                                                </label>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={`col-sm-12 mb-2 border-bottom`}>
                                    <div className={`d-flex`}>
                                        <h6>Stand size:</h6>
                                        <span className={`d-inline pl-2`}>
                                            { size.stand}
                                        </span>
                                    </div>
                                    <div className={`d-flex`}>
                                        <h6>Flower garden size:</h6>
                                        <span className={`d-inline pl-2`}>
                                            { size.flowerGarden}
                                        </span>
                                    </div>
                                </div>
                                <div className={`col-sm-12 text-left`}>
                                    <div className={`radio`}>
                                        <label>
                                            <input
                                                type='radio'
                                                name='decoration'
                                                defaultChecked
                                                onClick={event => {this.handleDecorationChange(event, 0)}}
                                            />
                                            <div className={`pl-1 d-inline`}>
                                                Without decoration
                                            </div>
                                        </label>
                                    </div>
                                    <div className={`radio`}>
                                        <label>
                                            <input
                                                type='radio'
                                                name='decoration'
                                                onClick={event => {this.handleDecorationChange(event, this.props.settings.textPrice)}}
                                            />
                                            <div className={`pl-1 d-inline`}>
                                                With text (without portrait)
                                            </div>
                                        </label>
                                    </div>
                                    <div className={`radio`}>
                                        <label>
                                            <input
                                                type='radio'
                                                name='decoration'
                                                onClick={event => {
                                                    this.handleDecorationChange(event, (
                                                        this.props.settings.portraitPrice + this.props.settings.textPrice
                                                    ))
                                                }}
                                            />
                                            <div className={`pl-1 d-inline`}>
                                                With text and portrait
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-sm-6 mb-2`}>
                                <div className={`col-sm-12 mb-2`}>
                                    <h6 className={`m-0`}>{material.label}</h6>
                                    {
                                        settings.materialCoefficient &&
                                        settings.materialCoefficient.map((material, index) => (
                                            <div
                                                onClick={event => {this.handleMaterialChange(event, material)}}
                                                key={index}
                                            >
                                                <div
                                                    className={styles.materialImage}
                                                    style={{backgroundImage: `url(${regularUrl + material.href})`}}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ProductDetails.propTypes = {
    getProductById: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    getSettings: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    product: state.product.product,
    settings: state.settings,
    auth: state.auth
});

export default connect(mapStateToProps,{ getProductById, deleteProduct, getSettings })(withRouter(ProductDetails));