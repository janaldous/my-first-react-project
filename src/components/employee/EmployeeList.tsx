import *  as React from 'react';
import { Link } from 'react-router-dom';
import { MainContent } from "../MainContent";
import { WebRoutes } from "../App";
import { Employee as EmployeeDto, EmployeeService } from '../../services/EmployeeService';

export interface EmployeeListState {
    data: Array<EmployeeDto>;
}

export class EmployeeList extends React.Component<{}, EmployeeListState> {
    constructor(props: any) {
        super(props);

        this.state = {
            data: null,
        };
    }

    componentDidMount() {
        this.setState({ data: EmployeeService.getAllEmployees() });
    }

    render() {
        return (
            <MainContent title="Employees in Insert Company Here">
                <div className="employee-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>View</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data && this.state.data.map((e) => {
                                return (
                                    <tr key={e.id}>
                                        <td>{e.name}</td>
                                        <td>{e.role}</td>
                                        <td><Link to={{
                                            pathname: `/employee/${e.id}`,
                                        }} className="pill view">View</Link></td>
                                        <td><Link to={{
                                            pathname: `/employee/new`,
                                            state: { ...e },
                                        }} className="pill edit">Edit</Link></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="button-row">
                        <Link to={WebRoutes.EmployeeForm} className="button">Add employee</Link>
                    </div>
                </div>
            </MainContent>
        );
    };
}