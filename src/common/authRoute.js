import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { withContext } from '../context/appContext';
const AuthRoute = ({ component: Component ,props, authRequired,context, ...rest }) => {
    return authRequired  ? context?.isLogin ? <Component /> : <Navigate to="/login" />:!context?.isLogin ? <Component /> : <Navigate to="/dashboard" />
    //return authRequired ?<Route {...rest} render={props => context.isLogin ? <Component {...props} /> : <Navigate to="/login" />} />:<Route {...rest} render={props => !context.isLogin ? <><Component {...props} /></> : <Navigate to="/dashboard" />} />
    // return <Route render={props => !context.isLogin ? <><Component {...props} /></> : <Navigate to="/login" />} />
}
export default withContext(AuthRoute);