import * as React from "react";
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Hello } from "./home/Home";
import { Counter } from "./Counter";
import { EmployeeList } from "./employee/EmployeeList";
import { Employee } from "./employee/Employee";
import { EmployeeForm } from "./employee/EmployeeForm";
import { NoContent } from "./NoContent";
import { About } from "./textpage/About";
import { Inventory } from "./inventory/Inventory";
import { InventoryDetail } from "./inventory/InventoryDetail";
import "./app.scss";
import { SideBar } from "./template/SideBar";
import { NavBar } from "./template/NavBar";

interface NavBarRoutes {
	url: string;
	name: string;
};

export const pages: Array<NavBarRoutes> = [
	{ name: "Home", url: "/" },
	{ name: "About", url: "/about" },
	{ name: "Counter", url: "/counter" },
	{ name: "Employees", url: "/employee" },
	{ name: "New Employee", url: "/employee/new" },
	{ name: "Employee detail", url: "/employee/detail" },
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
								<Route exact path="/employee" component={EmployeeList} />
								<Route exact path="/employee/new" component={EmployeeForm} />
								<Route path="/employee/detail" component={Employee} />
								<Route exact path="/inventory" component={Inventory} />
								<Route exact path="/inventory/detail" component={InventoryDetail} />
								<Route component={NoContent} />
							</Switch>
						</div>
						<div className="aside-2"></div>
					</div>
					<div className="footer">I am the footer</div>
				</div>
			</Router>
		);
	}
}