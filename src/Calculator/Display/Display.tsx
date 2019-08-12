import React, { Component } from 'react';
import { IDisplayProps } from './types';
import {
    Grid
} from '@material-ui/core';
import '../Style.scss'

export default class Display extends Component<IDisplayProps>  {
    constructor(props: IDisplayProps) {
        super(props);
    }

    render() {
        let display = <></>;

        if(this.props.isEqual) {
            display = (
                <div className='displayResultStyle'>{this.props.displayResult}</div>
            )
        } else {
            display = (
                <div>{this.props.displayEquation}</div>
            )
        }

        return(
            <div>
                <Grid container>
                    <Grid item xs={3}>
                        {display}
                    </Grid>
                </Grid>
            </div>
        );
    }
}