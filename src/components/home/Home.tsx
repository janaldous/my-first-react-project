import * as React from "react";
import { HomepageCard } from "./HomepageCard";
import "./home.scss";
import { pages } from "../App";
import { MainContent } from "../MainContent";

export interface HelloProps { 
    compiler: string; 
    library: string; 
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export const Hello: React.FunctionComponent<HelloProps> = (props) => {

    return (
        <MainContent title={`Hello from ${props.compiler} and ${props.library}!`}>
            <div className="home">
                <HomepageCard name={pages[1].name} url={pages[1].url} type="normal"/>
                <HomepageCard name={pages[2].name} url={pages[2].url} type="normal"/>
                <HomepageCard name={pages[0].name} url={pages[0].url} type="long-right"/>

                <HomepageCard name={pages[3].name} url={pages[3].url} type="long-left"/>
                <HomepageCard name={pages[4].name} url={pages[4].url} type="normal"/>
                <HomepageCard name={pages[5].name} url={pages[5].url} type="normal"/>
                {
                    pages.map((p) => {
                        return <HomepageCard name={p.name} url={p.url} type="normal" />
                    })
                }
            </div>
        </MainContent>
    );
};
