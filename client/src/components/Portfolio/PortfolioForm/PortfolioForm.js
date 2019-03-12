import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createWork } from '../../../actions/portfolio';
import styles from './PortfolioForm.module.scss';
import Dropzone from 'react-dropzone';
import Select, { components } from 'react-select';
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
        this.setState({
            images: [...images]
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const work = {
            title: this.state.title,
            description: this.state.description,
            type: this.state.type,
            form: this.state.form,
            color: this.state.color,
            images: this.state.images
        };
        this.props.createWork(work, this.props.history);
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    render() {
        const { errors } = this.state;
        const types = [
            {value: 'square', label: 'square', href: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/1200px-Square_-_black_simple.svg.png'},
            {value: 'triangle', label: 'Triangle', href: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Regular_triangle.svg/1024px-Regular_triangle.svg.png'}
        ];

        const colors = [
            {value: 'black', label: 'Black'},
            {value: 'white', label: 'White'},
            {value: 'red', label: 'Red'},
            {value: 'green', label: 'Green'}
        ];
        const forms = [
            {value: 'single', label: 'Single'},
            {value: 'double', label: 'Double'}
        ];
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
                                                {this.state.images.map((image) => (
                                                    <img
                                                        alt={image.name}
                                                        key={image.name}
                                                        src={URL.createObjectURL(image)}
                                                        className={styles.thumbImg}
                                                    />
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
    work: state.work,
    errors: state.errors
});

export default connect(mapStateToProps,{ createWork })(withRouter(PortfolioForm));