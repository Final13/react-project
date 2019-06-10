import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createContract } from '../../../actions/contract';
import { getAllBuilders } from '../../../actions/builder';
import styles from './ContractForm.module.scss';
import State from '../../../reducers/state';
import Select, { components } from 'react-select';
import { colors, forms, types } from '../../../SelectOptions';
import { productUrl } from '../../../config';

const { Option } = components;
const set = require('lodash.set');

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

class ContractForm extends Component {

    state = {
        contract: State.contract(),
        errors: {},
        newBuilder: false
    };

    componentDidMount() {
        this.props.getAllBuilders();
    }

    toggleBuilder = (e) => {
        e.preventDefault();
        const contract = {...this.state.contract};
        contract.builder = {
            value: '',
            label: '',
            name: '',
            phone: '',
        };

        this.setState({
            newBuilder: !this.state.newBuilder,
            contract: contract
        })
    };

    handleInputChange = (e) => {
        const contract = {...this.state.contract};
        set(contract, e.target.name, e.target.value );
        this.setState({
            contract: contract
        });
    };

    handleSelectChange = (event, path) => {
        const contract = {...this.state.contract};
        set(contract, path, event );
        this.setState({
            contract: contract
        });
    };

    handleCustomForm = () => {
        const contract = {...this.state.contract};
        contract.customForm = !this.state.contract.customForm;
        this.setState({
            contract: contract
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const contract = {...this.state.contract};
        contract.image = (contract.stone.form && contract.stone.color) ? (contract.stone.form.href + contract.stone.color.href) : '';
        if (this.state.contract.customForm) {
            contract.image = '';
        }
        this.props.createContract(contract, this.props.history);
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
        const { errors, contract } = this.state;
        const { builders } = this.props;
        return(
            <div className={`container ${styles.container}`}>
                <form onSubmit={ this.handleSubmit }>
                    <div className={`d-flex justify-content-center`}>
                        <h2 className={`d-inline-block pr-2 ${styles.contractHeader}`}>New Contract №</h2>
                        <input
                            type="text"
                            placeholder="Number"
                            className={`d-inline form-control ${styles.numberInput} ${errors.number && 'is-invalid'}`}
                            name="number"
                            onChange={ this.handleInputChange }
                            value={ contract.number }
                        />
                        {errors.number && (<div className={`invalid-feedback`}>{errors.number}</div>)}
                    </div>
                    <div className={`row`}>
                        <div className={`col-sm-12`}>
                            <div className={`row`}>
                                <div className={`col-4 text-left`}>
                                    <label className={`inputContainer`}>
                                        Custom form?
                                        <input
                                            type="checkbox"
                                            onChange={this.handleCustomForm}
                                            checked={contract.customForm || false}
                                        />
                                        <span className={`checkMark`} />
                                    </label>
                                    <div
                                        className={`${styles.imageArea} ${(contract.customForm || !contract.stone.form.href || !contract.stone.color.href) && 'border'}`}
                                    >
                                        {
                                            (!contract.customForm && contract.stone.form.href && contract.stone.color.href) && (
                                                <img
                                                    className={styles.image}
                                                    src={productUrl + contract.stone.form.href + contract.stone.color.href}
                                                    alt={`${contract.stone.form.label} ${contract.stone.color.label}`}
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                                <div className={`col-4`}>
                                    <div className={`col-12`}>
                                        <div className={`form-group text-left`}>
                                            <label className={`pr-3 ${styles.labelFont}`}>Select form:</label>
                                            <Select
                                                placeholder="Form"
                                                className={`${styles.selectWithFormControl}form-control ${errors.stone && 'is-invalid'}`}
                                                name="form"
                                                onChange={ (event) => {this.handleSelectChange(event,'stone.form')} }
                                                value={ contract.stone.form }
                                                options={forms}
                                                components={{ Option: ImageOption }}
                                            />
                                            {errors.stone && (<div className={`invalid-feedback`}>{errors.stone}</div>)}
                                        </div>
                                    </div>
                                    <div className={`col-12`}>
                                        <div className={`form-group text-left`}>
                                            <label className={`pr-3 ${styles.labelFont}`}>Select color:</label>
                                            <Select
                                                placeholder="Color"
                                                className={`${styles.selectWithFormControl}form-control ${errors.stone && 'is-invalid'}`}
                                                name="color"
                                                onChange={ (event) => {this.handleSelectChange(event,'stone.color')} }
                                                value={ contract.stone.color }
                                                options={colors}
                                            />
                                            {errors.stone && (<div className={`invalid-feedback`}>{errors.stone}</div>)}
                                        </div>
                                    </div>
                                    <div className={`col-12`}>
                                        <div className={`form-group text-left`}>
                                            <label className={`pr-3 ${styles.labelFont}`}>Select type:</label>
                                            <Select
                                                placeholder="Type"
                                                className={`${styles.selectWithFormControl}form-control ${errors.stone && 'is-invalid'}`}
                                                name="type"
                                                onChange={ (event) => {this.handleSelectChange(event,'stone.type')} }
                                                value={ contract.stone.type }
                                                options={types}
                                            />
                                            {errors.stone && (<div className={`invalid-feedback`}>{errors.stone}</div>)}
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-4`}>
                                    <div className={`col-sm-12 border p-4`}>
                                        <div className={`align-text-middle`}>
                                            <label className={`pr-3 ${styles.labelFont}`}>
                                                {
                                                    this.state.newBuilder ? 'New builder:' : 'Select Builder:'
                                                }
                                            </label>
                                            <button
                                                onClick={this.toggleBuilder}
                                                className={`btn btn-link pl-1 ${styles.addButton}`}
                                            >
                                                {
                                                    this.state.newBuilder ? 'Select builder' : 'Add new builder'
                                                }
                                            </button>
                                        </div>
                                        {
                                            !this.state.newBuilder &&
                                            <div className={`form-group text-left`}>
                                                <Select
                                                    placeholder="Builder"
                                                    className={`${styles.selectWithFormControl} form-control ${errors.builder && 'is-invalid'}`}
                                                    name="builder"
                                                    onChange={ (event) => {this.handleSelectChange(event,'builder')} }
                                                    value={ contract.builder }
                                                    options={builders}
                                                />
                                                {errors.builder && (<div className={`invalid-feedback`}>{errors.builder}</div>)}
                                            </div>
                                        }
                                        {
                                            this.state.newBuilder &&
                                            <div>
                                                <div className={`form-group text-left`}>
                                                    <label className={`pr-3 ${styles.labelFont}`}>Builder name:</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Builder Name"
                                                        className={`form-control ${errors.builderName && 'is-invalid'}`}
                                                        name="builder.name"
                                                        onChange={ this.handleInputChange }
                                                        value={ contract.builder.name }
                                                    />
                                                    {errors.builderName && (<div className={`invalid-feedback`}>{errors.builderName}</div>)}
                                                </div>
                                                <div className={`form-group text-left`}>
                                                    <label className={`pr-3 ${styles.labelFont}`}>Builder phone:</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Builder Phone"
                                                        className={`form-control ${errors.builderPhone && 'is-invalid'}`}
                                                        name="builder.phone"
                                                        onChange={ this.handleInputChange }
                                                        value={ contract.builder.phone }
                                                    />
                                                    {errors.builderPhone && (<div className={`invalid-feedback`}>{errors.builderPhone}</div>)}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`col-sm-12 col-lg-6`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Customer name:</label>
                                <input
                                    type="text"
                                    placeholder="Customer name"
                                    className={`form-control ${errors.customerName && 'is-invalid'}`}
                                    name="customer.name"
                                    onChange={ this.handleInputChange }
                                    value={ contract.customer.name }
                                />
                                {errors.customerName && (<div className={`invalid-feedback`}>{errors.customerName}</div>)}
                            </div>
                        </div>
                        <div className={`col-sm-12 col-lg-6`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Customer phone:</label>
                                <input
                                    type="text"
                                    placeholder="Customer phone"
                                    className={`form-control ${errors.customerPhone && 'is-invalid'}`}
                                    name="customer.phone"
                                    onChange={ this.handleInputChange }
                                    value={ contract.customer.phone }
                                />
                                {errors.customerPhone && (<div className={`invalid-feedback`}>{errors.customerPhone}</div>)}
                            </div>
                        </div>
                        <div className={`col-sm-12 col-lg-6`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Info name:</label>
                                <input
                                    type="text"
                                    placeholder="Info Name"
                                    className={`form-control ${errors.info && 'is-invalid'}`}
                                    name="info.firstName"
                                    onChange={ this.handleInputChange }
                                    value={ contract.info.firstName }
                                />
                                {errors.info && (<div className={`invalid-feedback`}>{errors.info}</div>)}
                            </div>
                        </div>
                        <div className={`col-sm-12 col-lg-6`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Info2 name:</label>
                                <input
                                    type="text"
                                    placeholder="Info2 Name"
                                    className={`form-control ${errors.info2 && 'is-invalid'}`}
                                    name="info2.firstName"
                                    onChange={ this.handleInputChange }
                                    value={ contract.info2.firstName }
                                />
                                {errors.info2 && (<div className={`invalid-feedback`}>{errors.info2}</div>)}
                            </div>
                        </div>
                    </div>
                    <div className={`form-group text-right pt-3`}>
                        <button type="submit" className={`btn btn-primary btn-lg`}>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

ContractForm.propTypes = {
    createContract: PropTypes.func.isRequired,
    getAllBuilders: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors,
    builders: state.builder.builders,
});

export default connect(mapStateToProps,{ createContract, getAllBuilders })(withRouter(ContractForm));