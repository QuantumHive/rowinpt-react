import React from 'react';
import { Route, IndexRoute } from 'react-router';

import * as paths from './constants/routePaths';

import App from './components/App';
import Dashboard from './containers/Dashboard';
import Schedule from './containers/Schedule';
import ScheduleLocation from './components/schedule/Location';
import ScheduleType from './components/schedule/CourseType';
import ScheduleDate from './components/schedule/CourseDate';
import ScheduleCourse from './components/schedule/Course';
import ScheduleConfirm from './components/schedule/Confirm';
import Profile from './containers/Profile';
import Users from './containers/UserSettings';

export default (
    <Route path={paths.default} component={App}>
        <IndexRoute component={Dashboard} />
        <Route path={paths.Profile} component={Profile} />
        <Route path={paths.UserSettings} component={Users} />

        <Route path={paths.Schedule} component={Schedule}>
            <IndexRoute path={paths.ScheduleLocation} component={ScheduleLocation} />
            <Route path={paths.SchuduleCourseType} component={ScheduleType} />
            <Route path={paths.ScheduleDate} component={ScheduleDate} />
            <Route path={paths.ScheduleCourse} component={ScheduleCourse} />
            <Route path={paths.ScheduleConfirm} component={ScheduleConfirm} />
        </Route>
    </Route>
);