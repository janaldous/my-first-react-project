import *  as React from 'react';
import { useContext } from 'react';

import { EmployeeService, Employee } from '../../services/EmployeeService';
import { MainContent } from '../MainContent';
import { LoadingContext, NotificationContext } from '../App';
import { InputContainer, lengthValidation, useInput, useForm } from './form';

export interface EmployeeFormProps {
    id: number,
    setNotificationMessage: (message: string) => void,
    setIsLoading: (isLoading: boolean) => void
}

export const EmployeeForm: React.FC<EmployeeFormProps> = (props: EmployeeFormProps) => {

    const inputFirstname = useInput("", {
        validations: [lengthValidation]
    });

    const inputLastname = useInput("", {
        validations: [lengthValidation]
    });

    const inputRole = useInput("", {
        validations: [lengthValidation]
    });

    const {setIsLoadingOn, setIsLoadingOff} = useContext(LoadingContext);
    const {setNotificationMessage} = useContext(NotificationContext);

    function handleSubmitCallback(e: React.SyntheticEvent) {
        e.preventDefault();
        let employee: Employee = {firstname: inputFirstname.value, lastname: inputLastname.value, role: inputRole.value, name: `${inputFirstname.value} ${inputLastname.value}`};
        setIsLoadingOn();
        setNotificationMessage("sameple message");
        EmployeeService.saveEmployee(employee)
            .then(value => console.log(value, "submitted"))
            .then(() => setNotificationMessage("Successfully saved"))
            .catch((reason) => { inputFirstname.setErrors([reason.firstname]); inputLastname.setErrors([reason.lastname]); inputRole.setErrors([reason.role]); })
            .finally(() => setIsLoadingOff());
    }

    const form = useForm({ inputFirstname, inputLastname, inputRole }, handleSubmitCallback);

    // useEffect(() => {
    //     const { id } = props;
    //     let employee: Employee = EmployeeService.getEmployee(Number(id));
    //     if (!employee) {
    //         employee = { name: "", firstname: "", lastname: "", role: "" };
    //     }
    //     inputFirstname.setValue(employee.firstname);
    //     inputLastname.setValue(employee.lastname);
    //     inputRole.setValue(employee.role);
    // });

    return (
        <MainContent title="Employee form">
            <div className="employee-form-container">
                <form onSubmit={form.submit}>
                    <div className="form-row">
                        <InputContainer input={inputFirstname} label="First name">
                            <input
                                type="text"
                                name="firstname"
                                value={inputFirstname.value}
                                onChange={inputFirstname.onChange}
                                onBlur={inputFirstname.onBlur}
                            />
                        </InputContainer>
                    </div>
                    <div className="form-row">
                        <InputContainer input={inputLastname} label="Last name">
                            <input
                                type="text"
                                name="lastname"
                                value={inputLastname.value}
                                onChange={inputLastname.onChange}
                                onBlur={inputLastname.onBlur}
                            />
                        </InputContainer>
                    </div>
                    <div className="form-row">
                        <InputContainer input={inputRole} label="Role">
                            <input
                                type="text"
                                name="lastname"
                                value={inputRole.value}
                                onChange={inputRole.onChange}
                                onBlur={inputRole.onBlur}
                            />
                        </InputContainer>
                    </div>
                    <button disabled={!form.isValid} onClick={form.submit}>
                        {form.isValid ? "✅" : "❌"} Submit
                    </button>
                    <button onClick={handleSubmitCallback}>
                        loading overlay
                    </button>
                </form>
            </div>
        </MainContent>
    );
}
