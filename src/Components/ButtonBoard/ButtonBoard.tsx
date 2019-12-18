import React from 'react';
import { ButtonBoardProps } from './types';
import { Grid } from '@material-ui/core';
import CalculatorButton from '../CalculatorButton/CalculatorButton';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    ButtonGrid: {
        padding: '8px 0',
        display: 'flex',
        justifyContent: 'center'
    }
})

export default function ButtonBoard(props: ButtonBoardProps) {
    const classes = useStyles();

    return (
        <Grid
            container
            justify='space-between'
        >
            {
                props.buttonValues.map(buttonValue => (
                    <Grid
                        item
                        xs={3}
                        className={classes.ButtonGrid}
                        key={buttonValue.Value}
                    >
                        <CalculatorButton 
                            buttonValue={buttonValue} 
                            handleClickButton={props.handleClickButton}
                        />
                    </Grid>
                ))
            }
        </Grid>
    );
}