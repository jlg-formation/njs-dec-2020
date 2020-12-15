import {Server} from './Server';

const server = new Server();

(async () => {
  try {
    await server.start();
    console.log(`Server started on port ${server.port}`);
  } catch (e) {
    console.log('cannot start the server', e);
  }
})();
