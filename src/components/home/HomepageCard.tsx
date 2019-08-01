import * as React from "react";
import "./home.scss";
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'

export interface HomeCardProps { 
    name: string; 
    url: string;
    type: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export const HomepageCard: React.FunctionComponent<HomeCardProps> = (props) => {
    let additionalTypes = "";
    
    if (props.type === "long-right") {
        additionalTypes += "long-right";
    } else if (props.type === "long-left") {
        additionalTypes += "long-left";
    }
    
    return (
        <Link to={props.url} className={`link ${additionalTypes}`}>
            <div className="box">
                {props.name}
            </div>
        </Link>
    );
};
