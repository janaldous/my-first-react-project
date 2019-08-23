import *  as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { EmployeeDetail } from './EmployeeDetail';
import { EmployeeForm } from './EmployeeForm';
import { EmployeeList } from './EmployeeList';
import { WebRoutes } from '../App';

export interface EmployeeRouteProps {
    id: string
}

export const Employee:React.FunctionComponent = (props: {}) => {
    return (
        <Switch>
            <Route exact path={WebRoutes.EmployeeForm} component={EmployeeForm} />
            <Route exact path={WebRoutes.EmployeeDetail} component={EmployeeDetail} />
            <Route path={WebRoutes.EmployeeList} component={EmployeeList} />
        </Switch>
    );
}