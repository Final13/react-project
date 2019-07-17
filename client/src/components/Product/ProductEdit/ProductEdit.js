import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getProductById, updateProduct } from '../../../actions/product';
import styles from './ProductEdit.module.scss';
import Dropzone from 'react-dropzone';
import State from '../../../reducers/state';
import { productUrl } from '../../../config';
import Tippy from "@tippy.js/react";
// import Select, { components } from 'react-select';
// import { colors, forms, types } from '../../../SelectOptions';

const set = require('lodash.set');

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

    handleImageChange = (image, path) => {
        const product = {...this.state.product};
        set(product, path, image );
        this.setState({
            product: product
        });
    };

    removeImage = (event, path) => {
        event.preventDefault();
        event.stopPropagation();

        const product = {...this.state.product};
        set(product, path, []);
        this.setState({
            product: product
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        console.log(this.state.product.images);
        const product = new FormData();
        product.append('title', this.state.product.title);
        product.append('description', this.state.product.description);
        product.append('price', this.state.product.price);
        product.append('details', JSON.stringify(this.state.product.details));
        product.append('category', JSON.stringify(this.state.product.category));
        product.append('black',
            typeof this.state.product.images.black === 'object' && this.state.product.images.black !== null ?
                this.state.product.images.black[0] :
                this.state.product.images.black
        );
        product.append('red',
            typeof this.state.product.images.red === 'object' && this.state.product.images.red !== null ?
                this.state.product.images.red[0] :
                this.state.product.images.red
        );
        product.append('white',
            typeof this.state.product.images.white === 'object' && this.state.product.images.white !== null ?
                this.state.product.images.white[0] :
                this.state.product.images.white
        );
        product.append('gray',
            typeof this.state.product.images.gray === 'object' && this.state.product.images.gray !== null ?
                this.state.product.images.gray[0] :
                this.state.product.images.gray
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
        const { images } = this.state.product;
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
                                <label className={`pr-3 ${styles.labelFont}`}>
                                    <Tippy
                                        content='Form coefficient compared to square'
                                        arrow={true}
                                        animation="scale"
                                        className={`bg-dark`}
                                        duration={100}
                                        delay={[0, 50]}
                                    >
                                        <i className="far fa-question-circle pr-1" />
                                    </Tippy>
                                    Price coefficient:
                                </label>
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
                    {
                        (images.black.length > 0) && (
                            <div className={styles.dropAreaWrapper}>
                                <div className={`col-sm-12 col-sm-6 col-xl-3`}>
                                    <Tippy
                                        content='Click for edit'
                                        arrow={true}
                                        animation="scale"
                                        className={`bg-dark`}
                                        duration={100}
                                        delay={[0, 50]}
                                    >
                                        <div>
                                            <div className={`pb-2`}>Black:</div>
                                            <Dropzone
                                                multiple={false}
                                                onDrop={(acceptedFiles) => {this.handleImageChange(acceptedFiles, 'images.black')}}
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
                                    </Tippy>
                                </div>
                                <div className={`col-sm-12 col-sm-6 col-xl-3`}>
                                    <Tippy
                                        content='Click for edit'
                                        arrow={true}
                                        animation="scale"
                                        className={`bg-dark`}
                                        duration={100}
                                        delay={[0, 50]}
                                    >
                                        <div>
                                            <div className={`pb-2`}>Red:</div>
                                            <Dropzone
                                                multiple={false}
                                                onDrop={(acceptedFiles) => {this.handleImageChange(acceptedFiles, 'images.red')}}
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
                                    </Tippy>
                                </div>
                                <div className={`col-sm-12 col-sm-6 col-xl-3`}>
                                    <Tippy
                                        content='Click for edit'
                                        arrow={true}
                                        animation="scale"
                                        className={`bg-dark`}
                                        duration={100}
                                        delay={[0, 50]}
                                    >
                                        <div>
                                            <div className={`pb-2`}>White:</div>
                                            <Dropzone
                                                multiple={false}
                                                onDrop={(acceptedFiles) => {this.handleImageChange(acceptedFiles, 'images.white')}}
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
                                    </Tippy>
                                </div>
                                <div className={`col-sm-12 col-sm-6 col-xl-3`}>
                                    <Tippy
                                        content='Click for edit'
                                        arrow={true}
                                        animation="scale"
                                        className={`bg-dark`}
                                        duration={100}
                                        delay={[0, 50]}
                                    >
                                        <div>
                                            <div className={`pb-2`}>Gray:</div>
                                            <Dropzone
                                                multiple={false}
                                                onDrop={(acceptedFiles) => {this.handleImageChange(acceptedFiles, 'images.gray')}}
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
                                    </Tippy>
                                </div>
                            </div>
                        )
                    }
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