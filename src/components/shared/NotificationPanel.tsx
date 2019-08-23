import *  as React from 'react';

export interface NotificationPanelProps {
    message: string;
    isVisible: boolean;
    toggleVisibility: () => void;
}

interface NotificationPanelState {
}

export const NotificationContext = React.createContext({visible: false});

export class NotificationPanel extends React.Component<NotificationPanelProps, NotificationPanelState> {
    
    constructor(props: NotificationPanelProps) {
        super(props);
        this.state = {
            visible: false
        }
    }

    static contextType = NotificationContext;

    render() {
        return (
            <div className={"notification-panel-container" + (this.props.isVisible ? "": " hidden")}>
                <NotificationContext.Provider value={{ visible: this.props.isVisible}}>
                    <div className="close-row">
                        <div className="close" onClick={this.props.toggleVisibility}>X</div>
                    </div>
                </NotificationContext.Provider>
                <div className="message">{this.props.message}</div>
            </div>
        );
    }
}