import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import {CalculatorMedium, CalculatorEasy} from '../Calculator';

const router = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/easy' component={CalculatorEasy} />
            <Route path='/medium' component={CalculatorMedium} />
        </Switch>
    </BrowserRouter>
);

export default router;