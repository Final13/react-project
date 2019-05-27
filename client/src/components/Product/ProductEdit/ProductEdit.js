import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getProductById, updateProduct } from '../../../actions/product';
import styles from './ProductEdit.module.scss';
import Dropzone from 'react-dropzone';
import State from '../../../reducers/state';
import { productUrl } from '../../../config';
// import Select, { components } from 'react-select';
// import { colors, forms, types } from '../../../SelectOptions';
//
// const { Option } = components;
//
// const ImageOption = (props) => {
//     return (
//         <Option {...props}>
//             <div>
//                 <img className={styles.optionImage} src={productUrl + props.data.href} alt={props.data.label} />
//                 {props.data.label}
//             </div>
//         </Option>
//     );
// };


class ProductEdit extends Component {

    state = {
        product: State.product(),
        errors: {}
    };

    componentDidMount() {
        this.props.getProductById(this.props.match.params.id);
    }

    handleInputChange = (e) => {
        const product = {...this.state.product};
        product[e.target.name] = e.target.value;
        this.setState({
            product: product
        })
    };

    handleSelectChange = (event, type) => {
        const product = {...this.state.product};
        product[type] = event;
        this.setState({
            product: product
        })
    };

    handleImageChange = (image) => {
        const product = {...this.state.product};
        product.image = image;
        this.setState({
            product: product
        });
    };

    removeImage = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const product = {...this.state.product};
        product.image = [];
        this.setState({
            product: product
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const product = new FormData();
        product.append('title', this.state.product.title);
        product.append('description', this.state.product.description);
        product.append('price', this.state.product.price);
        product.append('details', JSON.stringify(this.state.product.details));
        product.append('category', JSON.stringify(this.state.product.category));
        product.append('file',
            typeof this.state.product.image === 'object' && this.state.product.image !== null ?
                this.state.product.image[0] :
                this.state.product.image
        );

        this.props.updateProduct(this.props.match.params.id, product, this.props.history);
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

        if(nextProps.product) {
            this.setState({
                product: nextProps.product
            });
        }
    };

    render() {
        const { errors, product } = this.state;
        return(
            <div className={`container ${styles.container}`}>
                <h2 className={styles.productHeader}>edit product</h2>
                <form onSubmit={ this.handleSubmit }>
                    <div className={`row`}>
                        <div className={`col-sm-12 col-lg-6`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Title:</label>
                                <input
                                    type='text'
                                    placeholder='Title'
                                    className={`form-control ${errors.title && 'is-invalid'}`}
                                    name='title'
                                    onChange={ this.handleInputChange }
                                    value={ product.title }
                                />
                                {errors.title && (<div className={`invalid-feedback`}>{errors.title}</div>)}
                            </div>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Description:</label>
                                <textarea
                                    placeholder='Description'
                                    className={`form-control ${ styles.textarea} ${errors.description && 'is-invalid'}`}
                                    name='description'
                                    onChange={ this.handleInputChange }
                                    value={ product.description }
                                />
                                {errors.description && (<div className={`invalid-feedback`}>{errors.description}</div>)}
                            </div>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Price coefficient:</label>
                                <input
                                    type='number'
                                    step={0.1}
                                    placeholder='Price'
                                    className={`form-control ${errors.price && 'is-invalid'}`}
                                    name='price'
                                    onChange={ this.handleInputChange }
                                    value={ product.price }
                                />
                                {errors.price && (<div className={`invalid-feedback`}>{errors.price}</div>)}
                            </div>
                        </div>
                    </div>
                    <Dropzone multiple={false} onDrop={(acceptedFiles) => {this.handleImageChange(acceptedFiles)}}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className={`mb-4 ${styles.dropArea}`}>
                                        {
                                            product.image && product.image.length > 0 ?
                                                <React.Fragment>
                                                    <img
                                                        alt={typeof product.image === 'object' ? product.image.name : product.image}
                                                        src={typeof product.image === 'object' ? URL.createObjectURL(product.image[0]) : productUrl + product.image}
                                                        className={styles.thumbImg}
                                                    />
                                                    <i
                                                        className={`fas fa-minus-circle ${styles.removeIcon}`}
                                                        onClick={ this.removeImage }
                                                    />
                                                </React.Fragment>
                                                :
                                                <div className={`m-auto`}>Drag 'n' drop some files here, or click to select files</div>
                                        }
                                    </div>

                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <div className={`form-group text-right`}>
                        <button type='submit' className={`btn btn-primary btn-lg`}>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

ProductEdit.propTypes = {
    getProductById: PropTypes.func.isRequired,
    updateProduct: PropTypes.func.isRequired,
    product: PropTypes.object,
};

const mapStateToProps = state => ({
    product: state.product.product,
    errors: state.errors
});

export default connect(mapStateToProps,{ getProductById, updateProduct })(withRouter(ProductEdit));