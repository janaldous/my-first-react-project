import *  as React from 'react';
import { EmployeeProps } from './Employee';

export const EmployeeForm: React.FunctionComponent<EmployeeProps> = (props: EmployeeProps) => {
    const onAdd = () => {
        // do something
        console.log("added something")
    };

    const onChange = () => {
        // do something else
        console.log("changed")
    }

    let formData = {
        name: props.name || "",
        role: props.role || ""
    };
    
    return (
        <div>
            <h1>Employee form</h1>
            <form onSubmit={onAdd}>
                <label htmlFor="name" >Name</label>
                <input onChange={onChange} type="text" name="name" value={formData.name} /><br/>
                <label htmlFor="role" >Role</label>
                <input onChange={onChange} type="text" name="role" value={formData.role} /><br/>
                <button type="submit">Add an employee</button><br/>
            </form>
        </div>
    );
}