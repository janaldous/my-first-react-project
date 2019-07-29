import * as React from "react";
import { HomepageCard } from "./HomepageCard";
import "./home.scss";
import { pages } from "../App";
import { MainContent } from "../MainContent";

export interface HelloProps { compiler: string; library: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export const Hello: React.FunctionComponent<HelloProps> = (props) => {
    
    return (
        <MainContent title={`Hello from ${props.compiler} and ${props.library}!`}>
            <div className="home">
                {
                    pages.map((p) => {
                        return <HomepageCard name={p.name} url={p.url}/>
                    })
                }
            </div>
        </MainContent>
    );
};
