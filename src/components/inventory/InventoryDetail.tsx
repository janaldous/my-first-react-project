import * as React from "react";
import { MainContent } from "../MainContent";
import { InventoryService, InventoryItem } from "../../services/InventoryService";
import { RouteComponentProps } from 'react-router';

export interface InventoryDetailProps {
	employee: number;
	employeeId: string;
	id: string;
	name: string;
	dateAllocated: string;
}

interface InventoryDetailState {
	item: InventoryItem;
}

interface InventoryRouteProps {
	id: string;
}

export class InventoryDetail extends React.Component<InventoryDetailProps & RouteComponentProps<InventoryRouteProps>, InventoryDetailState> {
	constructor(props: InventoryDetailProps & RouteComponentProps<InventoryRouteProps>) {
		super(props);
		this.state = {
			item: null
		};
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		this.setState({ item: InventoryService.getItemById(Number(id)) });
	}

	render() {
		return (
			<MainContent title={this.state.item && this.state.item.name}>
				{
					<ul>
						<li>{this.state.item && this.state.item.dateAllocated}</li>
					</ul>
				}
			</MainContent>
		);
	}
};
