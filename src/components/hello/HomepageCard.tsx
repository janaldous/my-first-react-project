import * as React from "react";
import "./hello.scss";
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'

export interface HomeCardProps { name: string; url: string }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export const HomepageCard: React.FunctionComponent<HomeCardProps> = (props) => {
    return (
        <Link to={props.url} className="link">
            <div className="box">
                <p>{props.name}</p>
            </div>
        </Link>
    );
};
