import *  as React from 'react';
import { Link } from 'react-router-dom';
import "./employee.scss";
// import user from './user.svg';
import { InventoryDetailProps } from "../inventory/InventoryDetail";
import { InventoryListItemSmall } from "../inventory/InventoryListItem";

export interface EmployeeProps {
    id: number,
    name: string,
    firstname: string,
    lastname: string,
    role: string,
    assignedItems: Array<InventoryDetailProps>
}

export const Employee: React.FunctionComponent = (props: {}) => {

    const employee: EmployeeProps = {
        id: 1,
        name: "Lorem Ipsum",
        firstname: "Lorem",
        lastname: "Ipsum",
        role: "Software Developer",
        assignedItems: [
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
            }
        ]
    };



    return (
        <div className="employee-detail">
            <div className="name-info">
                <div className="name">
                    <div className="firstname">{employee.firstname}</div>
                    <div className="lastname">{employee.lastname}</div>
                </div>

                <div className="profile-pic"></div>
            </div>
            <div className="role">{employee.role}</div>

            <div className="inventory-list">
                <div className="inventory-list-title">Inventory</div>
                {
                    employee.assignedItems.map(item => {
                        return <InventoryListItemSmall item={item} />
                    })
                }
            </div>
            <div className="name"></div>

            <div>Hi der</div>
        </div>
    );
}