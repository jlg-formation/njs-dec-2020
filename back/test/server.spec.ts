import assert from 'assert';
import {Server} from '../src/Server';
import fetch from 'node-fetch';

describe('Web Service date', () => {
  let server: Server;
  before(async () => {
    server = new Server();
    await server.start();
  });

  it('should return the date', async () => {
    const response = await fetch('http://localhost:3000/ws/date');
    const json = await response.json();
    assert(json.date);
    const date = new Date(json.date);
    const now = new Date();

    assert.strictEqual(date.getFullYear(), now.getFullYear());
  });

  it('should return the list of articles', async () => {
    const response = await fetch('http://localhost:3000/ws/articles');
    const json = await response.json();
    assert.deepStrictEqual(response.status, 200);
    assert(json);
  });

  it('should add one article', async () => {
    const response = await fetch('http://localhost:3000/ws/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Marteau',
        price: 2.99,
        qty: 100,
      }),
    });
    const json = await response.json();
    assert.deepStrictEqual(response.status, 201);
    assert(json);
  });

  it('should delete one article', async () => {
    const response = await fetch('http://localhost:3000/ws/articles', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([123]),
    });
    assert.deepStrictEqual(response.status, 204);
  });

  after(async () => {
    await server.stop();
  });
});
