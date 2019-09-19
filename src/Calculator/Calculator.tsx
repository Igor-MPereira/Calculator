import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { CalculatorProps } from './types';
import Display from '../Components/Display';
import ButtonBoard from '../Components/ButtonBoard';

export default function Calculator(props: CalculatorProps) {
    const buttonValues = ['1','2','3','4','5','6','7','8','9','0','+','-','x','/','^','='];
    const [ number1, setNumber1 ] = useState<string | null>(null);
    const [ number2, setNumber2 ] = useState<string | null>(null);
    const [ operator, setOperator ] = useState<string | null>(null);
    const [ displayEq, setDisplayEq ] = useState<string>('');
    const [ displayResult, setDisplayResult ] = useState<string | null>(null);

    function handleChangeNumber(value: string) {
        if( operator == null ) {
            if(number1 == null) {
                setNumber1(value)
            } else {
                setNumber1( prevNumber1 => prevNumber1 + value );
            }
        } else if( operator === '=') {
            setNumber1(value);
            setOperator(null);
        } else {
            if(number2 == null) {
                setNumber2(value)
            } else {
                setNumber2( prevNumber2 => prevNumber2 + value );
            }
        }
    }

    function handleChangeOperator(value: string) {
        setOperator(value);
    }

    function handleWriteEq(value: string) {
        let newValue: string = value;
        if( value === ('+' || '-' || 'x' || '^' || '/') ) {
            newValue = `  ${value}  `;
        } else if( value === '=' ) {
            newValue = ''
        }
        setDisplayEq( prevDisplayEq => prevDisplayEq + newValue );
        if(displayResult != null) {
            setDisplayResult(null);
        }
    }

    function handleDisplayResult(value: string, result: string) {
        if(value === '=') {
            setDisplayEq('')
            setDisplayResult(result)
        }
    }

    async function handleClickButton(value: string) {
        handleWriteEq(value);
        if(!isNaN(Number(value))) {
            handleChangeNumber(value);
        } else {
            await handleOperation(value);
            await handleChangeOperator(value);
        }
    }

    async function handleOperation(value: string) {
        const value1: number = Number(number1);
        const value2: number = Number(number2);
        let result: number = Number(number1);      

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
                    let powerResult: number = value1;
                    if(value2 === 0) {
                        powerResult = 1
                    }else if(value2 < 0) {

                    } else {
                        for(let i = 1; i < value2; i++) {
                            powerResult = powerResult * value1
                        }
                    }
                    result = powerResult
            }
        }

        await setNumber1(result.toString());
        setNumber2(null);
        handleDisplayResult(value, result.toString());
    }

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
                    buttonValues={buttonValues} 
                    handleClickButton={handleClickButton}
                />
            </Grid>
        </Grid>
    );
} 