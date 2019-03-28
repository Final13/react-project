import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import { getAllContracts, getContractById, searchContracts } from '../../actions/contract';
import styles from './Contract.module.scss';
import Select, { components } from 'react-select';

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
            type: '',
            form: ''
        },
        color: '',
        type: '',
        form: ''
    };

    componentDidMount() {
        this.props.getAllContracts();
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


    render() {
        const { query, color, form, type } = this.state;
        const colors = [
            {value: '', label: 'All colors'},
            {value: 'black', label: 'Black'},
            {value: 'white', label: 'White'},
            {value: 'red', label: 'Red'},
            {value: 'green', label: 'Green'}
        ];
        const types = [
            {value: '', label: 'All types'},
            {value: 'square', label: 'square', href: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/1200px-Square_-_black_simple.svg.png'},
            {value: 'triangle', label: 'Triangle', href: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Regular_triangle.svg/1024px-Regular_triangle.svg.png'}
        ];
        const forms = [
            {value: '', label: 'All forms'},
            {value: 'single', label: 'Single'},
            {value: 'double', label: 'Double'}
        ];
        return (
            <div className={`container ${styles.container}`}>
                <h2 className={styles.contractHeader}>Contracts</h2>
                <div className={`row text-left pb-3 pt-3`}>
                    <div className={`col-3`}>
                        <input
                            type="text"
                            placeholder="Search"
                            className={`form-control`}
                            name="search"
                            onChange={ this.handleSearch }
                            value={ query.search }
                        />
                    </div>
                    <div className={`col-3`}>
                        <Select
                            placeholder="Color"
                            name="color"
                            onChange={ (event) => {this.handleFilter(event,'color')} }
                            value={ color }
                            options={colors}
                        />
                    </div>
                    <div className={`col-3`}>
                        <Select
                            placeholder="Type"
                            name="type"
                            onChange={ (event) => {this.handleFilter(event,'type')} }
                            value={ type }
                            options={types}
                            components={{ Option: ImageOption }}
                        />
                    </div>
                    <div className={`col-3`}>
                        <Select
                            placeholder="Form"
                            name="form"
                            onChange={ (event) => {this.handleFilter(event,'form')} }
                            value={ form }
                            options={forms}
                        />
                    </div>
                </div>
                <div className={`row`}>
                    {
                        this.props.contracts.map( (contract) => (
                            <div key={contract._id} className={`col-4`}>
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
};

const mapStateToProps = state => ({
    contracts: state.contract.contracts,
    errors: state.errors
});

export default connect(mapStateToProps,{ getAllContracts, getContractById, searchContracts })(withRouter(Contract));