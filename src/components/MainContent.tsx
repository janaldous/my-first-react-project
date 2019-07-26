import * as React from "react";
import "./textpage/textpage.scss";

export interface MainContentProps { 
    title: string;
}

export const MainContent: React.FunctionComponent<MainContentProps> = (props) => {
    return (
        <div>
            <div className="long-text">
                <h1>{ props.title }</h1>
                { props.children }
            </div>
        </div>
    );
};
