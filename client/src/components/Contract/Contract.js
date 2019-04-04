import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import { getAllContracts, getContractById, searchContracts } from '../../actions/contract';
import { getAllBuilders } from '../../actions/builder';
import styles from './Contract.module.scss';
import Select, { components } from 'react-select';
import { colors, forms, types } from '../../SelectOptions';

const { Option } = components;

const ImageOption = (props) => {
    return (
        <Option {...props}>
            <div>
                {
                    props.data.href &&
                    <img className={styles.optionImage} src={props.data.href} alt={props.data.label} />
                }
                {props.data.label}
            </div>
        </Option>
    );
};

class Contract extends Component {
    state = {
        query: {
            search: '',
            color: '',
            builder: '',
            type: '',
            form: ''
        },
        color: '',
        builder: '',
        type: '',
        form: ''
    };

    componentDidMount() {
        this.props.getAllContracts();
        this.props.getAllBuilders();
    }

    handleSearch = (e) => {
        const query = {...this.state.query};
        query.search = e.target.value;
        this.setState({
            query: query
        }, () => {
            this.props.searchContracts(this.state.query)
        });

    };

    handleFilter = (event, type) => {
        const query = {...this.state.query};
        query[type] = event.value;
        this.setState({
            query: query,
            [type]: event
        }, () => {
            this.props.searchContracts(this.state.query);
        });
    };

    handleBuilder = (event) => {
        const query = {...this.state.query};
        query.builder = event;
        this.setState({
            query: query,
        }, () => {
            this.props.searchContracts(this.state.query);
        });
    };


    render() {
        const { query, color, form, type } = this.state;
        const isAdmin = (this.props.role === 'admin');
        const {builders} = this.props;
        const modifiedBuilders = [
            {value: '', label: 'All builders'},
            ...builders
        ];
        const modifiedColors = [
            {value: '', label: 'All colors'},
            ...colors
        ];
        const modifiedTypes = [
            {value: '', label: 'All types'},
            ...types
        ];
        const modifiedForms = [
            {value: '', label: 'All forms'},
            ...forms
        ];
        return (
            <div className={`container ${styles.container}`}>
                <h2 className={styles.contractHeader}>Contracts</h2>
                <div className={`row text-left pb-3 pt-3`}>
                    <div className={isAdmin ? 'col-4' : 'col-3'}>
                        <input
                            type="text"
                            placeholder="Search"
                            className={`form-control`}
                            name="search"
                            onChange={ this.handleSearch }
                            value={ query.search }
                        />
                    </div>
                    <div className={isAdmin ? 'col-2' : 'col-3'}>
                        <Select
                            placeholder="Color"
                            name="color"
                            onChange={ (event) => {this.handleFilter(event,'color')} }
                            value={ color }
                            options={modifiedColors}
                        />
                    </div>
                    <div className={isAdmin ? 'col-2' : 'col-3'}>
                        <Select
                            placeholder="Type"
                            name="type"
                            onChange={ (event) => {this.handleFilter(event,'type')} }
                            value={ type }
                            options={modifiedTypes}
                            components={{ Option: ImageOption }}
                        />
                    </div>
                    <div className={isAdmin ? 'col-2' : 'col-3'}>
                        <Select
                            placeholder="Form"
                            name="form"
                            onChange={ (event) => {this.handleFilter(event,'form')} }
                            value={ form }
                            options={modifiedForms}
                        />
                    </div>
                    {
                        isAdmin &&
                        <div className={`col-2`}>
                            <Select
                                placeholder="Builder"
                                name="builder"
                                onChange={ this.handleBuilder }
                                value={ query.builder }
                                options={modifiedBuilders}
                            />
                        </div>
                    }
                </div>
                <div className={`row`}>
                    {
                        this.props.contracts.map( (contract) => (
                            <div key={contract._id} className={`col-xs-12 col-lg-6 col-xl-4`}>
                                <div className={styles.cardWhite}>
                                    <div className={styles.cardContent}>
                                        <h4 className={`pb-3 ${styles.contractTitle}`}>{contract.number}</h4>
                                        <div>
                                            <div className={`d-flex justify-content-between mb-2 border-bottom`}>
                                                <span>
                                                    Customer:
                                                </span>
                                                <span>
                                                    {contract.customer.name}
                                                </span>
                                            </div>
                                            <div className={`d-flex justify-content-between mb-2 border-bottom`}>
                                                <span>
                                                    Phone:
                                                </span>
                                                <span>
                                                    {contract.customer.phone}
                                                </span>
                                            </div>
                                            <div className={`d-flex justify-content-between mb-2 border-bottom`}>
                                                <span>
                                                    Payments:
                                                </span>
                                                <span>
                                                    {contract.payments}
                                                </span>
                                            </div>
                                            <div className={`d-flex justify-content-between mb-2 border-bottom`}>
                                                <span>
                                                    Total:
                                                </span>
                                                <span>
                                                    {contract.total}
                                                </span>
                                            </div>
                                            <div className={`d-flex justify-content-between mb-2 border-bottom`}>
                                                <span>
                                                    Balance:
                                                </span>
                                                <span>
                                                    {contract.total - contract.payments}
                                                </span>
                                            </div>
                                            <div className={`d-flex justify-content-between mb-2 border-bottom`}>
                                                <span>
                                                    Builder:
                                                </span>
                                                <span>
                                                    {contract.builder.name}
                                                </span>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/contract/${contract._id}`}
                                            className={`btn btn-outline-primary mt-3`}
                                        >
                                            Details
                                        </Link>
                                    </div>
                                </div>


                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

Contract.propTypes = {
    contracts: PropTypes.array,
    getAllContracts: PropTypes.func.isRequired,
    getContractById: PropTypes.func.isRequired,
    searchContracts: PropTypes.func.isRequired,
    getAllBuilders: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    contracts: state.contract.contracts,
    errors: state.errors,
    role: state.auth.user.role,
    builders: state.builder.builders,
});

const mapActionsToProps = {
    getAllContracts,
    getContractById,
    searchContracts,
    getAllBuilders
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Contract));