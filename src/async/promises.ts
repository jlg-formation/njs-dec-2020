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

appendFile(filename, 'promise\n')
  .then(() => {
    return appendFile(filename, 'promise\n');
  })
  .then(() => {
    return appendFile(filename, 'promise\n');
  })
  .then(() => {
    return appendFile(filename, 'promise\n');
  })
  .catch(err => {
    console.log('err: ', err);
  });
