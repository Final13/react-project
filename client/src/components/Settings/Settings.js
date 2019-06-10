import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import { getSettings, updateSettings } from '../../actions/settings';
import styles from './Settings.module.scss';
import State from '../../reducers/state';
import Tippy from '@tippy.js/react';


const set = require('lodash.set');

class Settings extends Component {
    state = {
        settings: State.settings(),
        errors: {},
    };

    componentDidMount() {
        this.props.getSettings();
    }

    handleInputChange = (e) => {
        const settings = {...this.state.settings};
        set(settings, e.target.name, e.target.value );
        this.setState({
            settings: settings
        });
    };

    handleArrayChange = (event, index) => {
        const settings = {...this.state.settings};
        settings[event.target.name][[index]].value = event.target.value;
        this.setState({
            settings: settings
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.updateSettings(this.state.settings);
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

        if(nextProps.settings) {
            this.setState({
                settings: nextProps.settings
            });
        }
    };

    render() {
        const { errors, settings } = this.state;
        return (
            <div className={`container ${styles.container}`}>
                <h2 className={styles.settingsHeader}>Settings</h2>
                <div className={`col-12 text-center mb-4`}>
                    <span>Курс USD: </span>
                    <div className={`d-inline-flex`}>
                        <div className={`pl-2 ${styles.rate}`}>
                            {settings.rate && settings.rate.toFixed(4)}
                        </div>
                        <div
                            className={`${
                                (settings.rateGrowth > 0) ?
                                'fa-arrow-up text-success' :
                                    (settings.rateGrowth < 0) ?
                                        'fa-arrow-down text-danger' :
                                        'text-secondary'} fas pl-1 ${styles.rateGrowth}`}
                        >
                            {settings.rateGrowth && settings.rateGrowth.toFixed(4)}
                        </div>
                    </div>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className={`row text-left pb-3 pt-3`}>
                        <div className={`col-4`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>
                                    <Tippy
                                        content='Default portrait price (A4)'
                                        arrow={true}
                                        animation="scale"
                                        className={`bg-dark`}
                                        duration={100}
                                        delay={[0, 50]}
                                    >
                                        <i className="far fa-question-circle pr-1" />
                                    </Tippy>
                                    Portrait price (USD):
                                </label>
                                <input
                                    type='number'
                                    step={1}
                                    placeholder="Portrait price"
                                    className={`form-control ${errors.portraitPrice && 'is-invalid'}`}
                                    name="portraitPrice"
                                    onChange={ this.handleInputChange }
                                    value={ settings.portraitPrice }
                                />
                                {errors.portraitPrice && (<div className={`invalid-feedback`}>{errors.portraitPrice}</div>)}
                            </div>
                        </div>
                        <div className={`col-4`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>
                                    <Tippy
                                        content='Default text price (text, 20 char epitaph, cross)'
                                        arrow={true}
                                        animation="scale"
                                        className={`bg-dark`}
                                        duration={100}
                                        delay={[0, 50]}
                                    >
                                        <i className="far fa-question-circle pr-1" />
                                    </Tippy>
                                    Text price (USD):
                                </label>
                                <input
                                    type='number'
                                    step={1}
                                    placeholder="Text price"
                                    className={`form-control ${errors.textPrice && 'is-invalid'}`}
                                    name="textPrice"
                                    onChange={ this.handleInputChange }
                                    value={ settings.textPrice }
                                />
                                {errors.textPrice && (<div className={`invalid-feedback`}>{errors.textPrice}</div>)}
                            </div>
                        </div>
                        <div className={`col-4`}>
                            <div className={`form-group text-left`}>
                                <label className={`pr-3 ${styles.labelFont}`}>
                                    <Tippy
                                        content='Form: square, color: black, size: 80x40x5'
                                        arrow={true}
                                        animation="scale"
                                        className={`bg-dark`}
                                        duration={100}
                                        delay={[0, 50]}
                                    >
                                        <i className="far fa-question-circle pr-1" />
                                    </Tippy>
                                    Monument price (USD):
                                </label>
                                <input
                                    type='number'
                                    step={1}
                                    placeholder="Monument price"
                                    className={`form-control ${errors.monumentPrice && 'is-invalid'}`}
                                    name="monumentPrice"
                                    onChange={ this.handleInputChange }
                                    value={ settings.monumentPrice }
                                />
                                {errors.monumentPrice && (<div className={`invalid-feedback`}>{errors.monumentPrice}</div>)}
                            </div>
                        </div>
                        <div className={`col-12 border-bottom mb-2 pt-4 pb-1`}>
                            <Tippy
                                content='Square black size price / default monument price'
                                arrow={true}
                                animation="scale"
                                className={`bg-dark`}
                                duration={100}
                                delay={[0, 50]}
                            >
                                <i className="far fa-question-circle pr-1" />
                            </Tippy>
                            Size coefficients (ratio):
                        </div>
                        {
                            settings.sizeCoefficient.map((coefficient, index) => (
                                <div className={`col-6`} key={index + coefficient.label}>
                                    <div className={`form-group text-left`}>
                                        <label className={`pr-3 ${styles.labelFont}`}>{coefficient.label}:</label>
                                        <input
                                            type='number'
                                            step={0.1}
                                            disabled={coefficient.name === '80405'}
                                            placeholder='Portrait price'
                                            className={`form-control ${errors.sizeCoefficient && 'is-invalid'}`}
                                            name='sizeCoefficient'
                                            onChange={ event => {this.handleArrayChange(event, index)} }
                                            value={ coefficient.value }
                                        />
                                        {errors.sizeCoefficient && (<div className={`invalid-feedback`}>{errors.sizeCoefficient}</div>)}
                                    </div>
                                </div>
                            ))
                        }
                        <div className={`col-12 border-bottom mb-2 pt-4 pb-1`}>
                            <Tippy
                                content='Square 80x40x5 material price / default monument price'
                                arrow={true}
                                animation="scale"
                                className={`bg-dark`}
                                duration={100}
                                delay={[0, 50]}
                            >
                                <i className="far fa-question-circle pr-1" />
                            </Tippy>
                            Material coefficients (ratio):
                        </div>
                        {
                            settings.materialCoefficient.map((coefficient, index) => (
                                <div className={`col-6`} key={index + coefficient.label}>
                                    <div className={`form-group text-left`}>
                                        <label className={`pr-3 ${styles.labelFont}`}>{coefficient.label}:</label>
                                        <input
                                            type='number'
                                            step={0.1}
                                            disabled={coefficient.name === 'black'}
                                            placeholder='Portrait price'
                                            className={`form-control ${errors.materialCoefficient && 'is-invalid'}`}
                                            name='materialCoefficient'
                                            onChange={ event => {this.handleArrayChange(event, index)} }
                                            value={ coefficient.value }
                                        />
                                        {errors.materialCoefficient && (<div className={`invalid-feedback`}>{errors.materialCoefficient}</div>)}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className={`form-group text-right`}>
                        <button type="submit" className={`btn btn-primary btn-lg`}>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

Settings.propTypes = {
    settings: PropTypes.object,
    getSettings: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    settings: state.settings,
    errors: state.errors
});

export default connect(mapStateToProps,{ getSettings, updateSettings })(withRouter(Settings));