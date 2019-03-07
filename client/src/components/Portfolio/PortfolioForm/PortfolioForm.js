import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createWork } from '../../../actions/portfolio';
import styles from './PortfolioForm.module.scss';
import Dropzone from 'react-dropzone';

class PortfolioForm extends Component {

    state = {
        name: '',
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

    handleImageChange = (images) => {
        this.setState({
            images: images
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const work = {
            name: this.state.name,
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
        return(
            <div className={`container ${styles.container}`}>
                <h2 className={styles.workHeader}>New Work</h2>
                <form onSubmit={ this.handleSubmit }>
                    <div className={`form-group`}>
                        <input
                            type="text"
                            placeholder="Name"
                            className={`form-control form-control-lg ${errors.name && 'is-invalid'}`}
                            name="name"
                            onChange={ this.handleInputChange }
                            value={ this.state.name }
                        />
                        {errors.name && (<div className={`invalid-feedback`}>{errors.name}</div>)}
                    </div>
                    <div className={`form-group`}>
                        <input
                            type="text"
                            placeholder="Description"
                            className={`form-control form-control-lg ${errors.description && 'is-invalid'}`}
                            name="description"
                            onChange={ this.handleInputChange }
                            value={ this.state.description }
                        />
                        {errors.description && (<div className={`invalid-feedback`}>{errors.description}</div>)}
                    </div>
                    <div className={`form-group`}>
                        <input
                            type="text"
                            placeholder="Type"
                            className={`form-control form-control-lg ${errors.type && 'is-invalid'}`}
                            name="type"
                            onChange={ this.handleInputChange }
                            value={ this.state.type }
                        />
                        {errors.type && (<div className={`invalid-feedback`}>{errors.type}</div>)}
                    </div>
                    <div className={`form-group`}>
                        <input
                            type="text"
                            placeholder="Form"
                            className={`form-control form-control-lg ${errors.form && 'is-invalid'}`}
                            name="form"
                            onChange={ this.handleInputChange }
                            value={ this.state.form }
                        />
                        {errors.form && (<div className={`invalid-feedback`}>{errors.form}</div>)}
                    </div>
                    <div className={`form-group`}>
                        <input
                            type="text"
                            placeholder="Color"
                            className={`form-control form-control-lg ${errors.color && 'is-invalid'}`}
                            name="color"
                            onChange={ this.handleInputChange }
                            value={ this.state.color }
                        />
                        {errors.color && (<div className={`invalid-feedback`}>{errors.color}</div>)}
                    </div>
                    <Dropzone onDrop={acceptedFiles => this.handleImageChange(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <div className={`form-group`}>
                        <button type="submit" className={`btn btn-primary`}>
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