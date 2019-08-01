
import * as React from "react";
import { HashRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
// import './nav-bar.scss'; WHATTT

export interface MenuItemProps {
    url: string;
    name: string;
    toggle: boolean;
};

export interface MenuItemState {
    toggle: boolean;
};

export const SideItem: React.FunctionComponent<MenuItemProps> = (props) => {
    return (
        <div className="menu-item main-item">
            <NavLink to={props.url} className="link">
                <div className="menu-icon"></div>
                {!props.toggle && <div className="menu-name">{props.name}</div>}
            </NavLink >
        </div>
    );
}