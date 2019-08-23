import *  as React from 'react';
import { EmployeeProps } from './EmployeeDetail';
import { EmployeeService, Employee } from '../../services/EmployeeService';
import { MainContent } from '../MainContent';
import { RouteComponentProps } from 'react-router';
import { EmployeeRouteProps } from './Employee';
import { LoadingOverlay } from '../shared/LoadingOverlay';
import { NotificationPanel } from '../shared/NotificationPanel';

interface EmployeeState {
    firstname: string;
    lastname: string;
    role: string;
}

interface EmployeeFormState {
    employee: EmployeeState;
    isLoading: boolean;
}

export const LoadingContext = React.createContext({isLoading: false});

export class EmployeeForm extends React.Component<EmployeeProps & RouteComponentProps<EmployeeRouteProps>, EmployeeFormState> {

    static loadingContext = LoadingContext;

    constructor(props: EmployeeProps & RouteComponentProps<EmployeeRouteProps>) {
        super(props);
        this.state = {
            employee: {
                firstname: "",
                lastname: "",
                role: "",
            },
            isLoading: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (this.props.location.state) {
            const { id } = this.props.location.state;
            const employee: Employee = EmployeeService.getEmployee(Number(id));
            this.setState({ employee: { firstname: employee.firstname, lastname: employee.lastname, role: employee.role }});
        }
    }

    handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        let employee: Employee = this.state.employee as Employee;
        this.setState({isLoading: true});
        EmployeeService.saveEmployee(employee)
            .then(value => console.log(value, "submitted"))
            .then(() => this.setState({isLoading: false}));
    }

    handleChange(e: React.FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement;
        const name: string = target.name;
        const value = target.value;
        this.setState({employee: {...this.state.employee, [name]: value}});
    }

    render() {
        return (
            <MainContent title="Employee form">
                <LoadingContext.Provider value={{ isLoading: this.state.isLoading }}>
                    <div className="employee-form-container">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-row">
                                <label htmlFor="firstname" className="form-label">First Name</label>
                                <input onChange={this.handleChange} type="text" name="firstname" value={this.state.employee.firstname} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="lastname" className="form-label">Last Name</label>
                                <input onChange={this.handleChange} type="text" name="lastname" value={this.state.employee.lastname} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="role" className="form-label">Role</label>
                                <input onChange={this.handleChange} type="text" name="role" value={this.state.employee.role} />
                            </div>
                            <button type="submit">Add an employee</button>
                        </form>
                        <LoadingContext.Consumer>
                            { ({isLoading}) => (isLoading && <LoadingOverlay/>) }
                        </LoadingContext.Consumer>
                    </div>
                </LoadingContext.Provider>
            </MainContent>
        );
    }
}
