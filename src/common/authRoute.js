import React, { useContext, useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AppContext } from '../context/App';
const AuthRoute = ({ component: Component ,authRequired }) => {
    const { isLogin } = useContext(AppContext);
    return authRequired  ? isLogin ? <Component /> : <Navigate to="/login" />:!isLogin ? <Component /> : <Navigate to="/dashboard" />
    //return authRequired ?<Route {...rest} render={props => context.isLogin ? <Component {...props} /> : <Navigate to="/login" />} />:<Route {...rest} render={props => !context.isLogin ? <><Component {...props} /></> : <Navigate to="/dashboard" />} />
    // return <Route render={props => !context.isLogin ? <><Component {...props} /></> : <Navigate to="/login" />} />
}
export default AuthRoute;