import fs from 'fs';
import faker from 'faker';

faker.locale = "nl";

const db = {
    users: []
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
        id: 1,
        name: "Small Group"
    },
    {
        id: 1,
        name: "Groepsles"
    },
];

const json = JSON.stringify(db);
fs.writeFile("./src/api/db.json", json);