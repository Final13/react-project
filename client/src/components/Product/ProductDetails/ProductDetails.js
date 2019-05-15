import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { getProductById, deleteProduct } from '../../../actions/product';
import styles from './ProductDetails.module.scss';
import { productUrl } from "../../../config";
import {Helmet} from "react-helmet";
import { defaultDescription, defaultTitle } from '../../../defaultMeta';

class ProductDetails extends Component {
    componentDidMount() {
        this.props.getProductById(this.props.match.params.id);
    }

    handleDelete = () => {
        this.props.deleteProduct(this.props.match.params.id, this.props.history);
    };

    render() {
        const { product } = this.props;
        const { role } = this.props.auth.user;
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
                <div className={`row`}>
                    <div className={`col-sm-12`}>
                        <div className={`mb-2`}>
                            <h6 className={`m-0`}>Description:</h6>
                            {product.description}
                        </div>
                    </div>
                    <div className={`col-sm-12`}>
                        {
                            product.image &&
                            <img
                                className={styles.image}
                                alt={product.title || 'Product Image'}
                                src={productUrl + product.image}
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

ProductDetails.propTypes = {
    getProductById: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    product: state.product.product,
    auth: state.auth
});

export default connect(mapStateToProps,{ getProductById, deleteProduct })(withRouter(ProductDetails));