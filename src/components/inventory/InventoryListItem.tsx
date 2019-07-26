import * as React from "react";
import { InventoryDetailProps } from "./InventoryDetail";
import "./inventory.scss";
import { Link } from "react-router-dom";

export interface InventoryListItemProps { 
    item: InventoryDetailProps; 
}

export const InventoryListItem: React.FunctionComponent<InventoryListItemProps> = (props) => {
    return (
        <Link to="/inventory/detail" className="link">
            <div className="inventory-detail">
                <div className="pic">
                    <div className="center-text">{props.item.itemName.substring(0,1)}</div>
                </div>
                <div className="description">
                    <div className="item-name">{props.item.itemName}</div>
                    <div className="inline">ID {props.item.itemId}</div>
                    <div className="inline">Given to {props.item.employeeId} on {props.item.dateAllocated}</div>
                </div>
            </div>
        </Link>
    );
};

export const InventoryListItemSmall: React.FunctionComponent<InventoryListItemProps> = (props) => {
    return (
        <Link to="/inventory/detail" className="link">
            <div className="inventory-detail small-list-item">
                <div className="pic">
                    <div className="center-text">{props.item.itemName.substring(0,1)}</div>
                </div>
                <div className="description">
                    <div className="item-name">{props.item.itemName}</div>
                    <div className="inline">ID {props.item.itemId}</div>
                    <div className="inline">Given to {props.item.employeeId} on {props.item.dateAllocated}</div>
                </div>
            </div>
        </Link>
    );
};