import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { ICalculatorMediumState } from './types';
import Display from '../Components/Display';
import ButtonBoard from '../Components/ButtonBoard';
import Calculator from '../Helpers/Calculator';
import 'linq4js';
import CalcButton from '../Helpers/CalcButton';
import { EButtonTypeEnum } from '../Helpers/Enums/ButtonTypeEnum';
import { EDifficultyLevelEnum } from '../Helpers/Enums/DifficultyLevelEnum';

export default class CalculatorMedium extends Component<{}, ICalculatorMediumState> {
    private readonly ButtonValues: Array<CalcButton> = Calculator.ButtonValues;

    private readonly DifficultyLevel: EDifficultyLevelEnum = EDifficultyLevelEnum.medium;
    
    constructor(props: {}) {
        super(props);

        this.state = {
            number1: null,
            number2: null,
            binaryOperator: null,
            unaryOperator: null,
            displayResult: null,
            displayEq: ''
        };

        this.handleClickButton = this.handleClickButton.bind(this);
    }

    private handleChangeNumber(btn: CalcButton) {
        const { binaryOperator, number1, number2 } = this.state;
        if( binaryOperator == null ) {
            if(number1 == null) {
                this.setState({
                    number1: {...btn}
                });
            } else {
                let n1: CalcButton = {...this.state.number1} as CalcButton;
                n1.Value = n1.Value + btn.Value;
                n1.label = n1.Value + btn.Value;
                this.setState({
                    number1: n1
                });
            }
        } else if( binaryOperator.Value === '=') {
            this.setState({
                number1: {...btn},
                binaryOperator: null
            });
        } else {
            if(number2 == null) {
                this.setState({
                    number2: {...btn}
                });
            } else {
                let n2: CalcButton = {...this.state.number2} as CalcButton; 
                n2.Value = n2.Value + btn.Value;
                n2.label = n2.Value + btn.Value;
                this.setState({
                    number2: n2
                });
            }
        }
    }

    private handleChangeBinaryOperator(btn: CalcButton) {
        this.setState({
            binaryOperator: {...btn}
        });
    }

    private handleChangeUnaryOparator(btn: CalcButton) {
        this.setState({
            unaryOperator: {...btn}
        });
    }

    private handleWriteEq(btn: CalcButton) {
        const { displayEq, displayResult } = this.state;
        let newValue: string = btn.Value;
        switch(btn.Value) {
            case '+':
            case '-':
            case 'x':
            case '^':
            case '/':
                newValue = ` ${btn.Value} `;
            break;
            case '=':
                newValue = '';
            break;
        }
        
        if(btn.ValueType === EButtonTypeEnum.numero && displayResult) {
            this.setState({
                displayEq: btn.Value
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

    private handleDisplayResult(result: string) {
        this.setState({
            displayResult: result,
            displayEq: result
        });
    }

    public async handleClickButton(btn: CalcButton) {
        let done = false;
        if (btn.Value === 'clear') {
            this.setState({
                number1: null,
                number2: null,
                binaryOperator: null,
                unaryOperator: null,
                displayEq: '',
                displayResult: null
            });
            return;
        }

        this.handleWriteEq(btn);
        switch(btn.ValueType) {
            case EButtonTypeEnum.numero:
                this.handleChangeNumber(btn);
            break;
            case EButtonTypeEnum.unario:
                done = await this.handleUnaryOperaration(btn);
                done && this.handleChangeUnaryOparator(btn);
            break;
            case EButtonTypeEnum.binario:
            case EButtonTypeEnum.equals:
                done = await this.handleBinaryOperation(btn);
                done && this.handleChangeBinaryOperator(btn);
            break;
        }
    }

    private handleUnaryOperaration(uOp: CalcButton): Promise<boolean> {
        const isNumber1 = this.state.number2 == null;
        let button: CalcButton | null = this.state.number2 ? {...this.state.number2} as CalcButton : this.state.number1 ? {...this.state.number1} as CalcButton : null;

        return new Promise((resolve, reject) => {    
            if(Calculator.isCalcButton(button)) {
                let number = Number(button.Value);
                const initValue = number;

                switch (uOp.Value) {
                    case '!':
                        number = Calculator.Factorial(initValue);
                        if(initValue.toString().search('.') > -1) {
                            number = NaN;
                        }
                    break;
                    case 'sin':
                        number = Math.sin(initValue);
                        if(initValue % Math.PI === 0) {
                            number = 0;
                        }
                    break;
                    case 'cos':
                        number = Math.cos(initValue);
                        if(initValue % (Math.PI / 2) === 0 && initValue % Math.PI !== 0) {
                            number = 0;
                        }
                    break;
                    case 'tan':
                        number = Math.tan(initValue);
                        if(initValue % Math.PI === 0) {
                            number = 0;
                        } else if(initValue % (Math.PI / 2) === 0) {
                            number = Infinity;
                        }
                    break;
                }

                button.Value = number.toString();
                button.label = number.toString();

                this.setState(s => {
                    return {
                        number1: isNumber1 ? button : s.number1,
                        number2: isNumber1 ? null : button
                    };
                });

                resolve(true);
            } else {
                resolve(false);
            }

        });            
    }

    private handleBinaryOperation(btn: CalcButton): Promise<boolean> {
        const { binaryOperator, number1, number2 } = this.state;
        const value1: number = Number(number1 && number1.Value);
        const value2: number = Number(number2 && number2.Value);
        let result: number = value1;
        let n1: CalcButton | null = number1;
        return new Promise((resolve, reject) => { 
            if(number1 == null) {
                resolve(false);
            }           
            if(number2 != null && binaryOperator) {
                switch(binaryOperator.Value) {
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
            } 

            if(n1) {
                n1.Value = result.toString();
                n1.label = result.toString();
            }
            
            this.setState({
                number1: n1,
                number2: null
            })
            if(btn.Value === '=') {
                this.handleDisplayResult(number1 ? number1.Value : '0')
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
                        buttonValues={this.ButtonValues} 
                        handleClickButton={this.handleClickButton}
                    />
                </Grid>
            </Grid>
        );
    }
} 