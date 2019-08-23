import *  as React from 'react';
import {Square} from './Square';

interface BoardState {
    squares: Array<string>
}

export class Board extends React.Component<{}, BoardState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        }
    }

    handleClick(i: number) {
        const squares = this.state.squares.slice();
        squares[i] = 'X';
    }

    // renderSquare(i:number) {
    //     return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}></Square>
    // }
}