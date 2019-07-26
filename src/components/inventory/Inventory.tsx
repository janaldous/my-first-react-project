import * as React from "react";
import { InventoryDetailProps } from "./InventoryDetail";
import { MainContent } from "../MainContent";
import "./inventory.scss";
import { InventoryListItem } from "./InventoryListItem";

export interface InventoryProps { 
    lorenIpsum: string; 
}

export const Inventory: React.FunctionComponent<InventoryProps> = (props) => {

    const inventoryList: Array<InventoryDetailProps> = [
        {
            employee: 1,
            employeeId: "xyml",
            itemId: "0978981639461",
            itemName: "Computer",
            dateAllocated: "2008-08-08"
        },
        {
            employee: 2,
            employeeId: "xylo",
            itemId: "0978981639461",
            itemName: "Head phones",
            dateAllocated: "2008-08-08"
        },
        {
            employee: 3,
            employeeId: "xyca",
            itemId: "0978981639461",
            itemName: "Mouse",
            dateAllocated: "2008-08-08"
        },
        {
            employee: 4,
            employeeId: "xyip",
            itemId: "0978981639461",
            itemName: "Monitor",
            dateAllocated: "2008-08-08"
        }
    ];

    return (
        <MainContent title="Inventory">
            <div className="inventory-container">
                {
                    inventoryList.map((item) => {
                        return <InventoryListItem item={item}/>
                    })
                }
            </div>
        </MainContent>
    );
};
