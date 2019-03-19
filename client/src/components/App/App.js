import React, {Component} from 'react';
import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';
import ScrollToTop from '../../helpers/ScrollToTop';

class App extends Component {
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
