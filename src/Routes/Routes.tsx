import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import CalculatorMedium from '../Calculator';

const router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={['/', '/easy']} render={() => <></>} />
            <Route path='/medium' component={CalculatorMedium} />
        </Switch>
    </BrowserRouter>
);

export default router;