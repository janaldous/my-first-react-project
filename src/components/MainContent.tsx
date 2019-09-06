import * as React from "react";
import './main-content.scss';

export interface MainContentProps {
    title: string;
    classname?: string;
}

export const MainContent: React.FunctionComponent<MainContentProps> = (props) => {
    let classname = props.classname || '';

    return (
        <div className={"main-content " + classname}>
            <div className="h1">{props.title}</div>
            {props.children}
        </div>
    );
};
