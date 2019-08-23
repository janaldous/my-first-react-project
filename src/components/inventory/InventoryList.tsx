import * as React from "react";
import { MainContent } from "../MainContent";
import { InventoryListItem } from "./InventoryListItem";
import { InventoryItem, InventoryService } from "../../services/InventoryService";
import "./inventory.scss";

export interface InventoryListProps {
    lorenIpsum: string;
}

interface InventoryListState {
    items: Array<InventoryItem>
}

export class InventoryList extends React.Component<InventoryListProps, InventoryListState> {
    constructor(props: InventoryListProps) {
        super(props);
    }

    componentDidMount() {
        this.setState({ items: InventoryService.getAllItems() });
    }

    render() {
        return (
            <MainContent title="Inventory">
                <div className="inventory-container">
                    {
                        this.state && this.state.items.map((item) => {
                            return <InventoryListItem key={item.id} item={item} />
                        })
                    }
                </div>
            </MainContent>
        );
    }
};
