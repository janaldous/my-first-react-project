import *  as React from 'react';
import { Link } from 'react-router-dom';
import { MainContent } from "../MainContent";

export class EmployeeList extends React.Component {
    state = {
        employees: [
            {
                id: 1,
                name: "Janno Gibbs",
                role: "Software Developer"
            },
            {
                id: 2,
                name: "Janno Ronaldo Ilagan Gibbs",
                role: "Software Devoleper"
            },
            {
                id: 3,
                name: "Marc Logan",
                role: "Quality Assurance Tester"
            }
        ]
    }

    render() {
        return (
            <MainContent title="Employees in Insert Company Here">
                <div className="employee-table">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>View</th>
                            <th>Edit</th>
                        </tr>
                        {this.state.employees.map((e) => {
                            return (
                                <tr>
                                    <td key={e.id}>{e.name}</td>
                                    <td>{e.role}</td>
                                    <td><Link to={{
                                        pathname: `/employee/detail`,
                                        state: { ...e }
                                    }} className="pill view">View</Link></td>
                                    <td><Link to={{
                                        pathname: `/employee/new`,
                                        state: { ...e }
                                    }} className="pill edit">Edit</Link></td>
                                </tr>
                            );
                        })}
                    </table>
                    
                    <div className="button-row">
                        <Link to="employee/new" className="button">Add employee</Link>
                    </div>
                </div>
            </MainContent>
        );
    };
}