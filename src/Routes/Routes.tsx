import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import {CalculatorMedium, CalculatorEasy, CalculatorHard} from '../Calculator';

const router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={['/' ,'/easy']} component={CalculatorEasy} />
            <Route path='/medium' component={CalculatorMedium} />
            <Route path='/hard' component={CalculatorHard} />
        </Switch>
    </BrowserRouter>
);

export default router;