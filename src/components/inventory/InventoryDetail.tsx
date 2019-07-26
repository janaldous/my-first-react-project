import * as React from "react";
import { MainContent } from "../MainContent";

export interface InventoryDetailProps {
    employee: number;
    employeeId: string;
    itemId: string;
    itemName: string;
    dateAllocated: string;
}

export const InventoryDetail: React.FunctionComponent = (props: any) => {

    const items = [
        "one",
        "two"
    ];

    return (
        <MainContent title="Inventory detail">
            <ul>
                {
                    items.map(x => { return <li>{x}</li> })
                }
            </ul>
        </MainContent>
    );
};
