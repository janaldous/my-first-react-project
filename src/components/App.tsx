import * as React from "react";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Hello } from "./home/Home";
import { Counter } from "./Counter";
import { Employee } from "./employee/Employee";
import { NoContent } from "./NoContent";
import { About } from "./textpage/About";
import { Inventory } from "./inventory/Inventory";
import { SideBar } from "./sidebar/SideBar";
import { NavBar } from "./sidebar/NavBar";
import { NotificationPanel } from "./shared/NotificationPanel";
import "./app.scss";

interface NavBarRoutes {
	url: string;
	name: string;
	children?: Array<NavBarRoutes>;
};

export enum WebRoutes {
	EmployeeList = "/employee",
	EmployeeDetail = "/employee/:id",
	EmployeeForm = "/employee/new",
	InventoryMain = "/inventory",
	InventoryList = "/inventory",
	InventoryDetail = "/inventory/:id"
}

export const pages: Array<NavBarRoutes> = [
	{ name: "Home", url: "/" },
	{ name: "About", url: "/about" },
	{ name: "Counter", url: "/counter" },
	{ name: "Employees", url: WebRoutes.EmployeeList },
	{ name: "New Employee", url: WebRoutes.EmployeeForm },
	{ name: "Employee detail", url: WebRoutes.EmployeeDetail },
	{ name: "Inventory", url: "/inventory" },
	{ name: "Inventory detail", url: "/inventory/detail" }
];

export default class App extends React.Component {

	isSidebarOpen: boolean = false;

	render() {
		return (
			<Router>
				<div className="wrapper">
					<div className="header">
						<NavBar />
					</div>

					<div className="container">
						<div className="aside-1">
							<SideBar />
						</div>
						<div className="main">
							<Switch>
								<Route exact path="/" component={() => <Hello compiler="TypeScript" library="React" />} />
								<Route exact path="/counter" component={Counter} />
								<Route exact path="/about" component={About} />
								<Route path={WebRoutes.EmployeeList} component={Employee} />
								<Route path={WebRoutes.InventoryMain} component={Inventory} />
								<Route component={NoContent} />
							</Switch>
						</div>
						<div className="aside-2">
						<NotificationPanel message="Successfuly saved"></NotificationPanel>
						</div>
					</div>
					<div className="footer">I am the footer</div>
				</div>
			</Router>
		);
	}
}