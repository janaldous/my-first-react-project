import * as React from "react";
import './main-content.scss';

export interface MainContentProps {
    title: string;
    classname?: string;
}

export const MainContent: React.FunctionComponent<MainContentProps> = (props) => {
    return (
        <div className={"main-content " + props.classname}>
            <h1>{props.title}</h1>
            {props.children}
        </div>
    );
};
