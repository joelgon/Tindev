import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import login from './pages/Login';
import main from './pages/Main';

export default function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={login} />
            <Route path="/devs/:id" component={main} />
        </BrowserRouter>
    );
}