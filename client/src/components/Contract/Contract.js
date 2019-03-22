import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import { getAllContracts, getContractById } from '../../actions/contract';
import styles from './Contract.module.scss';

class Contract extends Component {
    componentDidMount() {
        this.props.getAllContracts();
    }

    render() {
        return (
            <div className={`container ${styles.container}`}>
                <h2 className={styles.contractHeader}>Contracts</h2>
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
};

const mapStateToProps = state => ({
    contracts: state.contract.contracts,
    errors: state.errors
});

export default connect(mapStateToProps,{ getAllContracts, getContractById })(withRouter(Contract));