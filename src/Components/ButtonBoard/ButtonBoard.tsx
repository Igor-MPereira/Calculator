import React from 'react';
import { ButtonBoardProps } from './types';
import { Grid } from '@material-ui/core';
import CalculatorButton from '../CalculatorButton/CalculatorButton';
import { makeStyles } from '@material-ui/styles';
import CalcButton from '../../Helpers/CalcButton';
import 'linq4js';
import { EDifficultyLevelEnum } from '../../Helpers/Enums/DifficultyLevelEnum';

const useStyles = makeStyles({
    ButtonGrid: {
        padding: '8px 0',
        display: 'flex',
        justifyContent: 'center'
    }
})

export default function ButtonBoard(props: ButtonBoardProps) {
    const classes = useStyles();

//#region CalculatorMedium & Hard
    function handleClickButton(value: string) {
        let Button = props.buttonValues && props.buttonValues.First(cb => cb.Value === value);

        if(Button && props.handleClickButton) {
            props.handleClickButton(Button);
        }
    }
//#endregion

    function MountButtons(calcLvl: EDifficultyLevelEnum) {
        if((calcLvl === EDifficultyLevelEnum.medium || calcLvl === EDifficultyLevelEnum.hard) && props.buttonValues) {
            return props.buttonValues.map(buttonValue =>
                <Grid
                    item
                    xs={3}
                    className={classes.ButtonGrid}
                    key={buttonValue.Value}
                >
                    <CalculatorButton 
                        calcLvl={calcLvl}
                        buttonValue={buttonValue} 
                        handleClickButton={handleClickButton}
                    />
                </Grid>
            );
        } else if(calcLvl === EDifficultyLevelEnum.easy && props.stringButtonValues) {
            return props.stringButtonValues.map(buttonValue =>
                props.handleClickButtonString &&
                <Grid
                    item
                    xs={3}
                    className={classes.ButtonGrid}
                    key={buttonValue}
                >
                    <CalculatorButton 
                        calcLvl={calcLvl}
                        stringButtonValue={buttonValue} 
                        handleClickButton={props.handleClickButtonString}
                    />
                </Grid>
            );
        }
    }

    return (
        <Grid
            container
            justify='space-between'
        >
            {
                MountButtons(props.calcLvl)
            }
        </Grid>
    );
}