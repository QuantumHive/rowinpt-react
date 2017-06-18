import React from 'react';
import PropTypes from 'prop-types';
import StretchGrid from '../common/stretchgrid/StretchGrid';
import CourseDateCard from './CourseDateCard';

function CourseDate({nextStep}) {
    const rows = [
        [
            <CourseDateCard key="1" date="MA 19-6-2017" step={nextStep} />,
            <CourseDateCard key="2" date="DI 20-6-2017" step={nextStep} />
        ],
        [
            <CourseDateCard key="3" date="WO 21-6-2017" step={nextStep} />,
            <CourseDateCard key="4" date="DO 22-6-2017" step={nextStep} />
        ],
        [
            <CourseDateCard key="5" date="VR 23-6-2017" step={nextStep} />,
            <CourseDateCard key="6" date="ZA 24-6-2017" step={nextStep} />
        ],
        [
            <CourseDateCard key="7" date="MA 25-6-2017" step={nextStep} />,
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