import * as React from "react";
import { useState, useMemo, createContext } from "react";
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
import { LoadingOverlay } from '../components/shared/LoadingOverlay';

import "./app.scss";
import { SponsorshipBoard } from "./sponsorship/sponsorship";
import * as whyDidYouRender from '@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js';

whyDidYouRender(React, {
	onlyLogs: true,
	titleColor: "green",
	diffNameColor: "aqua",
	include: [/^SponsorshipBoard/],
});

interface NavBarRoutes {
	url: string;
	name: string;
	children?: Array<NavBarRoutes>;
};

export enum WebRoutes {
	SponsorshipBoard = "/sponsorship",
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
	{ name: "Sponsorship", url: WebRoutes.SponsorshipBoard },
	{ name: "Employees", url: WebRoutes.EmployeeList },
	{ name: "New Employee", url: WebRoutes.EmployeeForm },
	{ name: "Employee detail", url: WebRoutes.EmployeeDetail },
	{ name: "Inventory", url: "/inventory" },
	{ name: "Inventory detail", url: "/inventory/detail" }
];

export const NotificationContext = createContext({
	visible: false,
	message: "",
	setNotificationMessage: (message: string) => { },
	closePanel: () => { },
});

export const LoadingContext = createContext({
	isLoading: false,
	setIsLoadingOn: () => { },
	setIsLoadingOff: () => { },
});

export const SidebarContext = createContext({
	isOpen: false,
	toggle: () => { },
});

const SideBarProvider: React.FC = (props) => {
	const [sidebarState, setSidebarState] = useState({
		isOpen: true,
	});

	const sidebar = useMemo(() => {
		return {
			isOpen: sidebarState.isOpen,
			toggle: () => setSidebarState({ isOpen: !sidebarState.isOpen }),
		}
	}, [sidebarState]);

	return (<SidebarContext.Provider value={sidebar}>
		{props.children}
	</SidebarContext.Provider>);
}

const NotificationProvider: React.FC = (props) => {
	const [notificationState, setNotificationState] = useState({
		visible: false,
		message: "",
	});

	const notification = useMemo(() => {
		return {
			visible: notificationState.visible,
			message: notificationState.message,
			setNotificationMessage: (message: string) => {
				setNotificationState({ visible: true, message: message, });
			},
			closePanel: () => {
				setNotificationState({ visible: false, message: "" })
			},
		}
	}, [notificationState]);

	return (<NotificationContext.Provider value={notification}>
		{props.children}
	</NotificationContext.Provider>);
}

const LoadingProvider: React.FC = (props) => {
	const [loadingState, setLoadingState] = useState({
		isLoading: false,
	});

	const loading = useMemo(() => {
		return {
			isLoading: loadingState.isLoading,
			setIsLoadingOn: () => setLoadingState({ isLoading: true }),
			setIsLoadingOff: () => setLoadingState({ isLoading: false }),
		}
	}, [loadingState]);

	return (<LoadingContext.Provider value={loading}>
		{props.children}
	</LoadingContext.Provider>);
}


interface AppState {
	isSidebarOpen: boolean;
}

export default class App extends React.Component<{}, AppState> {

	constructor(props: {}) {
		super(props);
		this.state = {
			isSidebarOpen: false,
		}
	}

	loadingContext = LoadingContext;
	notificationContext = NotificationContext;

	render() {
		return (
			<Router>
				<div className="wrapper">
					<div className="header">
						<NavBar />
					</div>
					<SideBarProvider>
						<LoadingProvider>
							<NotificationProvider>
								<div className="container">
									<div className="aside-1">
										<SidebarContext.Consumer>
											{({ isOpen, toggle }) => <SideBar isOpen={isOpen} toggle={() => toggle()} />}
										</SidebarContext.Consumer>
									</div>
									<div className="main-scrollable">
										<div className="main">
											<Switch>
												<Route exact path="/" component={() => <Hello compiler="TypeScript" library="React" />} />
												<Route exact path="/counter" component={Counter} />
												<Route exact path="/about" component={About} />
												<Route exact path="/sponsorship" component={SponsorshipBoard} />
												<Route path={WebRoutes.EmployeeList} component={Employee} />
												<Route path={WebRoutes.InventoryMain} component={Inventory} />
												<Route component={NoContent} />
											</Switch>
										</div>
										<div className="aside-2">
											<NotificationContext.Consumer>
												{({ visible, message }) => (visible && <NotificationPanel message={message}></NotificationPanel>)}
											</NotificationContext.Consumer>
										</div>
									</div>
								</div>
								<div className="footer">I am the footer</div>
								<LoadingContext.Consumer>
									{({ isLoading }) => isLoading && <LoadingOverlay />}
								</LoadingContext.Consumer>
							</NotificationProvider>
						</LoadingProvider>
					</SideBarProvider>
				</div>
			</Router>
		);
	}
}