import React, { Component } from 'react';
import { ICalculatorEasyState } from './types';
import { EDifficultyLevelEnum } from '../Helpers/Enums/DifficultyLevelEnum';
import { Grid } from '@material-ui/core';
import Display from '../Components/Display';
import ButtonBoard from '../Components/ButtonBoard';
import Calculator from '../Helpers/Calculator';

export default class CalculatorEasy extends Component<{}, ICalculatorEasyState> {
    private readonly StringButtonValues: Array<string> = Calculator.StringButtonValues;

    private readonly DifficultyLevel: EDifficultyLevelEnum = EDifficultyLevelEnum.easy;

    constructor(props: {}) {
        super(props);

        this.state = {
            number1: null,
            number2: null,
            operator: null,
            displayEq: '',
            displayResult: null
        };

        this.handleClickButton = this.handleClickButton.bind(this);
    }

    private handleChangeOperator(value: string) {
        this.setState({
            operator: value
        });
    }

    private handleWriteEq(value: string) {
        const { displayEq, displayResult } = this.state;
        let newValue: string = value;

        switch(value) {
            case '+':
            case '-':
            case 'x':
            case '^':
            case '/':
                newValue = ` ${value} `;
            break;
            case '=':
                newValue = '';
            break;
            case 'π':
                newValue = `${Math.PI}`;
            break;
            case 'e':
                newValue = `${Math.E}`;
            break;
        }
        
        if(!isNaN(Number(value)) && displayResult) {
            this.setState({
                displayEq: newValue
            });
        } else {
            this.setState({
                displayEq: displayEq + newValue
            });
        }

        if(displayResult != null) {
            this.setState({
                displayResult: null
            })
        }
    }

    private handleChangeNumber(value: string) {
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
        } else if(operator === '=') {
            this.setState({
                number1: value,
                operator: null
            });
        } else {
            if(number2 == null) {
                this.setState({
                    number2: value
                });
            } else {
                this.setState({
                    number2: number2 + value
                });
            }
        }
    }

    public async handleClickButton(value: string) {
        if(value === 'c') {
            this.setState({
                number1: null,
                number2: null,
                operator: null,
                displayEq: '',
                displayResult: null
            });
            return;
        }

        this.handleWriteEq(value);
        if(!isNaN(Number(value)) || value === '.') {
            this.handleChangeNumber(value);
        } else {
            let keep = await this.handleOperation(value);
            keep && this.handleChangeOperator(value);
        }
    }

    private handleDisplayResult(result: string) {
        this.setState({
            displayResult: result,
            displayEq: result
        });
    }

    private handleOperation(value: string): Promise<boolean> {
        const { number1, number2, operator } = this.state;
        const value1: number = Number(number1);
        const value2: number = Number(number2);
        let result: number = value1;

        return new Promise(resolve => {
            if(number1 == null) {
                resolve(false);
            } else if(number2 !== null) {
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
                switch(operator) {
                    case '!':
                        result = Calculator.Factorial(value1);
                        if(number1.search('.') > -1) {
                            result = NaN;
                        }
                    break;
                    case 'sin(x)':
                        result = Math.sin(value1);
                        if(value1 % Math.PI === 0) {
                            result = 0;
                        }
                    break;
                    case 'cos(x)':
                        result = Math.cos(value1);
                        if(value1 % (Math.PI / 2) === 0 && value1 % Math.PI !== 0) {
                            result = 0;
                        }
                    break;
                    case 'tan(x)':
                        result = Math.tan(value1);
                        if(value1 % Math.PI === 0) {
                            result = 0;
                        } else if(value1 % (Math.PI / 2) === 0) {
                            result = Infinity;
                        }
                    break;
                }
            }

            this.setState({
                number1: result.toString(),
                number2: null
            });
            if(value === '=') {
                this.handleDisplayResult(result.toString())
            }

            resolve(true);
        });
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
                        calcLvl={this.DifficultyLevel}
                        stringButtonValues={this.StringButtonValues} 
                        handleClickButtonString={this.handleClickButton}
                    />
                </Grid>
            </Grid>
        );
    }
}