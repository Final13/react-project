import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({component: Component, role, ...rest}) => (

    <Route
        {...rest}
        render={props => (
            role === 'admin'
                ? <Component {...props} />
                : <Redirect to="/" />
        )}
    />
);

const mapStateToProps = (state) => ({
    role: state.auth.user.role,
});

export default connect(mapStateToProps)(PrivateRoute);