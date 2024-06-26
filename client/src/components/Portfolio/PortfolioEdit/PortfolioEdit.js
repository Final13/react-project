import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getWorkById, updateWork } from '../../../actions/portfolio';
import styles from './PortfolioEdit.module.scss';
import Dropzone from 'react-dropzone';
import State from '../../../reducers/state';
import {productUrl, workUrl} from '../../../config'
import Select, { components } from 'react-select';
import { colors, forms, types } from '../../../SelectOptions';

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


class PortfolioEdit extends Component {

    state = {
        work: State.work(),
        errors: {}
    };

    componentDidMount() {
        this.props.getWorkById(this.props.match.params.id);
    }

    handleInputChange = (e) => {
        const work = {...this.state.work};
        work[e.target.name] = e.target.value;
        this.setState({
            work: work
        })
    };

    handleSelectChange = (event, type) => {
        const work = {...this.state.work};
        work[type] = event;
        this.setState({
            work: work
        })
    };

    handleImageChange = (images) => {
        const work = {...this.state.work};
        images.forEach( image => {
            work.images = [...work.images, image];
        });
        this.setState({
            work: work
        });
    };

    removeImage = (event, image) => {
        event.preventDefault();
        event.stopPropagation();

        const work = {...this.state.work};
        work.images = work.images.filter(el => el !== image);
        this.setState({
            work: work
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const work = new FormData();
        work.append('title', this.state.work.title);
        work.append('description', this.state.work.description);
        work.append('type', JSON.stringify(this.state.work.type));
        work.append('form', JSON.stringify(this.state.work.form));
        work.append('color', JSON.stringify(this.state.work.color));
        this.state.work.images.forEach(image => {
            work.append('files', image);
        });
        this.props.updateWork(this.props.match.params.id, work, this.props.history);
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

        if(nextProps.work) {
            this.setState({
                work: nextProps.work
            });
        }
    };

    render() {
        const { errors, work } = this.state;
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
                                    value={ work.title }
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
                                    value={ work.description }
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
                                    value={ work.type }
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
                                    value={ work.form }
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
                                    value={ work.color }
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
                                        {work.images ?
                                            <React.Fragment>
                                                {work.images.map((image, index) => (
                                                    <React.Fragment key={typeof image === 'object' ? index + image.name : index + image}>
                                                        <img
                                                            alt={typeof image === 'object' ? image.name : image}
                                                            src={typeof image === 'object' ? URL.createObjectURL(image): workUrl + image}
                                                            className={styles.thumbImg}
                                                        />
                                                        <i
                                                            className={`fas fa-minus-circle ${styles.removeIcon}`}
                                                            onClick={(event) => {this.removeImage(event, image)}}
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
                            Update
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

PortfolioEdit.propTypes = {
    getWorkById: PropTypes.func.isRequired,
    updateWork: PropTypes.func.isRequired,
    work: PropTypes.object,
};

const mapStateToProps = state => ({
    work: state.work.work,
    errors: state.errors
});

export default connect(mapStateToProps,{ getWorkById, updateWork })(withRouter(PortfolioEdit));