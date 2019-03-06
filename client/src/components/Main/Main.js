import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styles from './Main.module.scss';
import PrivateRoute from '../../helpers/PrivateRoute';

import Home from '../Home';
import Contact from '../Contact';
import ErrorPage from '../ErrorPage';
import Portfolio from '../Portfolio';
import PortfolioForm from '../Portfolio/PortfolioForm';
import Service from '../Service';
import Login from '../Login';
import Register from '../Register';

const Main = () => (
    <main className={`text-center ${styles.wrapper}`}>
        <Switch>
            <Route exact path='/' component={ Home } />
            <Route exact path='/contacts' component={ Contact } />
            <Route exact path='/portfolio' component={ Portfolio } />
            <Route exact path='/services' component={ Service } />
            <Route exact path="/register" component={ Register } />
            <Route exact path="/login" component={ Login } />
            <PrivateRoute path="/portfolio-form" component={ PortfolioForm } />
            <Route exact path='/404' component={ ErrorPage } />
            <Redirect to='/404'/>
        </Switch>
    </main>
);

export default Main;