import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { CalculatorProps, CalculatorState } from './types';
import Display from '../Components/Display';
import ButtonBoard from '../Components/ButtonBoard';
import { Factorial } from '../Helpers/HelperFunctions';
import 'linq4js';
import CalcButton from '../Helpers/CalcButton';

export default class Calculator extends Component<CalculatorProps, CalculatorState> {
    public buttonValues: Array<CalcButton> = [
        new CalcButton(0, '1', '1'),
        new CalcButton(0, '2', '2'),
        new CalcButton(0, '3', '3'),
        new CalcButton(0, '4', '4'),
        new CalcButton(0, '5', '5'),
        new CalcButton(0, '6', '6'),
        new CalcButton(0, '7', '7'),
        new CalcButton(0, '8', '8'),
        new CalcButton(0, '9', '9'),
        new CalcButton(0, '0', '0'),
        new CalcButton(2, '+', '+'),
        new CalcButton(2, '-', '-'),
        new CalcButton(2, 'x', 'x'),
        new CalcButton(2, '/', '/'),
        new CalcButton(2, '^', '^'),
        new CalcButton(4, '=', '='),
        new CalcButton(1, '!', '!'),
        new CalcButton(1, 'sin(x)', 'sin()'),
        new CalcButton(1, 'cos(x)', 'cos()'),
        new CalcButton(1, 'tan(x)', 'tan()'),
        new CalcButton(0, '.', '.'),
        new CalcButton(5, 'c', 'clear'),
        new CalcButton(0, 'π', `${Math.PI}`),
        new CalcButton(0, 'e', `${Math.E}`),
    ];
    
    constructor(props: CalculatorProps) {
        super(props);

        this.state = {
            number1: null,
            number2: null,
            operator: null,
            displayResult: null,
            displayEq: ''
        };

        this.handleClickButton = this.handleClickButton.bind(this);
    }

    public handleChangeNumber(value: string) {
        const { operator, number1, number2 } = this.state;
        if( operator == null ) {
            if(number1 == null) {
                this.setState({
                    number1: value
                });
            } else {
                this.setState({
                    number1: number1 + value
                });
            }
        } else if( operator === '=') {
            this.setState({
                number1: value,
                operator: null
            })
        } else {
            if(number2 == null) {
                this.setState({
                    number2: value
                })
            } else {
                this.setState({
                    number2: number2 + value
                })
            }
        }
    }

    public handleChangeOperator(value: string) {
        this.setState({
            operator: value
        })
    }

    public handleWriteEq(value: string) {
        const { displayEq, displayResult } = this.state;
        let newValue: string = value;
        if( value === ('+' || '-' || 'x' || '^' || '/') ) {
            newValue = `  ${value}  `;
        } else if( value === '=' ) {
            newValue = ''
        }
        this.setState({
            displayEq: displayEq + newValue
        })
        if(displayResult != null) {
            this.setState({
                displayResult: null
            })
        }
    }

    public handleDisplayResult(value: string, result: string) {
        if(value === '=') {
            this.setState({
                displayResult: result,
                displayEq: ''
            })
        }
    }

    public async handleClickButton(value: string) {
        if (value === 'c') {
            this.setState({
                number1: null,
                number2: null,
                operator: null,
                displayEq: '',
                displayResult: null
            })
        } else {
            this.handleWriteEq(value);
            if(!isNaN(Number(value)) || value === '.') {
                this.handleChangeNumber(value);
            } else {
                await this.handleOperation(value);
                this.handleChangeOperator(value);
            }
        }
    }

    async handleOperation(value: string) {
        const { operator, number1, number2 } = this.state;
        const value1: number = Number(number1);
        const value2: number = Number(number2);
        let result: number = value1;

        if(number2 != null) {
            switch(operator) {
                case '+': 
                    result = value1 + value2
                break;
                case '-': 
                    result = value1 - value2
                break;
                case 'x': 
                    result = value1 * value2
                break;
                case '/': 
                    result = value1 / value2
                break;
                case '^':
                    result = Math.pow(value1, value2);
                break;
            } 
        } else {
            switch (operator) {
                case '!':
                    result = Factorial(result);
                break;
                case 'sin (x)':
                    result = Math.sin(value1);
                break;
                case 'cos (x)':
                    result = Math.cos(value1);
                break;
                case 'tan (x)':
                    result = Math.tan(value1);
                break;
            }
        }

        this.setState({
            number1: result.toString(),
            number2: null
        })
        this.handleDisplayResult(value, result.toString());
    }

    render() {
        const { displayEq, displayResult } = this.state;
        return (
            <Grid 
                container
                justify='center'
            >   
                <Grid
                    item
                    xs={12}
                >
                    <Display 
                        displayEq={displayEq}
                        displayResult={displayResult}
                    />
                </Grid>
                <Grid
                    item
                    xs={4}
                >
                    <ButtonBoard 
                        buttonValues={this.buttonValues} 
                        handleClickButton={this.handleClickButton}
                    />
                </Grid>
            </Grid>
        );
    }
} 