import *  as React from 'react';

export interface CounterProps {}

export interface CounterState {
    count: number
}

export class Counter extends React.Component<CounterProps, CounterState> {
    state = {
        count : 0
    };

    increment = () => {
        this.setState({
            count: (this.state.count+1)
        });
    };

    decrement = () => {
        this.setState({
            count: (this.state.count-1)
        });
    };

    render() {
        return (
            <div>
                <h1>{ this.state.count }</h1>
                <button onClick={ this.increment }>Increment</button>
                <button onClick={ this.decrement }>Decrement</button>
            </div>
        );
    };
}