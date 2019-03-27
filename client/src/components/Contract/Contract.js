import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import { getAllContracts, getContractById, searchContracts } from '../../actions/contract';
import styles from './Contract.module.scss';
import Select from 'react-select';

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
                <div className={`row`}>
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
                                            {contract.info.lastName}
                                        </div>
                                        <div>
                                            {`Customer: ${contract.customer.name}`}
                                        </div>
                                        <div>
                                            {`Phone: ${contract.customer.phone}`}
                                        </div>
                                        <div>
                                            {`Payments: ${contract.payments}`}
                                        </div>
                                        <div>
                                            {`Total: ${contract.total}`}
                                        </div>
                                        <div>
                                            {`Balance: ${contract.total - contract.payments}`}
                                        </div>
                                        <Link
                                            to={`/contract/${contract._id}`}
                                            className={`btn btn-outline-primary mt-2`}
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