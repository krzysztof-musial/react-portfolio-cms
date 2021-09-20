import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'
import Dashboard from './admin/Dashboard'
import Editor from './admin/Editor'

export default function Admin() {
    let { path } = useRouteMatch()

    return (
        <div>
            <Switch>
                <Route exact path={path} component={Dashboard} />
                <Route path={`${path}/editor`} component={Editor} />
            </Switch>
        </div>
    )
}
