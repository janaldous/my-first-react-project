import *  as React from 'react';
import { RouteComponentProps } from 'react-router';
import { InventoryListItem } from "../inventory/InventoryListItem";
import { EmployeeService, Employee } from '../../services/EmployeeService';
import { InventoryService, InventoryItem } from '../../services/InventoryService';
import { EmployeeRouteProps } from './Employee';
import "./employee.scss";

export interface EmployeeProps {
    id: number
}

interface EmployeeState {
    employee: Employee
    assignedItems?: Array<InventoryItem>
}

export class EmployeeDetail extends React.Component<EmployeeProps & RouteComponentProps<EmployeeRouteProps>, EmployeeState> {

    constructor(props: any) {
        super(props);
        this.state = {
            employee: {
                firstname: "Firstname",
                lastname: "Lastname",
                role: "Role",
                name: "Firstname Lastname",
                id: 0
            }
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const curEmployee:Employee = EmployeeService.getEmployee(Number(id));
        const items:Array<InventoryItem> = InventoryService.getItemByEmployee(Number(id));
        this.setState(state => ({
            employee: curEmployee,
            assignedItems: items
        }));
    }

    render() {
        let inventoryList:any;

        if (this.state.assignedItems && this.state.assignedItems.length > 0) {
            inventoryList = this.state.assignedItems.map(item => {
                return <InventoryListItem key={item.id} item={item} />
            })
        } else {
            inventoryList = <div>There are no items assigned to the employee.</div>
        }

        return (
            <div className="employee-detail-container">
                <div className="name-details">
                    <div className="name-info">
                        <div className="name">
                            <div className="firstname">{this.state.employee.firstname}</div>
                            <div className="lastname">{this.state.employee.lastname}</div>
                        </div>
                        <div className="profile-pic"></div>
                    </div>
                    <div className="role">{this.state.employee.role}</div>
                </div>

                <div className="inventory-list">
                    <div className="inventory-list-title">Inventory</div>
                    {inventoryList}
                </div>
            </div>
        );
    }
}