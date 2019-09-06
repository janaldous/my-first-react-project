import *  as React from 'react';
import {useContext} from 'react';
import { LoadingContext, NotificationContext } from '../App';

export interface NotificationPanelProps {
    message: string;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = (props) => {    
    
    const context = useContext(NotificationContext);

    return (
        <div className={"notification-panel-container"}>
                <div className="close-row">
                    <div className="close" onClick={context.closePanel}>X</div>
                </div>
            <div className="message">{props.message}</div>
        </div>
    );
}