import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withContext } from '../context/appContext';
const AuthRoute = ({ component: Component,authRequired,context, ...rest }) => {
    return authRequired ?<Route {...rest} render={props => context.isLogin ? <Component {...props} /> : <Redirect to="/login" />} />:<Route {...rest} render={props => !context.isLogin ? <><Component {...props} /></> : <Redirect to="/dashboard" />} />
}
export default withContext(AuthRoute);