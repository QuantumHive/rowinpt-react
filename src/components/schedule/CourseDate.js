import React from 'react';
import StretchGrid from '../common/stretchgrid/StretchGrid';
import CourseDateCard from './CourseDateCard';

function CourseDate() {

    const rows = [
        [
            <CourseDateCard key="1" date="MA 19-6-2017" />,
            <CourseDateCard key="2" date="DI 20-6-2017" />
        ],
        [
            <CourseDateCard key="3" date="WO 21-6-2017" />,
            <CourseDateCard key="4" date="DO 22-6-2017" />
        ],
        [
            <CourseDateCard key="5" date="VR 23-6-2017" />,
            <CourseDateCard key="6" date="ZA 24-6-2017" />
        ],
        [
            <CourseDateCard key="7" date="MA 25-6-2017" />,
            <div key="8" />
        ],
    ];

    return (
        <StretchGrid rows={rows} />
    );
}

export default CourseDate;