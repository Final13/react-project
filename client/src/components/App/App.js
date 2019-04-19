import React, {Component} from 'react';
import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';
import ScrollToTop from '../../helpers/ScrollToTop';
import store from '../../store'
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../setAuthToken';
import { setCurrentUser, logoutUser } from '../../actions/authentication';

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
    }

    render() {
        return (
            <div>
                <Header />
                <ScrollToTop>
                    <Main />
                </ScrollToTop>
                <Footer />
            </div>
        );
    }
}

export default App;
