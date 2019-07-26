import * as React from "react";
import './side-bar.scss';
import { SideItem } from "./SideItem";
import { pages } from "../App";

interface NavBarProps {

};

interface NavBarState {
    toggle: boolean;
}

export class SideBar extends React.Component<NavBarProps, NavBarState> {
    constructor(props: NavBarProps) {
        super(props);
        this.state = {
            toggle: false
        };
    }
    // toggle=true && icons only sidebar
    // toggle=false && show all sidebar

    toggle = () => {
        this.setState(state => ({
            toggle: !state.toggle
        }));
    };

    render() {
        return (
            <div className={"sidebar " + (this.state.toggle ? "sidebar-toggled" : "")} >
                <div className="menu-item">
                    <div className="cross">
                        <div className={(this.state.toggle ? "hamburger-icon-container" : "change")} onClick={this.toggle}>
                            <div className="bar1"></div>
                            <div className="bar2"></div>
                            <div className="bar3"></div>
                        </div>
                    </div>
                </div>
                {
                    pages.map((p) => {
                        return <SideItem key={p.name} name={p.name} url={p.url} toggle={this.state.toggle} />
                    })
                }
            </div>
        );
    }
};

