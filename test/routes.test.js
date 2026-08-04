import test from 'node:test';
import assert from 'node:assert/strict';
import { getPageFromHash } from '../src/utils/routes.js';

test('parses product and unknown hash routes', () => {
  assert.deepEqual(getPageFromHash('#/product/linea-wool-coat'), {
    page: 'productDetail',
    slug: 'linea-wool-coat',
  });
  assert.deepEqual(getPageFromHash('#/unknown'), { page: 'home', slug: null });
});
