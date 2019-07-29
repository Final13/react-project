import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import { getAllContracts, getContractById, searchContracts } from '../../actions/contract';
import { getAllBuilders } from '../../actions/builder';
import styles from './Contract.module.scss';
import Select, { components } from 'react-select';
import { colors, forms, types, sizes } from '../../SelectOptions';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Tippy from "@tippy.js/react";
import {productUrl} from "../../config";

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

class Contract extends Component {
    state = {
        currentPage: 1,
        pageSize: 12,
        query: {
            search: '',
            color: '',
            builder: '',
            type: '',
            form: '',
            size: ''
        },
        color: '',
        builder: '',
        type: '',
        form: '',
        size: ''
    };

    componentDidMount() {
        this.props.getAllContracts();
        this.props.getAllBuilders();
    }

    handleChangePage = (page) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/contract?page=${page}`);
        this.setState({
            currentPage: page,
        });
    };

    handleSearch = (e) => {
        this.props.history.push(`/contract`);
        const query = {...this.state.query};
        query.search = e.target.value;
        this.setState({
            currentPage: 1,
            query: query
        }, () => {
            this.props.searchContracts(this.state.query)
        });

    };

    handleFilter = (event, type) => {
        this.props.history.push(`/contract`);
        const query = {...this.state.query};
        query[type] = event.value;
        this.setState({
            currentPage: 1,
            query: query,
            [type]: event
        }, () => {
            this.props.searchContracts(this.state.query);
        });
    };

    handleBuilder = (event) => {
        this.props.history.push(`/contract`);
        const query = {...this.state.query};
        query.builder = event;
        this.setState({
            currentPage: 1,
            query: query,
        }, () => {
            this.props.searchContracts(this.state.query);
        });
    };


    render() {
        const { query, color, form, type, size } = this.state;
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
        const modifiedSizes = [
            {value: '', label: 'All sizes'},
            ...sizes
        ];
        const indexOfLastContract = this.state.currentPage * this.state.pageSize;
        const indexOfFirstContract = indexOfLastContract - this.state.pageSize;
        const currentContracts = this.props.contracts.slice(indexOfFirstContract, indexOfLastContract);

        return (
            <div className={`container ${styles.container}`}>
                <h2 className={styles.contractHeader}>Contracts</h2>
                <div className={`row text-left pb-3 pt-3`}>
                    <div className={`col-2`}>
                        <input
                            type="text"
                            placeholder="Search"
                            className={`form-control ${styles.searchInput}`}
                            name="search"
                            onChange={ this.handleSearch }
                            value={ query.search }
                        />
                        <i className={`fas fa-search ${styles.searchIcon}`} />
                    </div>
                    <div className={`col-2`}>
                        <Select
                            placeholder="Color"
                            name="color"
                            onChange={ (event) => {this.handleFilter(event,'color')} }
                            value={ color }
                            options={modifiedColors}
                        />
                    </div>
                    <div className={`col-2`}>
                        <Select
                            placeholder="Type"
                            name="type"
                            onChange={ (event) => {this.handleFilter(event,'type')} }
                            value={ type }
                            options={modifiedTypes}
                        />
                    </div>
                    <div className={`col-2`}>
                        <Select
                            placeholder="Form"
                            name="form"
                            onChange={ (event) => {this.handleFilter(event,'form')} }
                            value={ form }
                            options={modifiedForms}
                            components={{ Option: ImageOption }}
                        />
                    </div>
                    <div className={`col-2`}>
                        <Select
                            placeholder="Size"
                            name="size"
                            onChange={ (event) => {this.handleFilter(event,'size')} }
                            value={ size }
                            options={modifiedSizes}
                        />
                    </div>
                    <div className={`col-2`}>
                        <Select
                            placeholder="Builder"
                            name="builder"
                            onChange={ this.handleBuilder }
                            value={ query.builder }
                            options={modifiedBuilders}
                        />
                    </div>
                </div>
                <div className={`row`}>
                    {
                        currentContracts.map( (contract) => (
                            <Tippy
                                key={contract._id}
                                content='Click for details'
                                arrow={true}
                                animation="scale"
                                className={`bg-dark`}
                                duration={100}
                                delay={[0, 50]}
                            >
                                <div className={`${styles.cardEffects} col-xs-12 col-lg-6 col-xl-4`}>
                                    <Link className={styles.link} to={`/contract/${contract._id}`}>
                                        <div className={styles.cardWhite}>
                                            <div className={styles.cardContent}>
                                                <h4 className={`pb-3 ${styles.contractTitle}`}>{contract.number}</h4>
                                                <div>
                                                    <div className={`d-flex justify-content-between mb-2 border-bottom`}>
                                                        <span>Customer:</span>
                                                        <span>{contract.customer.name}</span>
                                                    </div>
                                                    <div className={`d-flex justify-content-between mb-2 border-bottom`}>
                                                        <span>Phone:</span>
                                                        <span>{contract.customer.phone}</span>
                                                    </div>
                                                    <div className={`d-flex justify-content-between mb-2 border-bottom`}>
                                                        <span>Payments:</span>
                                                        {
                                                            contract.payments.length && (
                                                                <span>{contract.payments.reduce((a,b) => a+b)}</span>
                                                            )
                                                        }
                                                    </div>
                                                    <div className={`d-flex justify-content-between mb-2 border-bottom`}>
                                                        <span>Total:</span>
                                                        <span>{contract.total}</span>
                                                    </div>
                                                    <div className={`d-flex justify-content-between mb-2 border-bottom`}>
                                                        <span>Balance:</span>
                                                        <span>{contract.total - contract.payments.reduce((a,b) => a+b)}</span>
                                                    </div>
                                                    <div className={`d-flex justify-content-between mb-2 border-bottom`}>
                                                        <span>Builder:</span>
                                                        <span>{contract.builder.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </Tippy>
                        ))
                    }
                </div>
                {
                    this.props.contracts &&
                    <Pagination
                        className={styles.pagination}
                        total={this.props.contracts.length}
                        showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} items`}
                        onChange={this.handleChangePage}
                        current={this.state.currentPage}
                        defaultPageSize={this.state.pageSize}
                    />
                }
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
    builders: state.builder.builders,
});

const mapActionsToProps = {
    getAllContracts,
    getContractById,
    searchContracts,
    getAllBuilders
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Contract));