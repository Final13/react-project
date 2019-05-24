import React, {Component} from 'react';
import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';
import ScrollToTop from '../../helpers/ScrollToTop';
import store from '../../store'
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../setAuthToken';
import { setCurrentUser, logoutUser } from '../../actions/authentication';
import { getCurrency } from '../../actions/settings';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';

class App extends Component {
    componentDidMount() {
        if(localStorage.jwtToken) {
            setAuthToken(localStorage.jwtToken);
            const decoded = jwt_decode(localStorage.jwtToken);
            store.dispatch(setCurrentUser(decoded));

            const currentTime = Date.now() / 1000;
            if(decoded.exp < currentTime) {
                store.dispatch(logoutUser());
            }
        }

        store.dispatch(getCurrency());
    }

    render() {
        return (
            <div>
                <Header />
                <ScrollToTop>
                    <Main />
                </ScrollToTop>
                <Footer />
                <Alert stack={{limit: 3}} />
            </div>
        );
    }
}

export default App;
