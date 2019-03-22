import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createContract } from '../../../actions/contract';
import styles from './ContractForm.module.scss';
import State from '../../../reducers/state';
import Select, { components } from 'react-select';

const { Option } = components;
const set = require('lodash.set');

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

class ContractForm extends Component {

    state = {
        contract: State.contract(),
        errors: {}
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createContract(this.state.contract, this.props.history);
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    render() {
        const { errors, contract } = this.state;
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
                <h2 className={styles.contractHeader}>New Contract</h2>
                <form onSubmit={ this.handleSubmit }>
                    <div className={`row`}>
                        <div className={`col-sm-12 col-lg-6`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Number:</label>
                                <input
                                    type="text"
                                    placeholder="Number"
                                    className={`form-control ${errors.number && 'is-invalid'}`}
                                    name="number"
                                    onChange={ this.handleInputChange }
                                    value={ contract.number }
                                />
                                {errors.number && (<div className={`invalid-feedback`}>{errors.number}</div>)}
                            </div>
                        </div>
                        <div className={`col-sm-12 col-lg-6`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Customer name:</label>
                                <input
                                    type="text"
                                    placeholder="Customer name"
                                    className={`form-control ${errors.customer && 'is-invalid'}`}
                                    name="customer.name"
                                    onChange={ this.handleInputChange }
                                    value={ contract.customer.name }
                                />
                                {errors.customer && (<div className={`invalid-feedback`}>{errors.customer}</div>)}
                            </div>
                        </div>
                        <div className={`col-sm-12 col-lg-6`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Customer phone:</label>
                                <input
                                    type="text"
                                    placeholder="Customer phone"
                                    className={`form-control ${errors.customer && 'is-invalid'}`}
                                    name="customer.phone"
                                    onChange={ this.handleInputChange }
                                    value={ contract.customer.phone }
                                />
                                {errors.customer && (<div className={`invalid-feedback`}>{errors.customer}</div>)}
                            </div>
                        </div>
                        <div className={`col-sm-12 col-lg-6`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Select type:</label>
                                <Select
                                    placeholder="Type"
                                    className={`${errors.stone && 'is-invalid'}`}
                                    name="type"
                                    onChange={ (event) => {this.handleSelectChange(event,'stone.type')} }
                                    value={ contract.stone.type }
                                    options={types}
                                    components={{ Option: ImageOption }}
                                />
                                {errors.stone && (<div className={`invalid-feedback`}>{errors.stone}</div>)}
                            </div>
                        </div>
                        <div className={`col-sm-12 col-lg-6`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Select form:</label>
                                <Select
                                    placeholder="Form"
                                    className={`${errors.stone && 'is-invalid'}`}
                                    name="form"
                                    onChange={ (event) => {this.handleSelectChange(event,'stone.form')} }
                                    value={ contract.stone.form }
                                    options={forms}
                                />
                                {errors.stone && (<div className={`invalid-feedback`}>{errors.stone}</div>)}
                            </div>
                        </div>
                        <div className={`col-sm-12 col-lg-6`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Select color:</label>
                                <Select
                                    placeholder="Color"
                                    className={`${errors.stone && 'is-invalid'}`}
                                    name="color"
                                    onChange={ (event) => {this.handleSelectChange(event,'stone.color')} }
                                    value={ contract.stone.color }
                                    options={colors}
                                />
                                {errors.stone && (<div className={`invalid-feedback`}>{errors.stone}</div>)}
                            </div>
                        </div>
                    </div>
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

ContractForm.propTypes = {
    createContract: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps,{ createContract })(withRouter(ContractForm));