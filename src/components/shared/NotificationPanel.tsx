import *  as React from 'react';

interface NotificationPanelProps {
    message: string;
}

interface NotificationPanelState {
    visible: boolean;
}

export const NotificationContext = React.createContext({visible: false});

export class NotificationPanel extends React.Component<NotificationPanelProps, NotificationPanelState> {
    
    constructor(props: NotificationPanelProps) {
        super(props);
        this.state = {
            visible: false
        }
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    static contextType = NotificationContext;

    toggleVisibility() {
        this.state.visible ? this.setState({visible: true}) : this.setState({visible:false});
        console.log(this.state.visible)
    }

    render() {
        return (
            <NotificationContext.Consumer>
            {visible => (<div className="notification-panel-container">
                <NotificationContext.Provider value={{visible: this.state.visible}}>
                    <div className="close-row">
                        <div className="close" onClick={this.toggleVisibility}>X</div>
                    </div>
                </NotificationContext.Provider>
                <div className="message">{this.props.message}</div>
            </div>)}
            </NotificationContext.Consumer>
        );
    }
}