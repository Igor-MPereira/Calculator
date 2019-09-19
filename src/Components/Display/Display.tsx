import React from 'react';
import { DisplayProps } from './types';
import { Grid, Paper, Theme, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    Paper: {
        display: 'flex',
        width: '100%',
        padding: 5,
        height: 40
    },
    Container: {
        display: 'flex',
        width: '100%',
        paddingTop: 15
    }
}))

export default function Display(props: DisplayProps) {
    const classes = useStyles();
    const display = props.displayResult == null ? props.displayEq : props.displayResult;

    return (
        <Grid
            container
            justify='center'
            className={classes.Container}
        >
            <Grid 
                item
                xs={4}
            >
                <Paper
                    className={classes.Paper}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: 15,
                        paddingRight: 15
                    }}
                >
                    <Typography
                        style={props.displayResult == null ? {
                            fontSize: 20
                        } : {
                            fontSize: 28,
                            fontWeight: 'bold',
                            color: '#0ccc3c'
                        }}
                    >
                        {display}
                    </Typography>
                </Paper>
            </Grid>    
        </Grid>
    );
}