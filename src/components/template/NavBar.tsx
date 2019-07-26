import * as React from "react";
import './navbar.scss';

interface NavBarProps {

};

export const NavBar: React.FunctionComponent<NavBarProps> = (props) => {
    return (
        <div className="navbar">
            <div className="navbar-item navbar-logo"></div>
            <div className="navbar-item">Hello</div>
            <div className="navbar-item">World</div>
            <div className="navbar-item">Lorem</div>
            <div className="navbar-item">Ipsum</div>
        </div>
    );
}