// To delete
import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'
import Projects from './admin/Projects'
import Editor from './admin/Editor'

export default function AdminPage() {
    let { path } = useRouteMatch()

    return (
        <div>
            <Switch>
                <Route exact path={path} component={Projects} />
                <Route path={`${path}/editor/:id`} component={Editor} />
            </Switch>
        </div>
    )
}
