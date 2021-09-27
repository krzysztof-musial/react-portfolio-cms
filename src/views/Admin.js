import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'
import Projects from './admin/Projects'
import Editor from './admin/Editor'
import { AdminLayoutProvider } from '../contexts/AdminLayoutContext'

export default function Admin() {
    let { path } = useRouteMatch()

    return (
        <div>
        <AdminLayoutProvider>
            <Switch>
                <Route exact path={path} component={Projects} />
                <Route path={`${path}/editor/:id`} component={Editor} />
            </Switch>
        </AdminLayoutProvider>
        </div>
    )
}
