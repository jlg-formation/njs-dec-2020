import assert from 'assert';
import fetch from 'node-fetch';

describe('Web Service date', () => {
  it('should return the date', async () => {
    const response = await fetch('http://localhost:3000/ws/date');
    const json = await response.json();
    assert(json.date);
    const date = new Date(json.date);
    const now = new Date();

    assert.strictEqual(date.getFullYear(), now.getFullYear());
  });
});
