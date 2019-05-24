import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styles from './Main.module.scss';
import PrivateRoute from '../../helpers/PrivateRoute';

import Home from '../Home';
import Contact from '../Contact';
import ErrorPage from '../ErrorPage';
import Portfolio from '../Portfolio';
import PortfolioForm from '../Portfolio/PortfolioForm';
import PortfolioDetails from '../Portfolio/PortfolioDetails';
import PortfolioEdit from '../Portfolio/PortfolioEdit';
import Contract from '../Contract';
import ContractForm from '../Contract/ContractForm';
import ContractDetails from '../Contract/ContractDetails';
import ContractEdit from '../Contract/ContractEdit';
import Service from '../Service';
import Login from '../Login';
import Register from '../Register';
import Decoration from '../Service/Decoration';
import Dismantling from '../Service/Dismantling';
import Fence from '../Service/Fence';
import Landscape from '../Service/Landscape';
import Monument from '../Service/Monument';
import Production from '../Service/Production';
import Product from '../Product';
import ProductForm from '../Product/ProductForm';
import ProductDetails from '../Product/ProductDetails';
import ProductEdit from '../Product/ProductEdit';
import Settings from '../Settings/Settings';

const Main = () => (
    <main className={`text-center ${styles.wrapper}`}>
        <Switch>
            <Route exact path='/' component={ Home } />
            <Route exact path='/contacts' component={ Contact } />
            <Route exact path='/portfolio' component={ Portfolio } />
            <Route exact path='/portfolio/:id' component={ PortfolioDetails } />
            <PrivateRoute exact path='/portfolio/edit/:id' component={ PortfolioEdit } />
            <PrivateRoute exact path="/portfolio-form" component={ PortfolioForm } />
            <PrivateRoute exact path='/contract' component={ Contract } />
            <PrivateRoute exact path='/contract/:id' component={ ContractDetails } />
            <PrivateRoute exact path='/contract/edit/:id' component={ ContractEdit } />
            <PrivateRoute exact path="/contract-form" component={ ContractForm } />
            <Route exact path='/services' component={ Service } />
            <Route exact path='/services/decoration' component={ Decoration } />
            <Route exact path='/services/dismantling' component={ Dismantling } />
            <Route exact path='/services/fence' component={ Fence } />
            <Route exact path='/services/landscape' component={ Landscape } />
            <Route exact path='/services/monument' component={ Monument } />
            <Route exact path='/services/production' component={ Production } />
            <Route exact path='/product' component={ Product } />
            <Route exact path='/product/:id' component={ ProductDetails } />
            <PrivateRoute exact path='/product/edit/:id' component={ ProductEdit } />
            <PrivateRoute exact path="/product-form" component={ ProductForm } />
            <Route exact path="/register" component={ Register } />
            <Route exact path="/login" component={ Login } />
            <PrivateRoute exact path="/settings" component={ Settings } />
            <Route exact path='/404' component={ ErrorPage } />
            <Redirect to='/404'/>
        </Switch>
    </main>
);

export default Main;