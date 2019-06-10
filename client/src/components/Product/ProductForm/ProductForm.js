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
                {
                    props.data.href &&
                    <img className={styles.optionImage} src={`${productUrl + props.data.href}black.jpg`} alt={props.data.label} />
                }
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
        category: {value: '', Label: ''},
        images: {
            black: [],
            red: [],
            white: [],
            gray: []
        },
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

    handleImageChange = (image, path) => {
        const images = {...this.state.images};
        set(images, path, image );
        this.setState({
            images: images
        });
    };

    removeImage = (event, path) => {
        event.preventDefault();
        event.stopPropagation();
        const images = {...this.state.images};
        images[path] = [];
        this.setState({
            images: images
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const product = new FormData();
        product.append('title', this.state.title);
        product.append('description', this.state.description);
        product.append('price', this.state.price);
        product.append('details', this.state.details ? JSON.stringify(this.state.details) : {detail: {value: 'all', Label: 'All'}});
        product.append('category', this.state.category ? JSON.stringify(this.state.category) : {value: 'all', Label: 'All'});
        product.append('black', this.state.images.black[0]);
        product.append('red', this.state.images.red[0]);
        product.append('white', this.state.images.white[0]);
        product.append('gray', this.state.images.gray[0]);

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
        const { errors, images } = this.state;
        return(
            <div className={`container ${styles.container}`}>
                <h2 className={styles.workHeader}>New Product</h2>
                <form onSubmit={ this.handleSubmit }>
                    <div className={`row`}>
                        <div className={`col-sm-12 col-lg-6`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Title:</label>
                                <input
                                    type='text'
                                    placeholder="Title"
                                    className={`form-control ${errors.title && 'is-invalid'}`}
                                    name='title'
                                    onChange={ this.handleInputChange }
                                    value={ this.state.title }
                                />
                                {errors.title && (<div className={`invalid-feedback`}>{errors.title}</div>)}
                            </div>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Select category:</label>
                                <Select
                                    placeholder='Category'
                                    className={`${errors.category && 'is-invalid'}`}
                                    name='category'
                                    onChange={ (event) => {this.handleSelectChange(event,'category')} }
                                    value={ this.state.category }
                                    options={categories}
                                />
                                {errors.category && (<div className={`invalid-feedback`}>{errors.category}</div>)}
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
                                    value={ this.state.price }
                                />
                                {errors.price && (<div className={`invalid-feedback`}>{errors.price}</div>)}
                            </div>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Description:</label>
                                <textarea
                                    placeholder='Description'
                                    className={`form-control ${ styles.textarea} ${errors.description && 'is-invalid'}`}
                                    name='description'
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
                                    placeholder='Type'
                                    className={`${errors.type && 'is-invalid'}`}
                                    name='type'
                                    onChange={ (event) => {this.handleSelectChange(event,'type')} }
                                    value={ this.state.details.type }
                                    options={types}
                                />
                                {errors.type && (<div className={`invalid-feedback`}>{errors.type}</div>)}
                            </div>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Select form:</label>
                                <Select
                                    placeholder='Form'
                                    className={`${errors.form && 'is-invalid'}`}
                                    name='form'
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
                                    placeholder='Color'
                                    className={`${errors.color && 'is-invalid'}`}
                                    name='color'
                                    onChange={ (event) => {this.handleSelectChange(event,'color')} }
                                    value={ this.state.details.color }
                                    options={colors}
                                />
                                {errors.color && (<div className={`invalid-feedback`}>{errors.color}</div>)}
                            </div>
                        </div>
                    </div>
                    <div className={styles.dropAreaWrapper}>
                        <div className={`col-3`}>
                            <div>Black:</div>
                            <Dropzone
                                multiple={false}
                                onDrop={(acceptedFiles) => {this.handleImageChange(acceptedFiles, 'black')}}
                            >
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <div className={`mb-4 ${styles.dropArea}`}>
                                                {
                                                    images.black.length > 0 ?
                                                        <React.Fragment>
                                                            <img
                                                                alt={typeof images.black === 'object' ? images.black.name : images.black}
                                                                src={typeof images.black === 'object' ? URL.createObjectURL(images.black[0]) : productUrl + images.black}
                                                                className={styles.thumbImg}
                                                            />
                                                            <i
                                                                className={`fas fa-minus-circle ${styles.removeIcon}`}
                                                                onClick={ (event) => {this.removeImage(event,'black')} }
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
                        </div>
                        <div className={`col-3`}>
                            <div>Red:</div>
                            <Dropzone
                                multiple={false}
                                onDrop={(acceptedFiles) => {this.handleImageChange(acceptedFiles, 'red')}}
                            >
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <div className={`mb-4 ${styles.dropArea}`}>
                                                {
                                                    images.red.length > 0 ?
                                                        <React.Fragment>
                                                            <img
                                                                alt={typeof images.red === 'object' ? images.red.name : images.red}
                                                                src={typeof images.red === 'object' ? URL.createObjectURL(images.red[0]) : productUrl + images.red}
                                                                className={styles.thumbImg}
                                                            />
                                                            <i
                                                                className={`fas fa-minus-circle ${styles.removeIcon}`}
                                                                onClick={ (event) => {this.removeImage(event,'red')} }
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
                        </div>
                        <div className={`col-3`}>
                            <div>White:</div>
                            <Dropzone
                                multiple={false}
                                onDrop={(acceptedFiles) => {this.handleImageChange(acceptedFiles, 'white')}}
                            >
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <div className={`mb-4 ${styles.dropArea}`}>
                                                {
                                                    images.white.length > 0 ?
                                                        <React.Fragment>
                                                            <img
                                                                alt={typeof images.white === 'object' ? images.white.name : images.white}
                                                                src={typeof images.white === 'object' ? URL.createObjectURL(images.white[0]) : productUrl + images.white}
                                                                className={styles.thumbImg}
                                                            />
                                                            <i
                                                                className={`fas fa-minus-circle ${styles.removeIcon}`}
                                                                onClick={ (event) => {this.removeImage(event,'white')} }
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
                        </div>
                        <div className={`col-3`}>
                            <div>Gray:</div>
                            <Dropzone
                                multiple={false}
                                onDrop={(acceptedFiles) => {this.handleImageChange(acceptedFiles, 'gray')}}
                            >
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <div className={`mb-4 ${styles.dropArea}`}>
                                                {
                                                    images.gray.length > 0 ?
                                                        <React.Fragment>
                                                            <img
                                                                alt={typeof images.gray === 'object' ? images.gray.name : images.gray}
                                                                src={typeof images.gray === 'object' ? URL.createObjectURL(images.gray[0]) : productUrl + images.gray}
                                                                className={styles.thumbImg}
                                                            />
                                                            <i
                                                                className={`fas fa-minus-circle ${styles.removeIcon}`}
                                                                onClick={ (event) => {this.removeImage(event,'gray')} }
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
                        </div>
                    </div>
                    <div className={`form-group text-right`}>
                        <button type='submit' className={`btn btn-primary btn-lg`}>
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