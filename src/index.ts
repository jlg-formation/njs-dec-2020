import {Server} from './Server';

const server = new Server();

(async () => {
  await server.start();
  console.log(`Server started on port ${server.port}`);
})();
