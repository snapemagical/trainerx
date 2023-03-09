import React, { useContext, useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AppContext } from '../context/App';
const AuthRoute = ({ component: Component, authRequired }) => {
    const { isLogin } = useContext(AppContext);
    return authRequired  ? isLogin ? <Component /> : <Navigate to="/login" />:!isLogin ? <Component /> : <Navigate to="/dashboard" />
}
export default AuthRoute;