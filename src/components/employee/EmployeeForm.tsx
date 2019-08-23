import *  as React from 'react';
import { EmployeeProps } from './EmployeeDetail';
import { EmployeeService, Employee } from '../../services/EmployeeService';
import { MainContent } from '../MainContent';
import { RouteComponentProps } from 'react-router';
import { EmployeeRouteProps } from './Employee';
import { LoadingOverlay } from '../shared/LoadingOverlay';
import { NotificationPanel, NotificationContext } from '../shared/NotificationPanel';
import { ValidationResult } from '../../services/EmployeeService';

interface EmployeeState {
    firstname: string;
    lastname: string;
    role: string;
}

interface EmployeeFormState {
    employee: EmployeeState;
    errors: EmployeeState;
    isLoading: boolean;
    isSuccessfullySaved: boolean;
    savedMessage?: string;
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
            errors: {
                firstname: "",
                lastname: "",
                role: "",
            },
            isLoading: false,
            isSuccessfullySaved: false,
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
        this.setState({isLoading: true, isSuccessfullySaved: false});
        EmployeeService.saveEmployee(employee)
            .then(value => console.log(value, "submitted"))
            .then(() => this.setState({isLoading: false, isSuccessfullySaved: true, savedMessage: "Successfully saved"}))
            .catch((reason) => { this.handleErrors(reason.errors); this.setState({isSuccessfullySaved: true, savedMessage: "Form has errors"});})
            .finally(() => this.setState({isLoading: false}));
    }

    handleErrors(errors: Array<ValidationResult>) {
        errors.forEach(x => {
            this.setState({ errors: {...this.state.errors, [x.fieldName]: x.errorMessage }});
        });
    }

    handleChange(e: React.FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement;
        const name: string = target.name;
        const value = target.value;
        this.setState({employee: {...this.state.employee, [name]: value}, isSuccessfullySaved: false});
    }

    toggleVisibility = () => {
        this.setState({isSuccessfullySaved: !this.state.isSuccessfullySaved});
    }

    render() {
        return (
            <MainContent title="Employee form">
                <NotificationContext.Provider value={{ visible: this.state.isSuccessfullySaved }}>
                    <LoadingContext.Provider value={{ isLoading: this.state.isLoading }}>
                        <div className="employee-form-container">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-row">
                                    <label htmlFor="firstname" className="form-label">First Name</label>
                                    <input onChange={this.handleChange} type="text" name="firstname" value={this.state.employee.firstname} className={this.state.errors.firstname.length > 0 ? "error": ""} />
                                    <div className="validation-message">{this.state.errors.firstname}</div>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="lastname" className="form-label">Last Name</label>
                                    <input onChange={this.handleChange} type="text" name="lastname" value={this.state.employee.lastname} className={this.state.errors.lastname.length > 0 ? "error": ""}/>
                                    <div className="validation-message">{this.state.errors.lastname}</div>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="role" className="form-label">Role</label>
                                    <input onChange={this.handleChange} type="text" name="role" value={this.state.employee.role} className={this.state.errors.role.length > 0 ? "error": ""}/>
                                    <div className="validation-message">{this.state.errors.role}</div>
                                </div>
                                <button type="submit">Add an employee</button>
                            </form>
                            <LoadingContext.Consumer>
                                { ({isLoading}) => (isLoading && <LoadingOverlay/>) }
                            </LoadingContext.Consumer>
                            <NotificationContext.Consumer>
								{ ({visible}) => (visible && <NotificationPanel message={this.state.savedMessage} toggleVisibility={() => {this.toggleVisibility()}} isVisible={this.state.isSuccessfullySaved}></NotificationPanel>) }
							</NotificationContext.Consumer>
                        </div>
                    </LoadingContext.Provider>
                </NotificationContext.Provider>
            </MainContent>
        );
    }
}
