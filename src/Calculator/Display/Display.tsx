import React, { Component } from 'react';
import { IDisplayProps } from './types';

export default class Display extends Component<IDisplayProps>  {
    constructor(props: IDisplayProps) {
        super(props);
    }

    render() {
        return(
            <div></div>
        );
    }
}