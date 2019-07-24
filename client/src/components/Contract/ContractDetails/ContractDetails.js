import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { getContractById, deleteContract } from '../../../actions/contract';
import styles from './ContractDetails.module.scss';
import { productUrl } from '../../../config';
import PrintProvider, { Print, NoPrint } from 'react-easy-print';

class ContractDetails extends Component {
    componentDidMount() {
        this.props.getContractById(this.props.match.params.id);
    }

    handleDelete = () => {
        this.props.deleteContract(this.props.match.params.id, this.props.history);
    };

    handlePrint = (e) => {
        e.preventDefault();
        e.stopPropagation();

        window.print();
    };

    render() {
        const { contract } = this.props;
        return(
            <PrintProvider>
                <NoPrint>
                    <div className={`text-left ${styles.container}`}>
                        <button
                            onClick={this.handlePrint}
                            className={`btn btn-secondary no-print ${styles.printButton}`}
                        >
                            Print
                        </button>
                        <Link
                            to={`/contract/edit/${contract._id}`}
                            className={`btn btn-primary no-print ${styles.editButton}`}
                        >
                            Edit
                        </Link>
                        <button
                            onClick={this.handleDelete}
                            className={`btn btn-danger no-print ${styles.deleteButton}`}
                        >
                            Delete
                        </button>
                        <Print name='print'>
                            <div>
                                <div className={`text-center ${styles.contractHeader}`}>
                                    <span className={styles.contractNumber}>Contract № </span>
                                    <h2 className={`d-inline`}>{contract.number}</h2>
                                </div>
                                <div className={`row`}>
                                    <div className={`col-3`}>
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
                                    <div className={`col-3`}>
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
                                    <div className={`col-3`}>
                                        <h2>Builder:</h2>
                                        <div className={`mb-2`}>
                                            <h6 className={`m-0 d-inline`}>Name:</h6>
                                            <div className={`pl-2 d-inline`}>
                                                {contract.builder.name}
                                            </div>
                                        </div>
                                        <div className={`mb-2`}>
                                            <h6 className={`m-0 d-inline`}>Phone:</h6>
                                            <div className={`pl-2 d-inline`}>
                                                {contract.builder.phone}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`row`}>
                                    <div className={`d-flex col-12 mt-4 border`}>
                                        {
                                            contract.mainInfo.map( (info, index) => (
                                                <div className={`w-100 ${(index > 0) && 'ml-2 pl-2 border-left'}`} key={index}>
                                                    <div className={`row`}>
                                                        <div className={`col-12 border-bottom`}>
                                                            <div className={`p-1`}>
                                                                <h6 className={`m-0 d-inline pr-2`}>First name:</h6>
                                                                { info.firstName }
                                                            </div>
                                                        </div>
                                                        <div className={`col-12 border-bottom`}>
                                                            <div className={`p-1`}>
                                                                <h6 className={`m-0 d-inline pr-2`}>Second name:</h6>
                                                                { info.secondName }
                                                            </div>
                                                        </div>
                                                        <div className={`col-12 border-bottom`}>
                                                            <div className={`p-1`}>
                                                                <h6 className={`m-0 d-inline pr-2`}>Last name:</h6>
                                                                { info.lastName }
                                                            </div>
                                                        </div>
                                                        <div className={`col-12`}>
                                                            <div className={`p-1`}>
                                                                <h6 className={`m-0 d-inline pr-2`}>Date:</h6>
                                                                { info.date }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) )
                                        }
                                    </div>
                                    <div className={`col-12 p-1 mb-5 border border-top-0 ${ (contract.mainInfo.length > 1) && 'text-center' }`}>
                                        <h6 className={`m-0 pl-3 d-inline`}>Epitaph:</h6>
                                        <div className={`pl-2 d-inline`}>
                                            { contract.otherInfo.epitaph }
                                        </div>
                                    </div>
                                    <div className={`col-12 p-0`}>
                                        <div className={`d-flex`}>
                                            <div className={`col-6 p-0 pr-3`}>
                                                <div className={`p-1 border-bottom`}>
                                                    <h6 className={`m-0 d-inline pr-2`}>Cemetery address:</h6>
                                                    { contract.cemetery.address }
                                                </div>
                                                <div className={`p-1 border-bottom`}>
                                                    <h6 className={`m-0 d-inline pr-2`}>Cemetery sector:</h6>
                                                    { contract.cemetery.sector }
                                                </div>
                                                <div className={`p-1 border-bottom`}>
                                                    <h6 className={`m-0 d-inline pr-2`}>Cemetery place:</h6>
                                                    { contract.cemetery.place }
                                                </div>
                                                <div className={`p-1 border-bottom`}>
                                                    <h6 className={`m-0 d-inline pr-2`}>Install date:</h6>
                                                    { contract.install && (new Date(contract.install).toLocaleDateString('ru-RU')) }
                                                </div>
                                                {
                                                    contract.payments.map((payment, index) => (
                                                        <div key={index} className={`p-1 border-bottom`}>
                                                            <h6 className={`m-0 d-inline pr-2`}>Payment {index + 1}:</h6>
                                                            { payment }
                                                        </div>
                                                    ))
                                                }
                                                <div className={`p-1 border-bottom`}>
                                                    <h6 className={`m-0 d-inline pr-2`}>Total:</h6>
                                                    { contract.total }
                                                </div>
                                            </div>
                                            <div className={`col-6 p-0 pl-3`}>
                                                <div className={`p-1 border-bottom`}>
                                                    <h6 className={`m-0 d-inline pr-2`}>Portrait:</h6>
                                                    { contract.otherInfo.portrait }
                                                </div>
                                                <div className={`p-1 border-bottom`}>
                                                    <h6 className={`m-0 d-inline pr-2`}>Text:</h6>
                                                    { contract.otherInfo.text }
                                                </div>
                                                <div className={`p-1 border-bottom`}>
                                                    <h6 className={`m-0 d-inline pr-2`}>Cross:</h6>
                                                    { contract.otherInfo.cross }
                                                </div>
                                                <div className={`p-1 border-bottom`}>
                                                    <h6 className={`m-0 d-inline pr-2`}>Flowers:</h6>
                                                    { contract.otherInfo.flowers }
                                                </div>
                                                <div className={`p-1 border-bottom`}>
                                                    <h6 className={`m-0 d-inline pr-2`}>Adds:</h6>
                                                    { contract.otherInfo.adds }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Print printOnly name='printOnly'>
                                <div className={`newPage`}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                </div>
                                <div className={`newPage`}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita illo molestiae non perspiciatis. Aliquid deserunt ducimus enim error inventore nisi obcaecati, officiis, quibusdam ratione recusandae repellendus unde vel voluptatibus?
                                </div>
                            </Print>
                        </Print>
                    </div>
                </NoPrint>
            </PrintProvider>
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