import React from 'react';
import PropTypes from 'prop-types';
import StretchGrid from '../common/stretchgrid/StretchGrid';
import CourseDateCard from './CourseDateCard';

import moment from 'moment';

function CourseDate({nextStep}) {
    const monday = moment().weekday(0);
    const rows = [
        [
            <CourseDateCard key="1" date={monday} step={nextStep} />,
            <CourseDateCard key="2" date={monday.clone().add(1, 'd')} step={nextStep} />
        ],
        [
            <CourseDateCard key="3" date={monday.clone().add(2, 'd')} step={nextStep} />,
            <CourseDateCard key="4" date={monday.clone().add(3, 'd')} step={nextStep} />
        ],
        [
            <CourseDateCard key="5" date={monday.clone().add(4, 'd')} step={nextStep} />,
            <CourseDateCard key="6" date={monday.clone().add(5, 'd')} step={nextStep} />
        ],
        [
            <CourseDateCard key="7" date={monday.clone().add(6, 'd')} step={nextStep} />,
            <div key="8" />
        ],
    ];

    return (
        <StretchGrid rows={rows} />
    );
}

CourseDate.propTypes = {
    nextStep: PropTypes.func.isRequired
};

export default CourseDate;