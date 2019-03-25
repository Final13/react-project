import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { getContractById, deleteContract } from '../../../actions/contract';
import styles from './ContractDetails.module.scss';

class ContractDetails extends Component {
    componentDidMount() {
        this.props.getContractById(this.props.match.params.id);
    }

    handleDelete = () => {
        this.props.deleteContract(this.props.match.params.id, this.props.history);
    };

    render() {
        const { contract } = this.props;
        return(
            <div className={`${styles.container}`}>
                <Link
                    to={`/contract/edit/${contract._id}`}
                    className={`btn btn-primary ${styles.editButton}`}
                >
                    Edit
                </Link>
                <button
                    onClick={this.handleDelete}
                    className={`btn btn-danger ${styles.deleteButton}`}
                >
                    Delete
                </button>
                <h2 className={styles.contractHeader}>{`Contract: ${contract.number}`}</h2>
                <div className={`row`}>
                    <div className={`col-6`}>
                        <h2>Customer:</h2>
                        <div className={`mb-2`}>
                            <h6 className={`m-0 d-inline`}>Name:</h6>
                            <div className={`pl-2 d-inline`}>
                                {contract.customer.name}
                            </div>
                        </div>
                        <div className={`mb-2`}>
                            <h6 className={`m-0 d-inline`}>Phone:</h6>
                            <div className={`pl-2 d-inline`}>
                                {contract.customer.phone}
                            </div>
                        </div>
                    </div>
                    <div className={`col-6`}>
                        <h2>Stone:</h2>
                        <div className={`mb-2`}>
                            <h6 className={`m-0 d-inline`}>Type:</h6>
                            <div className={`pl-2 d-inline`}>
                                {contract.stone.type.label}
                            </div>
                        </div>
                        <div className={`mb-2`}>
                            <h6 className={`m-0 d-inline`}>Form:</h6>
                            <div className={`pl-2 d-inline`}>
                                {contract.stone.form.label}
                            </div>
                        </div>
                        <div className={`mb-2`}>
                            <h6 className={`m-0 d-inline`}>Color:</h6>
                            <div className={`pl-2 d-inline`}>
                                {contract.stone.color.label}
                            </div>
                        </div>
                    </div>
                    <div className={`col-12`}>
                        <h2>Info:</h2>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <div className={`mb-2`}>
                                    <h6 className={`m-0 d-inline`}>Last name:</h6>
                                    <div className={`pl-2 d-inline`}>
                                        {contract.info.lastName}
                                    </div>
                                </div>
                                <div className={`mb-2`}>
                                    <h6 className={`m-0 d-inline`}>First name:</h6>
                                    <div className={`pl-2 d-inline`}>
                                        {contract.info.firstName}
                                    </div>
                                </div>
                                <div className={`mb-2`}>
                                    <h6 className={`m-0 d-inline`}>Second name:</h6>
                                    <div className={`pl-2 d-inline`}>
                                        {contract.info.secondName}
                                    </div>
                                </div>
                                <div className={`mb-2`}>
                                    <h6 className={`m-0 d-inline`}>Date:</h6>
                                    <div className={`pl-2 d-inline`}>
                                        {contract.info.date}
                                    </div>
                                </div>
                                <div className={`mb-2`}>
                                    <h6 className={`m-0 d-inline`}>Epitaph:</h6>
                                    <div className={`pl-2 d-inline`}>
                                        {contract.info.epitaph}
                                    </div>
                                </div>
                            </div>
                            {
                                contract.info2 &&
                                <div className={`col-6 border-left`}>
                                    <div className={`mb-2`}>
                                        <h6 className={`m-0 d-inline`}>Last name:</h6>
                                        <div className={`pl-2 d-inline`}>
                                            {contract.info2.lastName}
                                        </div>
                                    </div>
                                    <div className={`mb-2`}>
                                        <h6 className={`m-0 d-inline`}>First name:</h6>
                                        <div className={`pl-2 d-inline`}>
                                            {contract.info2.firstName}
                                        </div>
                                    </div>
                                    <div className={`mb-2`}>
                                        <h6 className={`m-0 d-inline`}>Second name:</h6>
                                        <div className={`pl-2 d-inline`}>
                                            {contract.info2.secondName}
                                        </div>
                                    </div>
                                    <div className={`mb-2`}>
                                        <h6 className={`m-0 d-inline`}>Date:</h6>
                                        <div className={`pl-2 d-inline`}>
                                            {contract.info2.date}
                                        </div>
                                    </div>
                                    <div className={`mb-2`}>
                                        <h6 className={`m-0 d-inline`}>Epitaph:</h6>
                                        <div className={`pl-2 d-inline`}>
                                            {contract.info2.epitaph}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ContractDetails.propTypes = {
    getContractById: PropTypes.func.isRequired,
    deleteContract: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    contract: state.contract.contract
});

export default connect(mapStateToProps,{ getContractById, deleteContract })(withRouter(ContractDetails));