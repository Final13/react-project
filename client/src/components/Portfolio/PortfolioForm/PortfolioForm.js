import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createWork } from '../../../actions/portfolio';
import styles from './PortfolioForm.module.scss';
import Dropzone from 'react-dropzone';
import Select, { components } from 'react-select';
import { colors, forms, types } from '../../../SelectOptions';

const { Option } = components;

const ImageOption = (props) => {
    return (
        <Option {...props}>
            <div>
                <img className={styles.optionImage} src={props.data.href} alt={props.data.label} />
                {props.data.label}
            </div>
        </Option>
    );
};


class PortfolioForm extends Component {

    state = {
        title: '',
        description: '',
        type: '',
        form: '',
        color: '',
        images: [],
        errors: {}
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSelectChange = (event, type) => {
        this.setState({
            [type]: event
        })
    };

    handleImageChange = (images) => {
        images.forEach( image => {
            this.setState({
                images: [...this.state.images, image]
            });
        });
    };

    removeImage = (event, image) => {
        event.preventDefault();
        event.stopPropagation();
        const images = this.state.images.filter(el => el !== image);
        this.setState({
            images: images
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const work = new FormData();
        work.append('title', this.state.title);
        work.append('description', this.state.description);
        work.append('type', JSON.stringify(this.state.type));
        work.append('form', JSON.stringify(this.state.form));
        work.append('color', JSON.stringify(this.state.color));
        this.state.images.forEach(image => {
            work.append('files', image);
        });

        this.props.createWork(work, this.props.history);
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
        const { errors } = this.state;
        return(
            <div className={`container ${styles.container}`}>
                <h2 className={styles.workHeader}>New Work</h2>
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
                                    value={ this.state.type }
                                    options={types}
                                    components={{ Option: ImageOption }}
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
                                    value={ this.state.form }
                                    options={forms}
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
                                    value={ this.state.color }
                                    options={colors}
                                />
                                {errors.color && (<div className={`invalid-feedback`}>{errors.color}</div>)}
                            </div>
                        </div>
                    </div>
                    <Dropzone onDrop={(acceptedFiles) => {this.handleImageChange(acceptedFiles)}}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className={`mb-4 ${styles.dropArea}`}>
                                        {this.state.images.length > 0 ?
                                            <React.Fragment>
                                                {this.state.images.map((image, index) => (
                                                    <React.Fragment key={ index + image.name }>
                                                        <img
                                                            alt={image.name}
                                                            src={URL.createObjectURL(image)}
                                                            className={styles.thumbImg}
                                                        />
                                                        <i
                                                            className={`fas fa-minus-circle ${styles.removeIcon}`}
                                                            onClick={(event) => { this.removeImage(event, image)}}
                                                        />
                                                    </React.Fragment>
                                                ))}
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

PortfolioForm.propTypes = {
    createWork: PropTypes.func.isRequired,
    work: PropTypes.object,
};

const mapStateToProps = state => ({
    work: state.work.work,
    errors: state.errors
});

export default connect(mapStateToProps,{ createWork })(withRouter(PortfolioForm));