import fs from 'fs';
import path from 'path';

const filename = path.resolve(__dirname, '../../toto.txt');

fs.appendFile(filename, 'titi1\n', () => {
  fs.appendFile(filename, 'titi2\n', () => {
    fs.appendFile(filename, 'titi3\n', () => {
      fs.appendFile(filename, 'titi4\n', () => {});
    });
  });
});
