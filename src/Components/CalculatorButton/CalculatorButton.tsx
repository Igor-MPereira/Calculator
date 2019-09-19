import React from 'react';
import { CalculatorButtonProps } from './types';
import { Grid, Button, makeStyles, Theme, createStyles } from '@material-ui/core';

export default function CalculatorButton(props: CalculatorButtonProps) {

    return (
        <Button
            variant='contained'
            color='primary'
            size='small'
            value={props.buttonValue}
            onClick={e => props.handleClickButton(e.currentTarget.value)}
        >
            {props.buttonValue.toLowerCase()}
        </Button>
    );
}