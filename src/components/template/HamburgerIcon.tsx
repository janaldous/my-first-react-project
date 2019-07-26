import * as React from "react";
import './navbar.scss';

interface HamburgerIconState {
    isSidebarOpen: boolean;
};

interface HamburgerIconProps {
    toggleFn: Function;
};

export class HamburgerIcon extends React.Component<HamburgerIconProps, HamburgerIconState> {

    render() {
        return (
            <div className="cross">
                <div className={(this.state.isSidebarOpen ? "hamburger-icon-container" : "change")} >
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
            </div>
        );
    }
}