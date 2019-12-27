import React, { Component } from 'react';
import { ICalculatorHardState } from './types';
import CalcButton from '../Helpers/CalcButton';
import { EDifficultyLevelEnum } from '../Helpers/Enums/DifficultyLevelEnum';
import { EButtonTypeEnum } from '../Helpers/Enums/ButtonTypeEnum';
import Calculator from '../Helpers/Calculator';
import { Grid } from '@material-ui/core';
import Display from '../Components/Display';
import ButtonBoard from '../Components/ButtonBoard';

export default class CalculatorHard extends Component<{}, ICalculatorHardState> {
    private readonly ButtonValues: Array<CalcButton> = Calculator.ButtonValues;

    private readonly DifficultyLevel: EDifficultyLevelEnum = EDifficultyLevelEnum.hard;

    constructor(props: {}) {
        super(props);

        this.state = {
            Expression: null,
            displayEx: '',
            displayResult: null,
            isResult: false
        };

        this.handleClickButton = this.handleClickButton.bind(this);
    }

    private Clear() {
        this.setState({
            Expression: null,
            displayEx: '',
            displayResult: null
        });
    }

    private ClearExpression() {
        
    }

    private DisplayResult(result: string) {
        this.setState({
            displayEx: result,
            displayResult: result
        });
    }

    private HandleExpression(btn: CalcButton) {
        const { Expression } = this.state;
        let expression: Array<CalcButton> = new Array<CalcButton>();
        if((!Expression || Expression.length === 0) && btn.isOperator) {
            let zeroButton = this.ButtonValues.First(cb => cb.Value === '0');
            expression.AddRange([zeroButton, btn]);
            return expression;
        } else if(!Expression) {
            expression.Add(btn);
            return expression;
        } else if(Expression.Last().ValueType === EButtonTypeEnum.binario && btn.ValueType === EButtonTypeEnum.binario) {
            expression = Expression.Clone();
            const lastIndex = expression.length - 1;
            expression.splice(lastIndex, 1, btn);
            return expression;
        }

        expression = Expression.Clone();
        let lastCB = expression.Last();
        const lastIndex = expression.length - 1;

        switch(btn.ValueType) {
            case EButtonTypeEnum.numero:
                if(lastCB.isOperator) {
                    expression.Add(btn);
                } else {
                    let newCB = {...lastCB};
                    newCB.Value += btn.Value;
                    newCB.label += btn.label;
                    expression.splice(lastIndex, 1, newCB);
                }

                return expression;
            case EButtonTypeEnum.unario:
                if(lastCB.ValueType === EButtonTypeEnum.binario) {
                    expression.splice(lastIndex, 1, btn);
                } else {
                    expression.Add(btn);
                }

                return expression;
            case EButtonTypeEnum.binario:
                expression.Add(btn);
                
                return expression;
            default:
                return expression;
        }
    }

    private SetExpression(Expression: Array<CalcButton>) {
        this.setState({Expression});
    }

    private HandleDisplayEx(btn: CalcButton) {
        const { displayEx } = this.state;
        let DisplayEx = '';
        if(displayEx === '') {
            DisplayEx += btn.Value;
        } else {
            DisplayEx = displayEx;
            let boChecker = DisplayEx.charAt(DisplayEx.length - 2);
            let isBO: boolean;
            try { isBO = this.ButtonValues.First(cb => cb.Value === boChecker).ValueType === EButtonTypeEnum.binario; }
            catch (e) { isBO = false; };
            switch(btn.ValueType) {
                case EButtonTypeEnum.numero:
                    DisplayEx += btn.Value;
                break;
                case EButtonTypeEnum.unario:
                    if(btn.Value === '!') {
                        DisplayEx += btn.Value;
                    } else {
                        let index = DisplayEx.lastIndexOf(' ');
                        let remainString = DisplayEx.slice(0, index + 1);
                        let inputString = DisplayEx.slice(index + 1);
                        remainString += `${btn.Value}(${inputString})`;
                        DisplayEx = remainString;
                    }
                break;
                case EButtonTypeEnum.binario:
                    if(isBO) {
                        DisplayEx = DisplayEx.slice(0, DisplayEx.length - 2);
                        DisplayEx += `${btn.Value} `;
                    } else {
                        let btnValue = btn.Value;
                        btnValue = ` ${btn.Value} `;
                        DisplayEx += btnValue;
                    }
                break;
            }
        }

        this.setState({
            displayEx: DisplayEx
        });
    }

    public handleClickButton(btn: CalcButton) {
        const { Expression } = this.state;

        switch(btn.ValueType) {
            case EButtonTypeEnum.clear:
                this.Clear();
                return;
            case EButtonTypeEnum.equals:
                //let result = Calculator.Evaluate(Expression);
                //this.DisplayResult(result);
                return;
            default:
                let expression = this.HandleExpression(btn);
                this.SetExpression(expression);
                this.HandleDisplayEx(btn);
                return;
        }
    }

    render() {
        const { displayEx, displayResult } = this.state;
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
                        displayEq={displayEx}
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