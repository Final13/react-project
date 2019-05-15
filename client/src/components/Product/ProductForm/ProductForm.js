import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createProduct } from '../../../actions/product';
import styles from './ProductForm.module.scss';
import Dropzone from 'react-dropzone';
import Select, { components } from 'react-select';
import { colors, forms, types, categories } from '../../../SelectOptions';
import { productUrl } from '../../../config';

const set = require('lodash.set');
const { Option } = components;

const ImageOption = (props) => {
    return (
        <Option {...props}>
            <div>
                <img className={styles.optionImage} src={productUrl + props.data.href} alt={props.data.label} />
                {props.data.label}
            </div>
        </Option>
    );
};


class ProductForm extends Component {

    state = {
        title: '',
        description: '',
        details: {},
        price: '',
        category: '',
        image: [],
        errors: {}
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSelectChange = (event, path) => {
        if (path === 'category') {
            return (
                this.setState({
                    category: event
                })
            )
        }
        const details = {...this.state.details};
        set(details, path, event );
        this.setState({
            details: details
        })
    };

    handleImageChange = (image) => {
        this.setState({
            image: image
        });
    };

    removeImage = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            image: []
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const product = new FormData();
        product.append('title', this.state.title);
        product.append('description', this.state.description);
        product.append('price', this.state.price);
        product.append('details', JSON.stringify(this.state.details));
        product.append('category', JSON.stringify(this.state.category));
        product.append('file', this.state.image[0]);

        this.props.createProduct(product, this.props.history);
    };

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.errors !== prevState.errors){
            return {
                errors: nextProps.errors
            };
        }
        return null;
    };

    render() {
        const { errors, image } = this.state;
        return(
            <div className={`container ${styles.container}`}>
                <h2 className={styles.workHeader}>New Product</h2>
                <form onSubmit={ this.handleSubmit }>
                    <div className={`row`}>
                        <div className={`col-sm-12 col-lg-6`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Title:</label>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className={`form-control ${errors.title && 'is-invalid'}`}
                                    name="title"
                                    onChange={ this.handleInputChange }
                                    value={ this.state.title }
                                />
                                {errors.title && (<div className={`invalid-feedback`}>{errors.title}</div>)}
                            </div>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Description:</label>
                                <textarea
                                    placeholder="Description"
                                    className={`form-control ${ styles.textarea} ${errors.description && 'is-invalid'}`}
                                    name="description"
                                    onChange={ this.handleInputChange }
                                    value={ this.state.description }
                                />
                                {errors.description && (<div className={`invalid-feedback`}>{errors.description}</div>)}
                            </div>
                        </div>
                        <div className={`col-sm-12 col-lg-6`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Select type:</label>
                                <Select
                                    placeholder="Type"
                                    className={`${errors.type && 'is-invalid'}`}
                                    name="type"
                                    onChange={ (event) => {this.handleSelectChange(event,'type')} }
                                    value={ this.state.details.type }
                                    options={types}
                                />
                                {errors.type && (<div className={`invalid-feedback`}>{errors.type}</div>)}
                            </div>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Select form:</label>
                                <Select
                                    placeholder="Form"
                                    className={`${errors.form && 'is-invalid'}`}
                                    name="form"
                                    onChange={ (event) => {this.handleSelectChange(event,'form')} }
                                    value={ this.state.details.form }
                                    options={forms}
                                    components={{ Option: ImageOption }}
                                />
                                {errors.form && (<div className={`invalid-feedback`}>{errors.form}</div>)}
                            </div>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Select color:</label>
                                <Select
                                    placeholder="Color"
                                    className={`${errors.color && 'is-invalid'}`}
                                    name="color"
                                    onChange={ (event) => {this.handleSelectChange(event,'color')} }
                                    value={ this.state.details.color }
                                    options={colors}
                                />
                                {errors.color && (<div className={`invalid-feedback`}>{errors.color}</div>)}
                            </div>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Select category:</label>
                                <Select
                                    placeholder="Category"
                                    className={`${errors.category && 'is-invalid'}`}
                                    name="category"
                                    onChange={ (event) => {this.handleSelectChange(event,'category')} }
                                    value={ this.state.category }
                                    options={categories}
                                />
                                {errors.category && (<div className={`invalid-feedback`}>{errors.category}</div>)}
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
                                            image.length > 0 ?
                                            <React.Fragment>
                                                <img
                                                    alt={typeof image === 'object' ? image.name : image}
                                                    src={typeof image === 'object' ? URL.createObjectURL(image[0]) : productUrl + image}
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
                        <button type="submit" className={`btn btn-primary btn-lg`}>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

ProductForm.propTypes = {
    createProduct: PropTypes.func.isRequired,
    product: PropTypes.object,
};

const mapStateToProps = state => ({
    product: state.product.product,
    errors: state.errors
});

export default connect(mapStateToProps,{ createProduct })(withRouter(ProductForm));