import fs from 'fs';
import path from 'path';

const filename = path.resolve(__dirname, '../../toto.txt');

fs.appendFileSync(filename, 'hello1\n');
fs.appendFileSync(filename, 'hello2\n');
fs.appendFileSync(filename, 'hello3\n');
fs.appendFileSync(filename, 'hello4\n');
