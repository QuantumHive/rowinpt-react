import fs from 'fs';

const db = {
    users: [],
    agenda: [],
};

db.locations = [
    {
        id: 1,
        location: "Arnhem Noord",
        address: "Mercatorweg 65",
        postalcode: "6827DB",
        city: "Arnhem"
    },
    {
        id: 2,
        location: "Elderveld",
        address: "Kromwijkplaats 4",
        postalcode: "6843GR",
        city: "Arnhem"
    },
    {
        id: 3,
        location: "Malburgen",
        address: "Lipinestraat 12",
        postalcode: "6841GD",
        city: "Arnhem"
    }
];

db.coursetypes = [
    {
        id: 1,
        name: "Personal Training"
    },
    {
        id: 2,
        name: "Small Group"
    },
    {
        id: 3,
        name: "Groepsles"
    },
];

db.courses = [
    {
        id: 1,
        name: "Full Body Workout (low)",
        courseTypeId: 3
    },
    {
        id: 2,
        name: "Groepsfitness (low-mid-high)",
        courseTypeId: 3
    },
    {
        id: 3,
        name: "Small Group Training",
        courseTypeId: 2
    },
    {
        id: 4,
        name: "Control",
        courseTypeId: 3
    },
    {
        id: 5,
        name: "Full Body Workout",
        courseTypeId: 3
    },
    {
        id: 6,
        name: "Small Group Bokscamp",
        courseTypeId: 2
    },
    {
        id: 7,
        name: "Small Group KUV",
        courseTypeId: 2
    },
    {
        id: 8,
        name: "Balance Training (low)",
        courseTypeId: 3
    },
    {
        id: 9,
        name: "Kids Circuit 5 t/m 7 jaar",
        courseTypeId: 3
    },
    {
        id: 10,
        name: "Kids Circuit 8 t/m 14 jaar",
        courseTypeId: 3
    },
    {
        id: 11,
        name: "Circuit Training",
        courseTypeId: 3
    },
    {
        id: 12,
        name: "Conditietraining",
        courseTypeId: 3
    },
    {
        id: 13,
        name: "Bootcamp",
        courseTypeId: 3
    },
    {
        id: 14,
        name: "Begeleid Trainen",
        courseTypeId: 1
    },
];

db.timetable = [
    {
        id: 1,
        courseId: 1,
        start: "11:00",
        end: "12:00",
        day: 1,
        locationId: 1
    },
    {
        id: 2,
        courseId: 2,
        start: "12:00",
        end: "13:00",
        day: 1,
        locationId: 1
    },
    {
        id: 3,
        courseId: 3,
        start: "17:30",
        end: "18:30",
        day: 1,
        locationId: 1
    },
    {
        id: 4,
        courseId: 3,
        start: "18:30",
        end: "19:30",
        day: 1,
        locationId: 1
    },
    {
        id: 5,
        courseId: 3,
        start: "19:30",
        end: "20:30",
        day: 1,
        locationId: 1
    },
    {
        id: 6,
        courseId: 4,
        start: "19:30",
        end: "20:30",
        day: 1,
        locationId: 1
    },
    {
        id: 7,
        courseId: 5,
        start: "10:00",
        end: "11:00",
        day: 2,
        locationId: 1
    },
    {
        id: 8,
        courseId: 6,
        start: "18:30",
        end: "19:30",
        day: 2,
        locationId: 1
    },
    {
        id: 9,
        courseId: 7,
        start: "19:30",
        end: "20:30",
        day: 2,
        locationId: 1
    },
    {
        id: 10,
        courseId: 5,
        start: "19:30",
        end: "20:30",
        day: 2,
        locationId: 1
    },
    {
        id: 11,
        courseId: 8,
        start: "10:00",
        end: "11:00",
        day: 3,
        locationId: 1
    },
    {
        id: 12,
        courseId: 2,
        start: "13:00",
        end: "14:00",
        day: 3,
        locationId: 1
    },
    {
        id: 13,
        courseId: 9,
        start: "15:00",
        end: "16:00",
        day: 3,
        locationId: 1
    },
    {
        id: 14,
        courseId: 10,
        start: "16:00",
        end: "17:00",
        day: 3,
        locationId: 1
    },
    {
        id: 15,
        courseId: 3,
        start: "18:30",
        end: "19:30",
        day: 3,
        locationId: 1
    },
    {
        id: 16,
        courseId: 3,
        start: "19:30",
        end: "20:30",
        day: 3,
        locationId: 1
    },
    {
        id: 17,
        courseId: 11,
        start: "19:30",
        end: "20:30",
        day: 3,
        locationId: 1
    },
    {
        id: 18,
        courseId: 12,
        start: "19:30",
        end: "20:30",
        day: 4,
        locationId: 1
    },
    {
        id: 19,
        courseId: 3,
        start: "20:30",
        end: "21:30",
        day: 4,
        locationId: 1
    },
    {
        id: 20,
        courseId: 3,
        start: "19:00",
        end: "20:00",
        day: 5,
        locationId: 1
    },
    {
        id: 21,
        courseId: 6,
        start: "20:00",
        end: "21:00",
        day: 5,
        locationId: 1
    },
    {
        id: 22,
        courseId: 13,
        start: "10:00",
        end: "11:00",
        day: 6,
        locationId: 1
    },
    {
        id: 23,
        courseId: 11,
        start: "10:00",
        end: "11:00",
        day: 6,
        locationId: 1
    },
    {
        id: 24,
        courseId: 14,
        start: "18:30",
        end: "19:30",
        day: 1,
        locationId: 2
    },
    {
        id: 25,
        courseId: 3,
        start: "19:30",
        end: "20:30",
        day: 1,
        locationId: 2
    },
    {
        id: 26,
        courseId: 3,
        start: "18:30",
        end: "19:30",
        day: 3,
        locationId: 2
    },
    {
        id: 27,
        courseId: 14,
        start: "19:30",
        end: "20:30",
        day: 3,
        locationId: 2
    },
    {
        id: 28,
        courseId: 14,
        start: "18:00",
        end: "19:00",
        day: 5,
        locationId: 2
    },
    {
        id: 29,
        courseId: 3,
        start: "19:00",
        end: "20:00",
        day: 5,
        locationId: 2
    },
    {
        id: 30,
        courseId: 11,
        start: "19:30",
        end: "20:30",
        day: 3,
        locationId: 3
    },
];

const json = JSON.stringify(db);
fs.writeFile("./src/api/db.json", json);