import fs from 'fs';
import path from 'path';

const filename = path.resolve(__dirname, '../../toto.txt');

const appendFile = (file: string, content: string) => {
  return new Promise<void>((resolve, reject) => {
    fs.appendFile(file, content, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

(async () => {
  try {
    await appendFile(filename, 'await\n');
    await appendFile(filename, 'await\n');
    await appendFile(filename, 'await\n');
    await appendFile(filename, 'await\n');
  } catch (err) {
    console.log('err: ', err);
  }
})();
