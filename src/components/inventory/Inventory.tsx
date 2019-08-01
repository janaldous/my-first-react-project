import *  as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { InventoryList } from './InventoryList';
import { InventoryDetail } from './InventoryDetail';
import { WebRoutes } from '../App';

export const Inventory = () => {
    return (
        <Switch>
            <Route exact path={WebRoutes.InventoryList} component={InventoryList} />
            <Route exact path={WebRoutes.InventoryDetail} component={InventoryDetail} />
        </Switch>
    );
}