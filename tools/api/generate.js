import jsf from 'json-schema-faker';
import fs from 'fs';
import faker from 'faker';
import schema from './schema';

faker.locale = "nl";
jsf.extend('faker', () => faker);

const json = JSON.stringify(jsf(schema));

fs.writeFile("./src/api/db.json", json);