import fs from 'fs';
fs.writeFile("./src/api/api.js"), `export default '${fs.readFile('.api')}';`;