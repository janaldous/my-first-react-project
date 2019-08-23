import *  as React from 'react';

export interface SquareProps {
    value: string;
    onClick(i: number): any;
}

export class Square extends React.Component<SquareProps, {}> {
    constructor(props: SquareProps) {
        super(props);
        this.state = {
            value: null
        };
    }

    click() {
       this.setState({value: 'X'});
    }

    render() {
        return (
            <button className="square" onClick={this.click}>
                {this.props.value}
            </button>
        );
    }
}