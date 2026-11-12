import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const baseURL = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4173';

test('preview serves the assets from the current production build', async () => {
  for (const path of ['/favicon.svg', '/social-preview.png', '/resume.pdf', '/2d/index.html', '/2d/resume.pdf']) {
    const response = await fetch(`${baseURL}${path}`);
    assert.equal(response.status, 200, path);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile(`build${path}`), path);
  }
});
