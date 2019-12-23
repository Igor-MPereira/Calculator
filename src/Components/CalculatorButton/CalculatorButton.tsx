import React from 'react';
import { CalculatorButtonProps } from './types';
import { Grid, Button, makeStyles, Theme, createStyles } from '@material-ui/core';
import CalcButton from '../../Helpers/CalcButton';
import { EDifficultyLevelEnum } from '../../Helpers/Enums/DifficultyLevelEnum';

export default function CalculatorButton(props: CalculatorButtonProps) {

    function MountButton(calcLvl: EDifficultyLevelEnum) {
        if((calcLvl === EDifficultyLevelEnum.medium || calcLvl === EDifficultyLevelEnum.hard) && props.buttonValue) {
            return (
                <Button
                    variant='contained'
                    color='secondary'
                    size='small'
                    value={props.buttonValue.Value}
                    onClick={(e) => {
                        props.handleClickButton(e.currentTarget.value);
                    }}
                >
                    {props.buttonValue.label}
                </Button>
            );
        } else if(calcLvl === EDifficultyLevelEnum.easy && props.stringButtonValue) {
            return (
                <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    value={props.stringButtonValue}
                    onClick={(e) => {
                        props.handleClickButton(e.currentTarget.value);
                    }}
                >
                    {props.stringButtonValue}
                </Button>
            );
        }

        return null;
    }

    return MountButton(props.calcLvl);
}