import React, { Component } from 'react';
import { ButtonsProps } from './types';
import {
    Grid,
    Container,
    Button
} from '@material-ui/core';
import { isNumber } from 'util';

export default class Buttons extends Component<ButtonsProps> {
    constructor(props: ButtonsProps) {
        super(props);
    }

    render() {
        return(
            <Grid container>
                <Container>
                    <Grid xs={3} item>
                        {
                            this.props.btnValues.map(value => (
                                <Button key={value} value={value} onClick={this.props.handleClick}>{value}</Button>
                            ))
                        }    
                    </Grid>
                </Container>
            </Grid>
        );
    }
}