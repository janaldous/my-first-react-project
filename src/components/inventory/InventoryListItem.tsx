import * as React from "react";
import "./inventory.scss";
import { Link } from "react-router-dom";
import { InventoryItem } from '../../services/InventoryService';

export interface InventoryListItemProps {
    item: InventoryItem; 
}

export const InventoryListItem: React.FunctionComponent<InventoryListItemProps> = (props) => {
    return (
        <Link to={`/inventory/${props.item.id}`} className="link">
            <div className="inventory-detail">
                <div className="pic">
                    <div className="center-text">{props.item.name.substring(0,1)}</div>
                </div>
                <div className="description">
                    <div className="item-name">{props.item.name}</div>
                    <div className="inline">ID {props.item.id}</div>
                    <div className="inline">Given to {props.item.employee} on {props.item.dateAllocated}</div>
                </div>
            </div>
        </Link>
    );
};