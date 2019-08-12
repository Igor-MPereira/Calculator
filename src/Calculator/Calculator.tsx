import React, { Component } from 'react';
import { CalculatorProps, CalculatorState } from './types';
import {
    Grid,
    Container
} from '@material-ui/core';

import Buttons from './Buttons'
import Display from './Display'
import { isNumber } from 'util';

export default class Calculator extends Component<CalculatorProps, CalculatorState> {
    constructor(props: CalculatorProps) {
        super(props);
        this.state = {
            value1: null,
            value2: null,
            operator: null,
            prevOperator: null,
            memValue: null,
            displayResult: null,
            displayEquation: '',
            isEqual: false
        }      
    }

    handleValue(value: string) {
        if(this.state.operator == null) {
            (this.state.value1 != null)?
                this.setState( {value1: this.state.value1 + value} )
            :
                this.setState( {value1: value} )
        } else {
            (this.state.value2 != null)?
                this.setState( {value2: this.state.value2 + value} )
            :
                this.setState( {value2: value} )
        }
    }

    handleOperator(value: string) {
        this.setState({
            prevOperator: this.state.operator,
            operator: value
        })
    }

    handleOperation() {
        const { operator, value1, value2 } = this.state;
        let varValue1: number = Number(value1);
        let varValue2: number = Number(value2);

        switch (operator) {
            case '+':
                varValue1 = varValue1 + varValue2;    
            break;
            case '-':
                varValue1 = varValue1 - varValue2;    
            break;
            case '*':
                varValue1 = varValue1 * varValue2;    
            break;
            case '/':
                varValue1 = varValue1 / varValue2;    
            break;
            case '^':
                varValue1 = varValue1 ^ varValue2;    
            break;
        } 
        this.setState({value1: varValue1.toString(), value2: null})       
    }

    handlePrinting(value: string) {
        if( value === '+' || '-' || '/' || '*' || '^' ) {
            value = ` ${value} `;
        }
        if( value === '=' ) {
            this.setState({displayEquation: ''})
        } else {
            this.setState({displayEquation: this.state.displayEquation + value} )
        }
    }

    handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let value = event.currentTarget.value;
        if( this.state.isEqual ) {
            this.setState({isEqual: false, displayResult: null})
        }
        if(!isNaN(Number(value))) {
            this.handleValue(value)
        } else {
            if( this.state.value2 != null ) {
                this.handleOperation()
            }
            this.handleOperator(value);
        }
        if( value === '=' && this.state.value2 == null) {
            if( this.state.value1 == null ) {
                console.log('error');
            } else {
                this.setState({displayResult: this.state.value1})
            }
        }
        if( value === '=' ) {
            this.setState({displayResult: this.state.value1, displayEquation: '', isEqual: true})    
        }
        this.handlePrinting(value)
    }

    btnValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '^', '/', '='];

    render() {
        return(
            <Grid container justify='center' alignContent='center' alignItems='center'>
                <Container>
                    <Grid item>
                        <Display displayResult={this.state.displayResult} isEqual={this.state.isEqual} displayEquation={this.state.displayEquation} />
                        <Buttons btnValues={this.btnValues} handleClick={this.handleClick} />
                    </Grid>
                </Container>
            </Grid>
        );
    }
}