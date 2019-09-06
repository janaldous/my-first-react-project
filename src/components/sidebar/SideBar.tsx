import * as React from "react";
import { useState } from "react";
import './side-bar.scss';
import { SideItem } from "./SideItem";
import { pages } from "../App";

interface NavBarProps {
    isOpen: boolean;
    toggle: () => void
};

export const SideBar: React.FC<NavBarProps> = (props:NavBarProps) => {
    return (
        <div className={"sidebar " + (props.isOpen ? "sidebar-close" : "")} >
            <div className="menu-item">
                <div className="cross">
                    <div className={"hamburger-icon-container"} onClick={props.toggle}>
                        <div className={"bar1" + (props.isOpen ? "" : " change")}></div>
                        <div className={"bar2" + (props.isOpen ? "" : " change")}></div>
                        <div className={"bar3" + (props.isOpen ? "" : " change")}></div>
                    </div>
                </div>
            </div>
            {
                pages.map((p) => {
                    return <SideItem key={p.name} name={p.name} url={p.url} toggle={props.isOpen} />
                })
            }
        </div>
    );
};

