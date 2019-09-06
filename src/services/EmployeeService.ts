
export interface ValidationResult {
    fieldName: string;
    errorMessage: string;
}

export interface Employee {
    id?: number,
    name: string,
    firstname: string,
    lastname: string,
    role?: string,
}

export class EmployeeService {
    static employees:Array<Employee> = [
        {
            id: 1,
            name: "Jon Snow",
            firstname: "Jon",
            lastname: "Snow",
            role: "Software Developer"
        },
        {
            id: 2,
            name: "Daenerys Targaryen",
            firstname: "Daenerys",
            lastname: "Targaryen",
            role: "Software Developer"
        },
        {
            id: 3,
            name: "Arya Stark",
            firstname: "Arya",
            lastname: "Stark",
            role: "Quality Assurance Tester"
        }
    ];

    static getEmployee(id: number) {
        if (--id >= EmployeeService.employees.length) throw new Error();
        return EmployeeService.employees[id--];
    }

    static getAllEmployees() {
        return EmployeeService.employees;
    }
    
    static saveEmployee(employee: Employee) {
        return new Promise((resolve, reject) => {
            console.log("saving employee");
            setTimeout(() => {
                // let errors:Array<ValidationResult> = [];
                // errors.push({
                //     fieldName: "firstname",
                //     errorMessage: "Required field"
                // });
                // if (errors.length > 0) {
                //     reject({errors});
                // }
                resolve(EmployeeService.employees.push(employee));
            }, 5000);
        });
    }
}