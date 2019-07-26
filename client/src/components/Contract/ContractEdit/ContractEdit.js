import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getContractById, updateContract } from '../../../actions/contract';
import { getAllBuilders } from '../../../actions/builder';
import styles from './ContractEdit.module.scss';
import State from '../../../reducers/state';
import Select, { components } from 'react-select';
import { colors, forms, types, sizes } from '../../../SelectOptions';
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


class ContractEdit extends Component {

    state = {
        contract: State.contract(),
        errors: {},
        newBuilder: false
    };

    componentDidMount() {
        this.props.getContractById(this.props.match.params.id);
        this.props.getAllBuilders();
    };

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
        set(contract, e.target.name, e.target.value);
        this.setState({
            contract: contract
        });
    };

    handleArrayChange = (event, array, index) => {
        const contract = {...this.state.contract};
        contract[array][event.target.name] = event.target.value;
        if (typeof index !== 'undefined') {
            contract[array][[index]][event.target.name] = event.target.value;
        }
        this.setState({
            contract: contract
        });
    };

    handleSelectChange = (event, path) => {
        const contract = {...this.state.contract};
        set(contract, path, event);
        if (path === 'stone.size') {
            contract.extra.stand = (contract.stone.type.value === 'horizontal') ? event.horizontalStand : event.stand;
            contract.extra.flowerGarden = (contract.stone.type.value === 'horizontal') ? event.horizontalFlowerGarden : event.flowerGarden;
        }
        if (path === 'stone.type') {
            contract.extra.stand = (event.value === 'horizontal') ? contract.stone.size.horizontalStand : contract.stone.size.stand;
            contract.extra.flowerGarden = (event.value === 'horizontal') ? contract.stone.size.horizontalFlowerGarden : contract.stone.size.flowerGarden;
        }
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

    handlePaymentsChange = (event, index) => {
        const contract = {...this.state.contract};
        contract.payments[index] = Number(event.target.value);
        this.setState({
            contract: contract
        });
    };

    addPayment = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const contract = {...this.state.contract};
        contract.payments = [...contract.payments, 0];
        this.setState({
            contract: contract
        });
    };

    addInfoSection = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const info = {
            firstName: '',
            secondName: '',
            lastName: '',
            date: ''
        };
        const contract = {...this.state.contract};
        contract.mainInfo = [...contract.mainInfo, info];
        this.setState({
            contract: contract
        });
    };


    removeInfoSection = (event, index) => {
        event.preventDefault();
        event.stopPropagation();
        const contract = {...this.state.contract};
        contract.mainInfo.splice(index, 1);
        this.setState({
            contract: contract
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const contract = {...this.state.contract};
        contract.image = (contract.stone.form && contract.stone.color) ? (contract.stone.form.href + contract.stone.color.href) : '';
        if (this.state.customForm) {
            contract.image = '';
        }
        this.props.updateContract(this.props.match.params.id, contract, this.props.history);
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

        if(nextProps.contract) {
            this.setState({
                contract: nextProps.contract
            });
        }
    };

    render() {
        const { errors, contract } = this.state;
        const { builders } = this.props;
        const customStyles = {
            option: (provided) => ({
                ...provided,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }),
        };
        return(
            <div className={`container ${styles.container}`}>
                <form onSubmit={ this.handleSubmit }>
                    <div className={`d-flex justify-content-center`}>
                        <h2 className={`d-inline-block pr-2 ${styles.contractHeader}`}>Contract №</h2>
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
                        <div className={`col-sm-12 mb-5`}>
                            <div className={`row`}>
                                <div className={`col-3 text-left`}>
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
                                        className={`${styles.imageArea} ${(contract.customForm || !contract.stone.form.href || !contract.stone.color.href) && 'border rounded'}`}
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
                                <div className={`col-3`}>
                                    <div className={`col-12`}>
                                        <div className={`form-group text-left`}>
                                            <label className={`pr-3 ${styles.labelFont}`}>Select form:</label>
                                            <Select
                                                placeholder="Form"
                                                className={`${styles.selectWithFormControl} form-control ${errors.stone && 'is-invalid'}`}
                                                styles={customStyles}
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
                                                className={`${styles.selectWithFormControl} form-control ${errors.stone && 'is-invalid'}`}
                                                styles={customStyles}
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
                                                className={`${styles.selectWithFormControl} form-control ${errors.stone && 'is-invalid'}`}
                                                styles={customStyles}
                                                name="type"
                                                onChange={ (event) => {this.handleSelectChange(event,'stone.type')} }
                                                value={ contract.stone.type }
                                                options={types}
                                            />
                                            {errors.stone && (<div className={`invalid-feedback`}>{errors.stone}</div>)}
                                        </div>
                                    </div>
                                    <div className={`col-12`}>
                                        <div className={`form-group text-left`}>
                                            <label className={`pr-3 ${styles.labelFont}`}>Select size:</label>
                                            <Select
                                                placeholder="Size"
                                                className={`${styles.selectWithFormControl} form-control ${errors.size && 'is-invalid'}`}
                                                styles={customStyles}
                                                name="size"
                                                onChange={ (event) => {this.handleSelectChange(event, 'stone.size')} }
                                                value={ contract.stone.size }
                                                options={sizes}
                                            />
                                            {errors.size && (<div className={`invalid-feedback`}>{errors.size}</div>)}
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-3`}>
                                    <div className={`col-12`}>
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
                                    <div className={`col-12`}>
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
                                </div>
                                <div className={`col-3`}>
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
                                                    className={`${styles.selectWithFormControl} ${styles.zIndex1000} form-control ${errors.builder && 'is-invalid'}`}
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
                        <div className={`col-sm-12 bm-5`}>
                            <div className={`row`}>
                                <div className={`col-6`}>
                                    <div className={`form-group text-left`}>
                                        <label className={`pr-3 ${styles.labelFont}`}>Stand:</label>
                                        <input
                                            type="text"
                                            placeholder="Stand"
                                            className={`form-control ${errors.stand && 'is-invalid'}`}
                                            name="extra.stand"
                                            onChange={ this.handleInputChange }
                                            value={ contract.extra.stand }
                                        />
                                        {errors.stand && (<div className={`invalid-feedback`}>{errors.stand}</div>)}
                                    </div>
                                </div>
                                <div className={`col-6`}>
                                    <div className={`form-group text-left`}>
                                        <label className={`pr-3 ${styles.labelFont}`}>Flower Garden:</label>
                                        <input
                                            type="text"
                                            placeholder="Flower Garden"
                                            className={`form-control ${errors.flowerGarden && 'is-invalid'}`}
                                            name="extra.flowerGarden"
                                            onChange={ this.handleInputChange }
                                            value={ contract.extra.flowerGarden }
                                        />
                                        {errors.flowerGarden && (<div className={`invalid-feedback`}>{errors.flowerGarden}</div>)}
                                    </div>
                                </div>
                                <div className={`col-6`}>
                                    <div className={`form-group text-left`}>
                                        <label className={`pr-3 ${styles.labelFont}`}>Tombstone:</label>
                                        <input
                                            type="text"
                                            placeholder="Tombstone"
                                            className={`form-control ${errors.tombstone && 'is-invalid'}`}
                                            name="extra.tombstone"
                                            onChange={ this.handleInputChange }
                                            value={ contract.extra.tombstone }
                                        />
                                        {errors.tombstone && (<div className={`invalid-feedback`}>{errors.tombstone}</div>)}
                                    </div>
                                </div>
                                <div className={`col-6`}>
                                    <div className={`form-group text-left`}>
                                        <label className={`pr-3 ${styles.labelFont}`}>Vase:</label>
                                        <input
                                            type="text"
                                            placeholder="Vase"
                                            className={`form-control ${errors.vase && 'is-invalid'}`}
                                            name="extra.vase"
                                            onChange={ this.handleInputChange }
                                            value={ contract.extra.vase }
                                        />
                                        {errors.vase && (<div className={`invalid-feedback`}>{errors.vase}</div>)}
                                    </div>
                                </div>
                                <div className={`col-12`}>
                                    <div className={`form-group text-left`}>
                                        <label className={`pr-3 ${styles.labelFont}`}>Adds:</label>
                                        <textarea
                                            placeholder="Adds"
                                            className={`form-control ${errors.adds && 'is-invalid'}`}
                                            name="extra.adds"
                                            onChange={ this.handleInputChange }
                                            value={ contract.extra.adds }
                                        />
                                        {errors.adds && (<div className={`invalid-feedback`}>{errors.adds}</div>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`d-flex col-12 mt-5 border rounded-top`}>
                            <button className={`btn btn-link ${styles.addInfo}`} onClick={ this.addInfoSection }>
                                Add info section
                            </button>
                            {
                                contract.mainInfo.map( (info, index) => (
                                    <div className={`w-100 position-relative ${(index > 0) && 'ml-2 pl-2 border-left'}`} key={index}>
                                        <button
                                            className={`btn btn-link ${styles.removeButton}`}
                                            onClick={ event => this.removeInfoSection(event, index) }
                                        >
                                            Clear
                                        </button>
                                        <div className={`row`}>
                                            <div className={`col-12`}>
                                                <div className={`form-group text-left`}>
                                                    <label className={`pr-3 ${styles.labelFont}`}>First name:</label>
                                                    <input
                                                        type="text"
                                                        placeholder="First name"
                                                        className={`form-control ${errors.info && 'is-invalid'}`}
                                                        name="firstName"
                                                        onChange={ event => {this.handleArrayChange(event, 'mainInfo', index)} }
                                                        value={ info.firstName }
                                                    />
                                                    {errors.info && (<div className={`invalid-feedback`}>{errors.info}</div>)}
                                                </div>
                                            </div>
                                            <div className={`col-12`}>
                                                <div className={`form-group text-left`}>
                                                    <label className={`pr-3 ${styles.labelFont}`}>Second name:</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Second Name"
                                                        className={`form-control ${errors.info && 'is-invalid'}`}
                                                        name="secondName"
                                                        onChange={ event => {this.handleArrayChange(event, 'mainInfo', index)} }
                                                        value={ info.secondName }
                                                    />
                                                    {errors.info && (<div className={`invalid-feedback`}>{errors.info}</div>)}
                                                </div>
                                            </div>
                                            <div className={`col-12`}>
                                                <div className={`form-group text-left`}>
                                                    <label className={`pr-3 ${styles.labelFont}`}>Last name:</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Last Name"
                                                        className={`form-control ${errors.info && 'is-invalid'}`}
                                                        name="lastName"
                                                        onChange={ event => {this.handleArrayChange(event, 'mainInfo', index)} }
                                                        value={ info.lastName }
                                                    />
                                                    {errors.info && (<div className={`invalid-feedback`}>{errors.info}</div>)}
                                                </div>
                                            </div>
                                            <div className={`col-12`}>
                                                <div className={`form-group text-left`}>
                                                    <label className={`pr-3 ${styles.labelFont}`}>Date:</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Date"
                                                        className={`form-control ${errors.info && 'is-invalid'}`}
                                                        name="date"
                                                        onChange={ event => {this.handleArrayChange(event, 'mainInfo', index)} }
                                                        value={ info.date }
                                                    />
                                                    {errors.info && (<div className={`invalid-feedback`}>{errors.info}</div>)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) )
                            }
                        </div>
                        <div className={`col-12 mb-5 border border-top-0 pt-3 rounded-bottom`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>Epitaph:</label>
                                <input
                                    type="text"
                                    placeholder="Epitaph"
                                    className={`form-control ${errors.info && 'is-invalid'}`}
                                    name="epitaph"
                                    onChange={ event => {this.handleArrayChange(event,  'otherInfo')} }
                                    value={ contract.otherInfo.epitaph }
                                />
                                {errors.info && (<div className={`invalid-feedback`}>{errors.info}</div>)}
                            </div>
                        </div>
                        <div className={`d-flex mt-5`}>
                            <div className={`col-6`}>
                                <div className={`row`}>
                                    <div className={`col-12`}>
                                        <div className={`form-group text-left`}>
                                            <label className={`pr-3 ${styles.labelFont}`}>Cemetery address:</label>
                                            <input
                                                type="text"
                                                placeholder="Cemetery"
                                                className={`form-control ${errors.cemetery && 'is-invalid'}`}
                                                name="address"
                                                onChange={ event => {this.handleArrayChange(event,  'cemetery')} }
                                                value={ contract.cemetery.address }
                                            />
                                            {errors.cemetery && (<div className={`invalid-feedback`}>{errors.cemetery}</div>)}
                                        </div>
                                    </div>
                                    <div className={`col-6`}>
                                        <div className={`form-group text-left`}>
                                            <label className={`pr-3 ${styles.labelFont}`}>Cemetery sector:</label>
                                            <input
                                                type="text"
                                                placeholder="Sector"
                                                className={`form-control ${errors.cemetery && 'is-invalid'}`}
                                                name="sector"
                                                onChange={ event => {this.handleArrayChange(event,  'cemetery')} }
                                                value={ contract.cemetery.sector }
                                            />
                                            {errors.cemetery && (<div className={`invalid-feedback`}>{errors.cemetery}</div>)}
                                        </div>
                                    </div>
                                    <div className={`col-6`}>
                                        <div className={`form-group text-left`}>
                                            <label className={`pr-3 ${styles.labelFont}`}>Cemetery place:</label>
                                            <input
                                                type="text"
                                                placeholder="Place"
                                                className={`form-control ${errors.cemetery && 'is-invalid'}`}
                                                name="place"
                                                onChange={ event => {this.handleArrayChange(event,  'cemetery')} }
                                                value={ contract.cemetery.place }
                                            />
                                            {errors.cemetery && (<div className={`invalid-feedback`}>{errors.cemetery}</div>)}
                                        </div>
                                    </div>
                                    <div className={`col-12`}>
                                        <div className={`form-group text-left`}>
                                            <label className={`pr-3 ${styles.labelFont}`}>Install date:</label>
                                            {
                                                contract.install ? (
                                                    <input
                                                        type="date"
                                                        placeholder="Date"
                                                        className={`form-control ${errors.install && 'is-invalid'}`}
                                                        name="install"
                                                        onChange={ this.handleInputChange }
                                                        value={ new Date(contract.install).toISOString().split('T')[0] }
                                                    />
                                                ) : (
                                                    <input
                                                        type="date"
                                                        placeholder="Date"
                                                        className={`form-control ${errors.install && 'is-invalid'}`}
                                                        name="install"
                                                        onChange={ this.handleInputChange }
                                                        value={ contract.install }
                                                    />
                                                )
                                            }
                                            {errors.install && (<div className={`invalid-feedback`}>{errors.install}</div>)}
                                        </div>
                                    </div>
                                    <div className={`col-12 text-left`}>
                                        <div className={`d-inline ${styles.labelFont}`}>Payments:</div>
                                        <button className={`btn btn-link d-inline ${styles.addPayment}`} onClick={ this.addPayment }>
                                            +
                                        </button>
                                        {
                                            contract.payments.length &&
                                            contract.payments.map((payment, index) => (
                                                <div key={index} className={`form-group text-left`}>
                                                    <input
                                                        type="number"
                                                        placeholder="Payments"
                                                        className={`form-control ${errors.payments && 'is-invalid'}`}
                                                        name="payments"
                                                        onChange={ event => {this.handlePaymentsChange(event, index)} }
                                                        value={ payment }
                                                    />
                                                    {errors.payments && (<div className={`invalid-feedback`}>{errors.payments}</div>)}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className={`col-12`}>
                                        <div className={`form-group text-left`}>
                                            <label className={`pr-3 ${styles.labelFont}`}>Total:</label>
                                            <input
                                                type="number"
                                                placeholder="Total"
                                                className={`form-control ${errors.total && 'is-invalid'}`}
                                                name="total"
                                                onChange={ this.handleInputChange }
                                                value={ contract.total }
                                            />
                                            {errors.total && (<div className={`invalid-feedback`}>{errors.total}</div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-6`}>
                                <div className={`row`}>
                                    <div className={`col-12`}>
                                        <div className={`form-group text-left`}>
                                            <label className={`pr-3 ${styles.labelFont}`}>Portrait:</label>
                                            <input
                                                type="text"
                                                placeholder="Portrait"
                                                className={`form-control ${errors.info && 'is-invalid'}`}
                                                name="portrait"
                                                onChange={ event => {this.handleArrayChange(event,  'otherInfo')} }
                                                value={ contract.otherInfo.portrait }
                                            />
                                            {errors.info && (<div className={`invalid-feedback`}>{errors.info}</div>)}
                                        </div>
                                    </div>
                                    <div className={`col-12`}>
                                        <div className={`form-group text-left`}>
                                            <label className={`pr-3 ${styles.labelFont}`}>Text:</label>
                                            <input
                                                type="text"
                                                placeholder="Text"
                                                className={`form-control ${errors.info && 'is-invalid'}`}
                                                name="text"
                                                onChange={ event => {this.handleArrayChange(event,  'otherInfo')} }
                                                value={ contract.otherInfo.text }
                                            />
                                            {errors.info && (<div className={`invalid-feedback`}>{errors.info}</div>)}
                                        </div>
                                    </div>
                                    <div className={`col-12`}>
                                        <div className={`form-group text-left`}>
                                            <label className={`pr-3 ${styles.labelFont}`}>Cross:</label>
                                            <input
                                                type="text"
                                                placeholder="Cross"
                                                className={`form-control ${errors.info && 'is-invalid'}`}
                                                name="cross"
                                                onChange={ event => {this.handleArrayChange(event,  'otherInfo')} }
                                                value={ contract.otherInfo.cross }
                                            />
                                            {errors.info && (<div className={`invalid-feedback`}>{errors.info}</div>)}
                                        </div>
                                    </div>
                                    <div className={`col-12`}>
                                        <div className={`form-group text-left`}>
                                            <label className={`pr-3 ${styles.labelFont}`}>Flowers:</label>
                                            <input
                                                type="text"
                                                placeholder="Flowers"
                                                className={`form-control ${errors.info && 'is-invalid'}`}
                                                name="flowers"
                                                onChange={ event => {this.handleArrayChange(event, 'otherInfo')} }
                                                value={ contract.otherInfo.flowers }
                                            />
                                            {errors.info && (<div className={`invalid-feedback`}>{errors.info}</div>)}
                                        </div>
                                    </div>
                                    <div className={`col-12`}>
                                        <div className={`form-group text-left`}>
                                            <label className={`pr-3 ${styles.labelFont}`}>Adds:</label>
                                            <input
                                                type="text"
                                                placeholder="Adds"
                                                className={`form-control ${errors.info && 'is-invalid'}`}
                                                name="adds"
                                                onChange={ event => {this.handleArrayChange(event, 'otherInfo')} }
                                                value={ contract.otherInfo.adds }
                                            />
                                            {errors.info && (<div className={`invalid-feedback`}>{errors.info}</div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`form-group text-right pt-3`}>
                        <button type="submit" className={`btn btn-primary btn-lg`}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

ContractEdit.propTypes = {
    getContractById: PropTypes.func.isRequired,
    updateContract: PropTypes.func.isRequired,
    getAllBuilders: PropTypes.func.isRequired,
    contract: PropTypes.object,
};

const mapStateToProps = state => ({
    contract: state.contract.contract,
    errors: state.errors,
    builders: state.builder.builders
});

const mapActionsToProps = {
    getContractById,
    updateContract,
    getAllBuilders
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(ContractEdit));