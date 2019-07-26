import * as React from "react";
import { HomepageCard } from "./HomepageCard";
import "./hello.scss";
import { pages } from "../App";

export interface HelloProps { compiler: string; library: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export const Hello: React.FunctionComponent<HelloProps> = (props) => {
    
    return (
        <div>
            <div className="title">
                <h1>Hello from {props.compiler} and {props.library}!</h1>
            </div>
            <div className="main">
                {
                    pages.map((p) => {
                        return <HomepageCard name={p.name} url={p.url}/>
                    })
                }
            </div>
        </div>
    );
};
