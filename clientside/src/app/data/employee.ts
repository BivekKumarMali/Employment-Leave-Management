export interface employee{
    id:number;
    name: string;
    email: string;
    password: string;
    dob: Date;
    doj: Date;  
    salary: number;  
}
export interface EmployeeResolved {
    employee: employee;
    error?: any;
}
