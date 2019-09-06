import *  as React  from 'react';
import {useState, useEffect}  from 'react';

export interface CounterProps {}

export const Counter: React.FC<CounterProps> = (props: CounterProps) => {
    
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });

    return (
        <div>
            <p>You clicked { count } times</p>
            <button onClick={ () => setCount(count+1) }>Increment</button>
            <button onClick={ () => setCount(count-1) }>Decrement</button>
        </div>
    );
}